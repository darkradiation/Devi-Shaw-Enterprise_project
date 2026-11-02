// import styled from "styled-components";
// import Heading from "../../ui/Heading";
// import {
//   Cell,
//   Legend,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// // import { useDarkMode } from "../../context/DarkModeContext";
// import { useStock } from "../stock/useStock";

// const ChartBox = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-200);
//   border-radius: var(--border-radius-md);

//   padding: 1.2rem 0;
//   grid-column: 1/-1;

//   & > *:first-child {
//     margin-bottom: 0.3rem;
//   }

//   & .recharts-pie-label-text {
//     font-weight: 600;
//   }
// `;

// function generateColors(numItems) {
//   const colors = [];
//   for (let i = 0; i < numItems; i++) {
//     colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
//   }
//   return colors;
// }

// /**
//  * Prepares data for the Pie chart.
//  * It sums the paid quantities from order_items and the free quantities (converted into PT units)
//  * using the conversion factor from stock (quantity_per_pt).
//  *
//  * @param {Array} orders - The orders array.
//  * @param {Array} stock - The stock array from useStock.
//  * @returns {Array} Data formatted for the PieChart.
//  */
// function prepareData(orders, stock) {
//   const itemCount = {};

//   orders.forEach((order) => {
//     order.order_items.forEach((orderItem) => {
//       // Add the paid quantity for the item (if any)
//       if (orderItem.item_quantity > 0) {
//         const key = orderItem.item_name;
//         if (!itemCount[key]) {
//           itemCount[key] = 0;
//         }
//         itemCount[key] += orderItem.item_quantity;
//       }

//       // Process free items attached to the order item.
//       if (orderItem.free_items && orderItem.free_items.length > 0) {
//         orderItem.free_items.forEach((freeItem) => {
//           if (freeItem.free_item_quantity > 0) {
//             const key = freeItem.free_item_name;
//             // Look up the conversion factor from the stock.
//             const stockItem = stock.find(
//               (s) => String(s.id) === String(freeItem.free_item_id)
//             );
//             const conversionFactor =
//               stockItem && stockItem.quantity_per_pt
//                 ? stockItem.quantity_per_pt
//                 : 1;
//             // Convert the free quantity into PT units.
//             const freeQuantityInPT =
//               freeItem.free_item_quantity / conversionFactor;
//             if (!itemCount[key]) {
//               itemCount[key] = 0;
//             }
//             itemCount[key] += freeQuantityInPT;
//           }
//         });
//       }
//     });
//   });

//   // Convert the itemCount object to an array for the Pie chart.
//   const data = Object.keys(itemCount).map((itemName) => ({
//     itemName,
//     value: Math.round(itemCount[itemName]),
//   }));

//   return data;
// }

// function ItemShareChart({ orders }) {
//   // const { isDarkMode } = useDarkMode();
//   const { isLoadingStock, error, stock } = useStock();

//   if (isLoadingStock) return null;
//   if (error) return <p>Error: {error.message}</p>;

//   const data = prepareData(orders, stock);
//   const colors = generateColors(data.length);

//   return (
//     <ChartBox>
//       <Heading as="h4">Item Share in Orders</Heading>
//       <ResponsiveContainer width="90%" height={240}>
//         <PieChart>
//           <Pie
//             data={data}
//             nameKey="itemName"
//             dataKey="value"
//             paddingAngle={3}
//             innerRadius={55}
//             outerRadius={80}
//             cx="40%"
//             cy="50%"
//           >
//             {data.map((entry, index) => (
//               <Cell fill={colors[index]} key={`cell-${index}`} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend
//             verticalAlign="middle"
//             align="right"
//             width="30%"
//             layout="vertical"
//             iconSize={15}
//             iconType="circle"
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </ChartBox>
//   );
// }

// export default ItemShareChart;

// the calculation is correct but its going in float . we could do either of the 2 below
// 1. just round off them to integer values.
// 2. round them off to integer values(PT) but separate the extra value in decimal and multiply by quantity_per_pt to convert it to pcs and show it along PT as PCS.
// 1-->above , 2-->below

import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useStock } from "../stock/useStock";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.2rem 1.2rem;
  grid-column: 1/-1;

  & > *:first-child {
    margin-bottom: 1rem;
  }
`;

const Bars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BarRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  color: var(--color-grey-700);

  & > span:last-child {
    color: var(--color-grey-500);
  }
`;

const Change = styled.span`
  margin-left: 0.6rem;
  font-weight: 500;
  color: ${(props) =>
    props.$change > 0
      ? "var(--color-green-700)"
      : props.$change < 0
        ? "var(--color-red-700)"
        : "var(--color-grey-500)"};
`;

