import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useUpdateStockItem } from "./useUpdateStockItem";

export function useLoadNewStock() {
  const queryClient = useQueryClient();
  const { updateStockItem } = useUpdateStockItem();

  const { mutate: loadNewStock, isLoading: isLoadingNewStock } = useMutation({
    mutationFn: async (itemId) => {
      const originalStock = queryClient
        .getQueryData(["stock"])
        .find((item) => item.id === Number(itemId));

      if (
        !originalStock ||
        !originalStock.new_stock ||
        originalStock.new_stock.length === 0
      ) {
        throw new Error("No new stock available to load");
      }

      // Extract the first entry from new_stock
      const [firstNewStock, ...remainingNewStock] = originalStock.new_stock;

      // Calculating new stock prices using weighted average

      // Convert old stock quantities into pieces.
      const oldStockPcs =
        Number(originalStock.available_stock.pt) *
          Number(originalStock.quantity_per_pt) +
        Number(originalStock.available_stock.pcs);

      // if old stock is 0 directly load the new stock
      if (oldStockPcs === 0) {
        const updatedStockData = {
          available_stock: {
            ...originalStock.available_stock,
            pt: Number(firstNewStock.quantity),
          },
          buying_price_per_pt: Number(firstNewStock.buyingPrice),
          new_stock: remainingNewStock, // Remove the used stock entry
        };

        // console.log({
        //   id: itemId,
        //   updated_stock: updatedStockData,
        // });

        return updateStockItem({
          id: itemId,
          updated_stock: updatedStockData,
        });
      }

      // if old stock >0 then calculate weighted averages

      // New stock quantity is provided in "pt" units, convert to pieces.
      const newStockPcs =
        Number(firstNewStock.quantity) * Number(originalStock.quantity_per_pt);

      // Buying prices per piece
      const oldStockPrice = Number(originalStock.buying_price_per_pc);
      const newStockPrice = parseFloat(
        (
          Number(firstNewStock.buyingPrice) /
          Number(originalStock.quantity_per_pt)
        ).toFixed(2)
      );

      // Calculate weighted average per piece then multiplying by quantity to get price per pt.
      const avgBuyingPricePerPt = parseFloat(
        (
          ((oldStockPcs * oldStockPrice + newStockPcs * newStockPrice) /
            (oldStockPcs + newStockPcs)) *
          Number(originalStock.quantity_per_pt)
        ).toFixed(2)
      );

      const totalStockPcs = oldStockPcs + newStockPcs;

      //   console.log(
      //     oldStockPcs,
      //     oldStockPrice,
      //     newStockPcs,
      //     newStockPrice,
      //     avgBuyingPricePerPt,
      //     totalStockPcs
      //   );

      const updatedStockData = {
        available_stock: {
          ...originalStock.available_stock,
          pt: parseInt(totalStockPcs / Number(originalStock.quantity_per_pt)),
          pcs: totalStockPcs % Number(originalStock.quantity_per_pt),
        },
        // Recalculate buying_price_per_pt using the weighted average per piece
        buying_price_per_pt: avgBuyingPricePerPt,
        new_stock: remainingNewStock, // Remove the used stock entry
      };

      //   console.log({
      //     id: itemId,
      //     updated_stock: updatedStockData,
      //   });

      return updateStockItem({
        id: itemId,
        updated_stock: updatedStockData,
      });
    },
    onSuccess: () => {
      toast.success("New stock successfully loaded into main stock");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { loadNewStock, isLoadingNewStock };
}
