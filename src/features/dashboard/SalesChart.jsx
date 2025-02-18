// import styled from "styled-components";
// import DashboardBox from "./DashboardBox";
// import Heading from "../../ui/Heading";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useDarkMode } from "../../context/DarkModeContext";
// import { eachDayOfInterval, format, isSameDay } from "date-fns";
// import { useStock } from "../stock/useStock";

// const StyledSalesChart = styled(DashboardBox)`
//   grid-column: 1 / -1;

//   /* Hack to change grid line colors */
//   & .recharts-cartesian-grid-horizontal line,
//   & .recharts-cartesian-grid-vertical line {
//     stroke: var(--color-grey-300);
//   }
// `;

// // Calculate total sales for an item on a given date.
// function calculateItemSales(orders, date, itemId, conversionFactor) {
//   return Math.round(
//     orders
//       .filter((order) => isSameDay(date, new Date(order.order_date)))
//       .reduce((acc, cur) => {
//         let paidQuantity = 0;
//         let freeQuantity = 0;

//         cur.order_items.forEach((item) => {
//           // Compare IDs as strings to avoid type mismatches
//           if (String(item.item_id) === String(itemId)) {
//             paidQuantity += item.item_quantity;
//           }
//           // Look in free_items for this item regardless of which order_item it's attached to.
//           if (item.free_items && item.free_items.length > 0) {
//             item.free_items.forEach((freeItem) => {
//               if (String(freeItem.free_item_id) === String(itemId)) {
//                 freeQuantity += freeItem.free_item_quantity;
//               }
//             });
//           }
//         });

//         // Convert free quantity to PT units using the conversion factor.
//         const freeInPT = conversionFactor
//           ? freeQuantity / conversionFactor
//           : freeQuantity;
//         return acc + paidQuantity + freeInPT;
//       }, 0)
//   );
// }

// function generateStrokeColors(numItems) {
//   const colors = [];
//   for (let i = 0; i < numItems; i++) {
//     colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
//   }
//   return colors;
// }

// function SalesChart({ orders, startDate, endDate }) {
//   const { isDarkMode } = useDarkMode();
//   const { isLoadingStock, error, stock } = useStock();

//   if (isLoadingStock) return null;
//   if (error) return <p>Error: {error.message}</p>;

//   // Create an array of all dates between startDate and endDate.
//   const allDates = eachDayOfInterval({
//     start: startDate,
//     end: endDate,
//   });

//   // Prepare arrays from the stock data.
//   const itemIds = stock.map((item) => item.id);
//   const itemNames = stock.map((item) => item.item_name);
//   const strokeColors = generateStrokeColors(itemIds.length);

//   // For each date, calculate the sales for each item.
//   const data = allDates.map((date) => {
//     const itemSales = {};
//     itemIds.forEach((itemId, index) => {
//       // Use the conversion factor from the stock (make sure it's non-zero)
//       const itemStock = stock.find((s) => s.id === itemId);
//       const conversionFactor = itemStock.quantity_per_pt || 1;
//       const totalSales = calculateItemSales(
//         orders,
//         date,
//         itemId,
//         conversionFactor
//       );
//       itemSales[itemNames[index]] = totalSales;
//     });
//     return {
//       label: format(date, "MMM dd"),
//       ...itemSales,
//     };
//   });

//   const colors = isDarkMode
//     ? {
//         text: "#e5e7eb",
//         background: "#18212f",
//       }
//     : {
//         text: "#374151",
//         background: "#fff",
//       };

//   return (
//     <StyledSalesChart>
//       <Heading as="h4">
//         Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
//         {format(allDates.at(-1), "MMM dd yyyy")}
//       </Heading>
//       <ResponsiveContainer height={300} width="90%">
//         <AreaChart data={data}>
//           <XAxis
//             dataKey="label"
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <YAxis
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <CartesianGrid strokeDasharray="4" />
//           <Tooltip contentStyle={{ backgroundColor: colors.background }} />
//           {itemNames.map((itemName, index) => (
//             <Area
//               key={itemName}
//               dataKey={itemName}
//               type="monotone"
//               stroke={strokeColors[index]}
//               strokeWidth={2}
//               fillOpacity={0} // Make the area transparent.
//               name={itemName}
//               unit=" pt."
//             />
//           ))}
//         </AreaChart>
//       </ResponsiveContainer>
//     </StyledSalesChart>
//   );
// }

// export default SalesChart;

