import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useUpdateStockItem } from "../stock/useUpdateStockItem";

export function useRefillStock() {
  const queryClient = useQueryClient();
  const { updateStockItem } = useUpdateStockItem();

  const { mutate: refillStock, isLoading: isRefillingStock } = useMutation({
    mutationFn: async (refillData) => {
      const updatePromises = Object.entries(refillData).map(
        ([itemId, { refillQuantity = 0, buyingPrice }]) => {
          const originalStock = queryClient
            .getQueryData(["stock"])
            .find((item) => item.id === Number(itemId));
          const newQuantity =
            Number(originalStock.available_stock.pt) + Number(refillQuantity);
          const newBuyingPrice = buyingPrice
            ? buyingPrice
            : originalStock.buying_price_per_pt;

          // console.log(itemId, newQuantity, newBuyingPrice);
          return updateStockItem({
            id: itemId,
            updated_stock: {
              available_stock: {
                ...originalStock.available_stock,
                pt: newQuantity,
              },
              buying_price_per_pt: newBuyingPrice,
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
