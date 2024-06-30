import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateOrder as update } from "../../services/apiOrders";

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { mutate: updateOrder, isLoading: isUpdatingOrder } = useMutation({
    mutationFn: ({ id, updated_order }) => update({ id, updated_order }),
    onSuccess: () => {
      toast.success("Order successfully updated");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      console.log("Order successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateOrder, isUpdatingOrder };
}
