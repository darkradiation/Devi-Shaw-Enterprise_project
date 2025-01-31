import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addStockHistory as add } from "../../services/apiStockHistory";

export function useAddStockHistory() {
  const queryClient = useQueryClient();

  const { mutate: addStockHistory, isLoading: isAddingStockHistory } =
    useMutation({
      mutationFn: ({ entry }) => add({ entry }),
      onSuccess: () => {
        toast.success("Refill stock added to stock history");
        queryClient.invalidateQueries({ queryKey: ["stock_history"] });
        console.log("Refill stock added to stock history");
      },
      onError: (err) => toast.error(err.message),
    });

  return { addStockHistory, isAddingStockHistory };
}
