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

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// Calculate metric value for a given date.
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

// Custom Tooltip for SalesMetricsChart.
// Displays the date and for each metric shows "Metric Name: Value"
const CustomMetricsTooltip = ({ active, payload, label, colorsConfig }) => {
  if (active && payload && payload.length) {
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
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`tooltip-${index}`}
            style={{ color: entry.stroke, margin: 0, fontSize: "1.4rem" }}
          >
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function SalesMetricsChart({ orders, startDate, endDate }) {
  const { isDarkMode } = useDarkMode();

  // Generate an array of dates between startDate and endDate.
  const allDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // Define the metrics to display.
  const metrics = ["bill_value", "profit", "order_count"];
  const strokeColors = generateStrokeColors(metrics.length);

  // Build chart data where each date has a value for each metric.
  const data = allDates.map((date) => {
    const metricValues = {};
    metrics.forEach((metric) => {
      metricValues[metric] = Number(
        calculateMetric(orders, date, metric).toFixed(2)
      );
    });
    return {
      label: format(date, "MMM dd"),
      ...metricValues,
    };
  });

  const colors = isDarkMode
    ? { text: "#e5e7eb", background: "#18212f" }
    : { text: "#374151", background: "#fff" };

  return (
    <StyledSalesChart>
      <Heading as="h4">
        Sales Metrics, {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={250} width="90%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip content={<CustomMetricsTooltip colorsConfig={colors} />} />
          {metrics.map((metric, index) => (
            <Area
              key={metric}
              dataKey={metric}
              type="monotone"
              stroke={strokeColors[index]}
              strokeWidth={2}
              fillOpacity={0.3}
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
