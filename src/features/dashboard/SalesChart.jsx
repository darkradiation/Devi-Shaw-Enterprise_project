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
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useStock } from "../stock/useStock";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function calculateItemSales(orders, date, itemId) {
  return orders
    .filter((order) => isSameDay(date, new Date(order.order_date)))
    .reduce((acc, cur) => {
      const item = cur.order_items.find((item) => item.item_id === itemId);
      return acc + (item ? item.item_quantity : 0);
    }, 0);
}

function generateStrokeColors(numItems) {
  const colors = [];
  for (let i = 0; i < numItems; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colors;
}

function SalesChart({ orders, numDays }) {
  const { isDarkMode } = useDarkMode();
  const { isLoadingStock, error, stock } = useStock();

  if (isLoadingStock) return null;
  if (error) return <p>Error: {error.message}</p>;

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const itemIds = stock.map((item) => item.id);
  const itemNames = stock.map((item) => item.item_name);
  const strokeColors = generateStrokeColors(itemIds.length);

  const data = allDates.map((date) => {
    const itemSales = {};
    itemIds.forEach((itemId, index) => {
      itemSales[itemNames[index]] = calculateItemSales(orders, date, itemId);
    });
    return {
      label: format(date, "MMM dd"),
      ...itemSales,
    };
  });

  const colors = isDarkMode
    ? {
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h4">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>
      <ResponsiveContainer height={300} width="90%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit=""
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {itemNames.map((itemName, index) => (
            <Area
              key={itemName}
              dataKey={itemName}
              type="monotone"
              stroke={strokeColors[index]}
              strokeWidth={2}
              fillOpacity={0} // to make the chart transparent
              name={itemName}
              unit=" pt."
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
