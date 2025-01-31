import { useQuery } from "@tanstack/react-query";
import { getStockHistory } from "../../services/apiStockHistory";

export function useStockHistory() {
  const {
    isLoading: isLoadingStockHistory,
    data: stock_history,
    error,
  } = useQuery({
    queryKey: ["stockHistory"],
    queryFn: getStockHistory,
  });

  return { isLoadingStockHistory, error, stock_history };
}
