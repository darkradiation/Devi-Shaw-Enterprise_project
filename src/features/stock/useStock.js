import { useQuery } from "@tanstack/react-query";
import { getStock } from "../../services/apiStock";

export function useStock() {
  const {
    isLoading: isLoadingStock,
    data: stock,
    error,
  } = useQuery({
    queryKey: ["stock"],
    queryFn: getStock,
  });

  return { isLoadingStock, error, stock };
}
