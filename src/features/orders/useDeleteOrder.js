import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteOrder as deleteApi } from "../../services/apiOrders";

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingOrder, mutate: deleteOrder } = useMutation({
    mutationFn: ({ id }) => deleteApi({ id }),
    onSuccess: () => {
      toast.success("Order successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingOrder, deleteOrder };
}
