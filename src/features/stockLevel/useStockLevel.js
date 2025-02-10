import { useQuery } from "@tanstack/react-query";
import { getStockLevel } from "../../services/apiStockLevel";

export function useStockLevel() {
  const {
    isLoading: isLoadingStockLevel,
    data: stock_level,
    error,
  } = useQuery({
    queryKey: ["stock_level"],
    queryFn: getStockLevel,
  });

  return { isLoadingStockLevel, error, stock_level };
}