// the calculation is correct but its going in float . we could do either of the 2 below
// 1. just round off them to integer values.
// 2. round them off to integer values(PT) but separate the extra value in decimal and multiply by quantity_per_pt to convert it to pcs and show it along PT as PCS.
// 1-->above , 2-->below

import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay } from "date-fns";
import { useStock } from "../stock/useStock";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// Calculate raw total sales for an item on a given date (as a float)
function calculateItemSales(orders, date, itemId, conversionFactor) {
  return orders
    .filter((order) => isSameDay(date, new Date(order.order_date)))
    .reduce((acc, cur) => {
      let paidQuantity = 0;
      let freeQuantity = 0;

      cur.order_items.forEach((item) => {
        // Compare IDs as strings to avoid type mismatches.
        if (String(item.item_id) === String(itemId)) {
          paidQuantity += item.item_quantity;
        }
        // Look in free_items for this item.
        if (item.free_items && item.free_items.length > 0) {
          item.free_items.forEach((freeItem) => {
            if (String(freeItem.free_item_id) === String(itemId)) {
              freeQuantity += freeItem.free_item_quantity;
            }
          });
        }
      });

      // Convert free quantity to PT units using the conversion factor.
      const freeInPT = conversionFactor
        ? freeQuantity / conversionFactor
        : freeQuantity;
      return acc + paidQuantity + freeInPT;
    }, 0);
}

function generateStrokeColors(numItems) {
  const colors = [];
  for (let i = 0; i < numItems; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colors;
}

// Custom Tooltip to display breakdown as "X PT Y PCS"
// Custom Tooltip to display breakdown as "ItemName: X PT Y PCS"
const CustomTooltip = ({ active, payload, colorsConfig }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: colorsConfig.background,
          color: colorsConfig.text,
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p
          className="label"
          style={{ fontWeight: "bold", marginBottom: "5px" }}
        >
          {dataPoint.label}
        </p>
        {payload.map((entry, index) => {
          const breakdownKey = `${entry.name}_breakdown`;
          return (
            <p
              key={`tooltip-${index}`}
              style={{ color: entry.stroke, margin: 0, fontSize: "1.4rem" }}
            >
              {`${entry.name}: ${dataPoint[breakdownKey]}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

function SalesChart({ orders, startDate, endDate }) {
  const { isDarkMode } = useDarkMode();
  const { isLoadingStock, error, stock } = useStock();

  if (isLoadingStock) return null;
  if (error) return <p>Error: {error.message}</p>;

  // Create an array of dates between startDate and endDate.
  const allDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // Prepare arrays from stock data.
  const itemIds = stock.map((item) => item.id);
  const itemNames = stock.map((item) => item.item_name);
  const strokeColors = generateStrokeColors(itemIds.length);

  // Build the chart data.
  const data = allDates.map((date) => {
    const itemSales = {};
    itemIds.forEach((itemId, index) => {
      const itemStock = stock.find((s) => s.id === itemId);
      // Use quantity_per_pt as conversion factor (default to 1 if falsy)
      const conversionFactor = itemStock.quantity_per_pt || 1;
      // Get the raw total sales (as float)
      const rawTotal = calculateItemSales(
        orders,
        date,
        itemId,
        conversionFactor
      );
      // Separate into integer (PT) and fractional part (to be converted to pieces)
      const pt = Math.floor(rawTotal);
      const pcs = Math.round((rawTotal - pt) * conversionFactor);
      // For plotting, use the integer part.
      itemSales[itemNames[index]] = pt;
      // Also store a breakdown string for tooltip, e.g., "3 PT 1 PCS"
      itemSales[`${itemNames[index]}_breakdown`] = `${pt} pt ${pcs} pcs`;
    });
    return {
      label: format(date, "MMM dd"),
      ...itemSales,
    };
  });

  const colorsConfig = isDarkMode
    ? { text: "#e5e7eb", background: "#18212f" }
    : { text: "#374151", background: "#fff" };

  return (
    <StyledSalesChart>
      <Heading as="h4">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="90%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colorsConfig.text }}
            tickLine={{ stroke: colorsConfig.text }}
          />
          <YAxis
            tick={{ fill: colorsConfig.text }}
            tickLine={{ stroke: colorsConfig.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip content={<CustomTooltip />} colorsConfig={colorsConfig} />
          {itemNames.map((itemName, index) => (
            <Area
              key={itemName}
              dataKey={itemName}
              type="monotone"
              stroke={strokeColors[index]}
              strokeWidth={2}
              fillOpacity={0} // Transparent area fill
              name={itemName}
              unit=" PT"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