const Caption = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: right;
  color: var(--color-grey-500);
`;

const Track = styled.div`
  height: 0.8rem;
  border-radius: 100px;
  background-color: var(--color-grey-100);
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  border-radius: 100px;
  background-color: var(--color-brand-600);
`;

function prepareData(orders, stock) {
  // We'll accumulate raw totals (as a float) for each item.
  // The key will be the item name and the value an object with rawTotal and conversionFactor.
  const itemData = {};

  orders.forEach((order) => {
    // Process paid items.
    order.order_items.forEach((orderItem) => {
      if (orderItem.item_id !== 0) {
        const key = orderItem.item_name;
        // Look up the conversion factor from stock using orderItem.item_id.
        const stockItem = stock.find(
          (s) => String(s.id) === String(orderItem.item_id),
        );
        const conversionFactor =
          stockItem && stockItem.quantity_per_pt
            ? stockItem.quantity_per_pt
            : 1;
        if (!itemData[key]) {
          itemData[key] = { rawTotal: 0, conversionFactor };
        }
        itemData[key].rawTotal += orderItem.item_quantity;
      }
    });

    // Process free items.
    order.order_items.forEach((orderItem) => {
      if (orderItem.free_items && orderItem.free_items.length > 0) {
        orderItem.free_items.forEach((freeItem) => {
          const key = freeItem.free_item_name;
          // Look up conversion factor from stock using freeItem.free_item_id.
          const stockItem = stock.find(
            (s) => String(s.id) === String(freeItem.free_item_id),
          );
          const conversionFactor =
            stockItem && stockItem.quantity_per_pt
              ? stockItem.quantity_per_pt
              : 1;
          if (!itemData[key]) {
            itemData[key] = { rawTotal: 0, conversionFactor };
          }
          // Convert free quantity into PT units.
          itemData[key].rawTotal +=
            freeItem.free_item_quantity / conversionFactor;
        });
      }
    });
  });

  // Now, convert raw totals into integer (PT) and remainder (PCS) using the conversion factor.
  const data = Object.keys(itemData).map((itemName) => {
    const { rawTotal, conversionFactor } = itemData[itemName];
    const pt = Math.floor(rawTotal);
    const pcs = Math.round((rawTotal - pt) * conversionFactor);
    return {
      itemName,
      // exact quantity in PT, used for sorting and bar length
      total: rawTotal,
      // readable "X pt Y pcs" shown next to the bar
      breakdown: `${pt} pt ${pcs} pcs`,
    };
  });

  return data;
}

function ItemShareChart({ orders, prevOrders, compareLabel }) {
  const { isLoadingStock, error, stock } = useStock();

  if (isLoadingStock) return null;
  if (error) return <p>Error: {error.message}</p>;

  const data = prepareData(orders, stock).sort((a, b) => b.total - a.total);
  const grandTotal = data.reduce((acc, cur) => acc + cur.total, 0);
  const max = data[0]?.total || 1;

  // % change per item vs the previous period (null when it has no earlier sales)
  const prevTotals = {};
  if (prevOrders)
    prepareData(prevOrders, stock).forEach((i) => {
      prevTotals[i.itemName] = i.total;
    });
  const changeOf = (item) =>
    prevTotals[item.itemName]
      ? ((item.total - prevTotals[item.itemName]) / prevTotals[item.itemName]) *
        100
      : null;
  const hasChange = data.some((item) => changeOf(item) !== null);

  return (
    <ChartBox>
      <Heading as="h4">Item Share in Orders</Heading>
      <Bars>
        {data.map((item) => {
          const change = changeOf(item);
          return (
            <BarRow key={item.itemName}>
              <BarLabel>
                <span>{item.itemName}</span>
                <span>
                  {item.breakdown} ·{" "}
                  {grandTotal ? Math.round((item.total / grandTotal) * 100) : 0}
                  %
                  {change !== null && (
                    <Change $change={change}>
                      {change > 0 ? "↑" : change < 0 ? "↓" : "–"}{" "}
                      {Math.abs(Math.round(change))}%
                    </Change>
                  )}
                </span>
              </BarLabel>
              <Track>
                <Fill style={{ width: `${(item.total / max) * 100}%` }} />
              </Track>
            </BarRow>
          );
        })}
      </Bars>
      {hasChange && <Caption>% change vs {compareLabel}</Caption>}
    </ChartBox>
  );
}

export default ItemShareChart;
