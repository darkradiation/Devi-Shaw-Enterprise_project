import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getStockHistory({ filters, sortBy, page }) {
  let query = supabase
    .from("stock_history")
    .select("*,suppliers(supplier_name,phone_no)", { count: "exact" });

  // FILTER
  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      if (filter.field === "supplier" && filter.value !== "all") {
        query = query.eq("supplier_id", filter.value);
      }
    });
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
    throw new Error("Couldn't fetch stock history");
  }

  return { data, count };
}

export async function getStockHistoryById(id) {
  const { data, error } = await supabase
    .from("stock_history")
    .select("*,suppliers(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Stock history entry not found");
  }

  return data;
}

export async function getStockHistoryAfterDate(date) {
  const { data, error } = await supabase
    .from("stock_history")
    .select("*,suppliers(supplier_name)")
    .gte("delivery_date", date)
    .order("delivery_date", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(
      "Couldn't fetch stock history for the specified date range"
    );
  }

  return data;
}

export async function addStockHistory({ entry }) {
  console.log(entry);
  const { data, error } = await supabase
    .from("stock_history")
    .insert(entry)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't add it to stock history");
  }
  return data;
}
