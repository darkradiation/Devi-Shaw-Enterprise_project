import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getOrders } from "../../services/apiOrders";
import { PAGE_SIZE } from "../../utils/constants";

export function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filters = [];

  if (filterValue === "all") {
    // No filters
  } else if (filterValue === "pending") {
    filters.push({ field: "is_delivered", value: false });
    filters.push({ field: "is_paid", value: false });
  } else if (filterValue === "due") {
    filters.push({ field: "is_delivered", value: true });
    filters.push({ field: "is_paid", value: false });
  } else if (filterValue === "paid") {
    filters.push({ field: "is_delivered", value: true });
    filters.push({ field: "is_paid", value: true });
  }

  // SEARCH
  // const searchQuery = searchParams.get("search") || "";
  const searchQuery = "";

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "id-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  let page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: orders, count } = {},
    error,
  } = useQuery({
    queryKey: ["orders", filters, searchQuery, sortBy, page],
    queryFn: () => getOrders({ filters, searchQuery, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["orders", filters, searchQuery, sortBy, page + 1],
      queryFn: () =>
        getOrders({ filters, searchQuery, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", filters, searchQuery, sortBy, page - 1],
      queryFn: () =>
        getOrders({ filters, searchQuery, sortBy, page: page - 1 }),
    });

  return { isLoadingOrders: isLoading, orders, error, count };
}
