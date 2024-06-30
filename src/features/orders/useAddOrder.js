import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addOrder as add } from "../../services/apiOrders";
import { getStock } from "../../services/apiStock";
import { useUpdateStockItem } from "../stock/useUpdateStockItem";

export function useAddOrder() {
  const queryClient = useQueryClient();
  const { updateStockItem } = useUpdateStockItem();

  const updateStock = async (new_order) => {
    const stock = await getStock();
    const updatedStock = [...stock];
    const stockChanges = new Map();

    new_order.order_items.forEach((order_item) => {
      const stockItemIndex = updatedStock.findIndex(
        (item) => item.id === order_item.item_id
      );
      if (stockItemIndex !== -1) {
        const stockItem = updatedStock[stockItemIndex];
        const updatedStockItem = {
          ...stockItem,
          available_stock: {
            ...stockItem.available_stock,
            pt: stockItem.available_stock.pt - order_item.item_quantity,
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
            if (availablePcs < free_item.free_item_quantity) {
              availablePt -= 1;
              availablePcs += stockItem.quantity_per_pt;
            }
            const updatedStockItem = {
              ...stockItem,
              available_stock: {
                ...stockItem.available_stock,
                pt: availablePt,
                pcs: availablePcs - free_item.free_item_quantity,
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

  const { mutate: addOrder, isLoading: isAddingOrder } = useMutation({
    mutationFn: async ({ new_order }) => {
      await add({ new_order });
      await updateStock(new_order);
    },
    onSuccess: () => {
      toast.success("Order successfully added");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addOrder, isAddingOrder };
}

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { addOrder as add } from "../../services/apiOrders";
// import { getStock } from "../../services/apiStock";
// import { useUpdateStockItem } from "../stock/useUpdateStockItem";

// export function useAddOrder() {
//   const queryClient = useQueryClient();
//   const { updateStockItem } = useUpdateStockItem();

//   const updateStock = async (new_order) => {
//     const stock = await getStock();
//     const updatedStock = [...stock];
//     const updatePromises = [];

//     const updateStockItemInArray = (itemId, updatedStockItem) => {
//       const index = updatedStock.findIndex((item) => item.id === itemId);
//       if (index !== -1) {
//         updatedStock[index] = updatedStockItem;
//       }
//     };

//     new_order.order_items.forEach((order_item) => {
//       const stockItem = updatedStock.find(
//         (item) => item.id === order_item.item_id
//       );
//       if (stockItem) {
//         const updatedStockItem = {
//           ...stockItem,
//           available_stock: {
//             ...stockItem.available_stock,
//             pt: stockItem.available_stock.pt - order_item.item_quantity,
//           },
//         };
//         updateStockItemInArray(order_item.item_id, updatedStockItem);
//         updatePromises.push(
//           updateStockItem({
//             id: order_item.item_id,
//             updated_stock: updatedStockItem,
//           })
//         );
//       }

//       if (order_item.free_items?.length) {
//         order_item.free_items.forEach((free_item) => {
//           const stockItem = updatedStock.find(
//             (item) => item.id === Number(free_item.free_item_id)
//           );
//           if (stockItem && free_item.free_item_quantity > 0) {
//             let { pt: availablePt, pcs: availablePcs } =
//               stockItem.available_stock;
//             if (availablePcs < free_item.free_item_quantity) {
//               availablePt -= 1;
//               availablePcs += stockItem.quantity_per_pt;
//             }
//             const updatedStockItem = {
//               ...stockItem,
//               available_stock: {
//                 ...stockItem.available_stock,
//                 pt: availablePt,
//                 pcs: availablePcs - free_item.free_item_quantity,
//               },
//             };
//             updateStockItemInArray(
//               Number(free_item.free_item_id),
//               updatedStockItem
//             );
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

//   const { mutate: addOrder, isLoading: isAddingOrder } = useMutation({
//     mutationFn: async ({ new_order }) => {
//       await add({ new_order });
//       await updateStock(new_order);
//     },
//     onSuccess: () => {
//       toast.success("Order successfully added");
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { addOrder, isAddingOrder };
// }
