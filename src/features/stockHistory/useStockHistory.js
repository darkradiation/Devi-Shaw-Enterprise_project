// useStockHistory.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStockHistory } from "../../services/apiStockHistory";
import { PAGE_SIZE } from "../../utils/constants";

export function useStockHistory() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("supplier") || "all";
  const filters = [];

  if (filterValue !== "all") {
    filters.push({ field: "supplier", value: filterValue });
  }

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "delivery_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  let page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: stockHistory, count } = {},
    error,
  } = useQuery({
    queryKey: ["stockHistory", filters, sortBy, page],
    queryFn: () => getStockHistory({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["stockHistory", filters, sortBy, page + 1],
      queryFn: () =>
        getStockHistory({
          filters,
          sortBy,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["stockHistory", filters, sortBy, page - 1],
      queryFn: () =>
        getStockHistory({
          filters,
          sortBy,
          page: page - 1,
        }),
    });

  return { isLoadingStockHistory: isLoading, stockHistory, error, count };
}
