import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../../services/apiCustomers";

export function useCustomerById(id) {
  const {
    isLoading: isLoadingCustomer,
    data: customer,
    error,
  } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById({ id }),
  });

  return { isLoadingCustomer, error, customer };
}
