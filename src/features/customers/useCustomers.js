import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiCustomers";

export function useCustomers() {
  const {
    isLoading: isLoadingCustomers,
    data: customers,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return { isLoadingCustomers, error, customers };
}
