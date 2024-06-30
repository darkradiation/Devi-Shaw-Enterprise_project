import { useQuery } from "@tanstack/react-query";
import { getStockItem } from "../../services/apiStock";

// const item_id = 1;
export function useStockItem(item_id) {
  const {
    isLoading: isLoadingStockItem,
    data: stock_item,
    error,
  } = useQuery({
    queryKey: ["stock_item", item_id],
    queryFn: () => getStockItem(item_id),
  });

  return { isLoadingStockItem, error, stock_item };
}
