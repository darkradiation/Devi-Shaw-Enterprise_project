import { useQuery } from "@tanstack/react-query";
import { getCustomerByStoreName } from "../../services/apiCustomers";

export function useCustomerById(store_name) {
  const {
    isLoading: isLoadingCustomer,
    data: customer,
    error,
  } = useQuery({
    queryKey: ["customer", store_name],
    queryFn: () => getCustomerByStoreName({ store_name }),
  });

  return { isLoadingCustomer, error, customer };
}
