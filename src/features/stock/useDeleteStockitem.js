import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteStockItem as deleteApi } from "../../services/apiStock";

export function useDeleteStockItem() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingStockItem, mutate: deleteStockItem } =
    useMutation({
      mutationFn: ({ id }) => deleteApi({ id }),
      onSuccess: () => {
        toast.success("Stock Item successfully deleted");

        queryClient.invalidateQueries({
          queryKey: ["stock"],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDeletingStockItem, deleteStockItem };
}
