import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addStockLevel as add } from "../../services/apiStockLevel";

export function useAddStockLevel() {
  const queryClient = useQueryClient();

  const { mutate: addStockLevel, isLoading: isAddingStockLevel } = useMutation({
    mutationFn: async ({ stock }) => {
      // Map stock data into the required format
      const level =
        stock?.map((item) => ({
          item_id: item.id,
          item_quantity: item.available_stock || 0, // Default to 0 if null/undefined
        })) || [];

      const entry = { level };

      add({ entry });
    },
    onSuccess: () => {
      toast.success("Stock Level successfully added");
      queryClient.invalidateQueries({ queryKey: ["stock_level"] });
      //   console.log("Stock Level successfully added");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addStockLevel, isAddingStockLevel };
}
