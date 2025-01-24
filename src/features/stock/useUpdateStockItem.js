import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateStockItem as update } from "../../services/apiStock";
import { useRefreshSchemes } from "../schemes/useRefreshSchemes"; // Import the refresh hook

export function useUpdateStockItem() {
  const queryClient = useQueryClient();
  const { refreshSchemes } = useRefreshSchemes(); // Get refresh function

  const { mutate: updateStockItem, isLoading: isUpdatingStockItem } =
    useMutation({
      mutationFn: ({ id, updated_stock }) => update({ id, updated_stock }),
      onSuccess: async () => {
        try {
          // Invalidate stock first to ensure fresh data
          await queryClient.invalidateQueries({ queryKey: ["stock"] });

          // Refresh all schemes with updated stock data
          await refreshSchemes();

          toast.success("Stock Item and all schemes updated successfully");
          console.log("Stock Item and schemes successfully updated");
        } catch (error) {
          toast.error("Failed to refresh schemes after stock update");
          console.error("Scheme refresh error:", error);
        }
      },
      onError: (err) => toast.error(err.message),
    });

  return { updateStockItem, isUpdatingStockItem };
}
