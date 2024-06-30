import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addStockItem as update } from "../../services/apiStock";

export function useAddStockItem() {
  const queryClient = useQueryClient();
  let addedItemId = 0;

  const { mutate: addStockItem, isLoading: isAddingStockItem } = useMutation({
    mutationFn: async ({ new_stock }) => {
      addedItemId = await update({ new_stock });
    },
    onSuccess: () => {
      toast.success("Stock Item successfully added");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      console.log("Stock Item successfully added");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addStockItem, isAddingStockItem, addedItemId };
}
