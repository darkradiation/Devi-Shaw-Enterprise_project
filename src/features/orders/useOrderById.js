import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../services/apiOrders";

export function useOrderById(id) {
  const {
    isLoading: isLoadingOrder,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById({ id }),
  });

  return { isLoadingOrder, error, order };
}
