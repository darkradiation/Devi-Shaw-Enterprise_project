import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../../services/apiSuppliers";

export function useSuppliers() {
  const {
    isLoading: isLoadingSuppliers,
    data: suppliers,
    error,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  return { isLoadingSuppliers, error, suppliers };
}
