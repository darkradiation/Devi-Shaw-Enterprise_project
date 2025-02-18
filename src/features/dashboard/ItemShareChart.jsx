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
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useStock } from "../stock/useStock";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.2rem 0;
  grid-column: 1/-1;

  & > *:first-child {
    margin: 0 3.5rem 0.3rem 0;
    text-align: right;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function generateColors(numItems) {
  const colors = [];
  for (let i = 0; i < numItems; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colors;
}

// Custom Tooltip to display breakdown as "ItemName: X pt Y pcs"
const CustomTooltip = ({ active, payload, colorsConfig }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: colorsConfig.background,
          color: colorsConfig.text,
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
          {dataPoint.itemName}
        </p>
        <p style={{ margin: 0, fontSize: "1.4rem" }}>
          {`${dataPoint.itemName}: ${dataPoint.breakdown}`}
        </p>
      </div>
    );
  }
  return null;
};

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
          (s) => String(s.id) === String(orderItem.item_id)
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
            (s) => String(s.id) === String(freeItem.free_item_id)
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
      // For the pie chart value, we use the integer part (PT)
      value: pt,
      // And store a breakdown string for the tooltip.
      breakdown: `${pt} pt ${pcs} pcs`,
    };
  });

  return data;
}

function ItemShareChart({ orders }) {
  const { isDarkMode } = useDarkMode();
  const { isLoadingStock, error, stock } = useStock();

  if (isLoadingStock) return null;
  if (error) return <p>Error: {error.message}</p>;

  const data = prepareData(orders, stock);
  const colors = generateColors(data.length);

  const colorsConfig = isDarkMode
    ? { text: "#e5e7eb", background: "#18212f" }
    : { text: "#374151", background: "#fff" };

  return (
    <ChartBox>
      <Heading as="h4">Item Share in Orders</Heading>
      <ResponsiveContainer width="90%" height={180}>
        <PieChart>
          <Pie
            data={data}
            nameKey="itemName"
            dataKey="value"
            paddingAngle={3}
            innerRadius={55}
            outerRadius={80}
            cx="40%"
            cy="50%"
          >
            {data.map((entry, index) => (
              <Cell fill={colors[index]} key={`cell-${index}`} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip colorsConfig={colorsConfig} />} />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default ItemShareChart;
