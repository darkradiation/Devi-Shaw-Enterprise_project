import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteOrder } from "../../services/apiOrders";
import { getStock } from "../../services/apiStock";
import { useUpdateStockItem } from "../stock/useUpdateStockItem";

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const { updateStockItem } = useUpdateStockItem();

  const restoreStock = async (order) => {
    const stock = await getStock();
    const updatedStock = [...stock];
    const stockChanges = new Map();

    order.order_items.forEach((order_item) => {
      const stockItemIndex = updatedStock.findIndex(
        (item) => item.id === order_item.item_id
      );
      if (stockItemIndex !== -1) {
        const stockItem = updatedStock[stockItemIndex];
        const updatedStockItem = {
          ...stockItem,
          available_stock: {
            ...stockItem.available_stock,
            pt: stockItem.available_stock.pt + order_item.item_quantity,
          },
        };
        updatedStock[stockItemIndex] = updatedStockItem;
        stockChanges.set(order_item.item_id, updatedStockItem);
      }

      if (order_item.free_items?.length) {
        order_item.free_items.forEach((free_item) => {
          const stockItemIndex = updatedStock.findIndex(
            (item) => item.id === Number(free_item.free_item_id)
          );
          if (stockItemIndex !== -1 && free_item.free_item_quantity > 0) {
            const stockItem = updatedStock[stockItemIndex];
            let { pt: availablePt, pcs: availablePcs } =
              stockItem.available_stock;
            if (
              availablePcs + free_item.free_item_quantity >
              stockItem.quantity_per_pt
            ) {
              availablePt += 1;
              availablePcs -= stockItem.quantity_per_pt;
            }
            const updatedStockItem = {
              ...stockItem,
              available_stock: {
                ...stockItem.available_stock,
                pt: availablePt,
                pcs: availablePcs + free_item.free_item_quantity,
              },
            };
            updatedStock[stockItemIndex] = updatedStockItem;
            stockChanges.set(Number(free_item.free_item_id), updatedStockItem);
          }
        });
      }
    });

    const updatePromises = [];
    for (const [itemId, updatedStockItem] of stockChanges.entries()) {
      updatePromises.push(
        updateStockItem({
          id: itemId,
          updated_stock: updatedStockItem,
        })
      );
    }

    await Promise.all(updatePromises);
  };

  const { mutate: cancelOrder, isLoading: isCancellingOrder } = useMutation({
    mutationFn: async ({ order }) => {
      await restoreStock(order);
      await deleteOrder({ id: order.id });
    },
    onSuccess: () => {
      toast.success("Order successfully cancelled");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { cancelOrder, isCancellingOrder };
}

// ----------------------------------------------------------------------------------------

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { deleteOrder } from "../../services/apiOrders";
// import { getStock } from "../../services/apiStock";
// import { useUpdateStockItem } from "../stock/useUpdateStockItem";

// export function useCancelOrder() {
//   const queryClient = useQueryClient();
//   const { updateStockItem } = useUpdateStockItem();

//   const restoreStock = async (order) => {
//     const stock = await getStock();
//     const updatedStock = [...stock];
//     const updatePromises = [];

//     order.order_items.forEach((order_item) => {
//       const stockItemIndex = updatedStock.findIndex(
//         (item) => item.id === order_item.item_id
//       );
//       if (stockItemIndex !== -1) {
//         const stockItem = updatedStock[stockItemIndex];
//         const updatedStockItem = {
//           ...stockItem,
//           available_stock: {
//             ...stockItem.available_stock,
//             pt: stockItem.available_stock.pt + order_item.item_quantity,
//           },
//         };
//         updatedStock[stockItemIndex] = updatedStockItem;
//         updatePromises.push(
//           updateStockItem({
//             id: order_item.item_id,
//             updated_stock: updatedStockItem,
//           })
//         );
//       }

//       if (order_item.free_items?.length) {
//         order_item.free_items.forEach((free_item) => {
//           const stockItemIndex = updatedStock.findIndex(
//             (item) => item.id === Number(free_item.free_item_id)
//           );
//           if (stockItemIndex !== -1 && free_item.free_item_quantity > 0) {
//             const stockItem = updatedStock[stockItemIndex];
//             let { pt: availablePt, pcs: availablePcs } =
//               stockItem.available_stock;
//             if (
//               availablePcs + free_item.free_item_quantity >
//               stockItem.quantity_per_pt
//             ) {
//               availablePt += 1;
//               availablePcs -= stockItem.quantity_per_pt;
//             }
//             const updatedStockItem = {
//               ...stockItem,
//               available_stock: {
//                 ...stockItem.available_stock,
//                 pt: availablePt,
//                 pcs: availablePcs + free_item.free_item_quantity,
//               },
//             };
//             updatedStock[stockItemIndex] = updatedStockItem;
//             updatePromises.push(
//               updateStockItem({
//                 id: Number(free_item.free_item_id),
//                 updated_stock: updatedStockItem,
//               })
//             );
//           }
//         });
//       }
//     });

//     await Promise.all(updatePromises);
//   };

//   const { mutate: cancelOrder, isLoading: isCancellingOrder } = useMutation({
//     mutationFn: async ({ order }) => {
//       await restoreStock(order);
//       await deleteOrder({ id: order.id });
//     },
//     onSuccess: () => {
//       toast.success("Order successfully cancelled");
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { cancelOrder, isCancellingOrder };
// }
