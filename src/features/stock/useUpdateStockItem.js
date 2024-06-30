import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateStockItem as update } from "../../services/apiStock";

export function useUpdateStockItem() {
  const queryClient = useQueryClient();

  const { mutate: updateStockItem, isLoading: isUpdatingStockItem } =
    useMutation({
      mutationFn: ({ id, updated_stock }) => update({ id, updated_stock }),
      onSuccess: () => {
        toast.success("Stock Item successfully updated");
        queryClient.invalidateQueries({ queryKey: ["stock"] });
        console.log("Stock Item successfully updated");
      },
      onError: (err) => toast.error(err.message),
    });

  return { updateStockItem, isUpdatingStockItem };
}
