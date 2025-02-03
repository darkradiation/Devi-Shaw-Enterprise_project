import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useUpdateStockItem } from "./useUpdateStockItem";

export function useRefillStock() {
  const queryClient = useQueryClient();
  const { updateStockItem } = useUpdateStockItem();

  const { mutate: refillStock, isLoading: isRefillingStock } = useMutation({
    mutationFn: async (refillData) => {
      const updatePromises = Object.entries(refillData).map(
        ([itemId, { refillQuantity, buyingPrice }]) => {
          if (refillQuantity === 0) return;

          const originalStock = queryClient
            .getQueryData(["stock"])
            .find((item) => item.id === Number(itemId));

          const newBuyingPrice = buyingPrice
            ? buyingPrice
            : originalStock.buying_price_per_pt;
          const isPriceChanged =
            newBuyingPrice !== originalStock.buying_price_per_pt;

          // Handle new_stock updates
          const originalNewStock = originalStock.new_stock || [];
          let updatedNewStock = originalNewStock;
          let updatedAvailableStock = originalStock.available_stock;
          let updatedBuyingPrice = originalStock.buying_price_per_pt;

          if (
            (originalStock.available_stock.pt === 0 &&
              originalStock.available_stock.pcs === 0) ||
            !isPriceChanged
          ) {
            const newQuantity =
              Number(originalStock.available_stock.pt) + Number(refillQuantity);
            updatedAvailableStock = {
              ...updatedAvailableStock,
              pt: newQuantity,
            };
            updatedBuyingPrice = newBuyingPrice;
          } else {
            updatedNewStock = [
              ...originalNewStock,
              { quantity: Number(refillQuantity), buyingPrice: newBuyingPrice },
            ];
          }

          console.log(
            itemId,
            updatedAvailableStock,
            updatedBuyingPrice,
            updatedNewStock
          );
          return updateStockItem({
            id: itemId,
            updated_stock: {
              available_stock: updatedAvailableStock,
              buying_price_per_pt: updatedBuyingPrice,
              new_stock: updatedNewStock,
            },
          });
        }
      );

      await Promise.all(updatePromises);
    },
    onSuccess: () => {
      toast.success("Stock successfully refilled");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { refillStock, isRefillingStock };
}
