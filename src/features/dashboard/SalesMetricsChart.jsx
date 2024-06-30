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

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function calculateMetric(orders, date, metric) {
  if (metric === "order_count") {
    return orders.filter((order) => isSameDay(date, new Date(order.order_date)))
      .length;
  }
  return orders
    .filter((order) => isSameDay(date, new Date(order.order_date)))
    .reduce((acc, cur) => acc + cur[metric], 0);
}

function generateStrokeColors(numMetrics) {
  const colors = [];
  for (let i = 0; i < numMetrics; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colors;
}

function SalesMetricsChart({ orders, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const metrics = ["bill_value", "profit", "order_count"];
  const strokeColors = generateStrokeColors(metrics.length);

  const data = allDates.map((date) => {
    const metricValues = {};
    metrics.forEach((metric) => {
      metricValues[metric] = Number(
        calculateMetric(orders, date, metric)
      ).toFixed(2);
    });
    return {
      label: format(date, "MMM dd"),
      ...metricValues,
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
        Sales Metrics, {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
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
          {metrics.map((metric, index) => (
            <Area
              key={metric}
              dataKey={metric}
              type="monotone"
              stroke={strokeColors[index]}
              strokeWidth={2}
              fillOpacity={0} // to make the chart transparent
              name={metric.replace("_", " ")}
              unit={metric === "order_count" ? "" : ""}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesMetricsChart;
