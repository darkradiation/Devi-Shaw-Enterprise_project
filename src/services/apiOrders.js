import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/date";

export async function getOrders({
  filters,
  searchQuery,
  sortBy,
  page,
  filterByDay,
}) {
  let query = supabase
    .from("orders")
    .select(
      "*,customers(store_name,owner_name,store_geoLink,store_address,owner_phone_no ,routes(*))",
      { count: "exact" }
    );

  // FILTER
  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      query = query.eq(filter.field, filter.value);
    });
  }

  // COMBINED SEARCH AND DAY FILTER
  // The search matches the store name, or the order id when it is a number.
  const hasDayFilter = filterByDay && filterByDay !== "all";
  const searchId = /^\d+$/.test(searchQuery?.trim() || "")
    ? Number(searchQuery.trim())
    : null;

  if (searchQuery || hasDayFilter) {
    let customerQuery = supabase.from("customers").select("id");

    if (searchQuery) {
      customerQuery = customerQuery.ilike("store_name", `%${searchQuery}%`);
    }

    if (hasDayFilter) {
      customerQuery = customerQuery.eq("route_id", filterByDay);
    }

    const { data: customers, error: customerError } = await customerQuery;

    if (customerError) {
      console.error(customerError);
      throw new Error("Couldn't fetch customers");
    }

    const customerIds = customers.map((c) => c.id);

    if (searchId === null) {
      if (customerIds.length === 0) return { data: [], count: 0 };
      query = query.in("customer_id", customerIds);
    } else {
      // order id match (kept inside the selected route, if any) OR name match
      let idCondition = `id.eq.${searchId}`;
      if (hasDayFilter) {
        const { data: routeCustomers, error: routeError } = await supabase
          .from("customers")
          .select("id")
          .eq("route_id", filterByDay);
        if (routeError) {
          console.error(routeError);
          throw new Error("Couldn't fetch customers");
        }
        const routeIds = routeCustomers.map((c) => c.id);
        idCondition = routeIds.length
          ? `and(id.eq.${searchId},customer_id.in.(${routeIds.join(",")}))`
          : null;
      }

      const conditions = [];
      if (idCondition) conditions.push(idCondition);
      if (customerIds.length)
        conditions.push(`customer_id.in.(${customerIds.join(",")})`);
      if (conditions.length === 0) return { data: [], count: 0 };
      query = query.or(conditions.join(","));
    }
  }

  // SORT
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Couldn't fetch orders");
  }

  return { data, count };
}

export async function getOrderById({ id }) {
  const { data, error } = await supabase
    .from("orders")
    .select("* ,customers(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("No order found with id " + id);
  }

  return data;
}

export async function addOrder({ new_order }) {
  const { data, error } = await supabase
    .from("orders")
    .insert(new_order)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't add order", error.message);
  }
  return data;
}

export async function updateOrder({ id, updated_order }) {
  const { data, error } = await supabase
    .from("orders")
    .update(updated_order)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't update order");
  }
  return data;
}

export async function deleteOrder({ id }) {
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't delete order");
  }
  return data;
}

// Returns all ORDERS that are were created after the given date
export async function getOrdersAfterDate(date) {
  const { data, error } = await supabase
    .from("orders")
    // .select('*')
    .select("*,customers(store_name,owner_name,routes(*))")
    .gte("order_date", date)
    .lte("order_date", getToday())
    .order("id", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all orders that were created between the given dates.
export async function getOrdersBetweenDates(startDate, endDate) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, customers(store_name, owner_name, routes(*))")
    .gte("order_date", startDate)
    .lte("order_date", endDate)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }
  return data;
}
