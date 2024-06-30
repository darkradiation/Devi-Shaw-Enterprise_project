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
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);

  padding: 1.2rem 0;
  grid-column: 1/-1;

  & > *:first-child {
    margin-bottom: 0.3rem;
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

function prepareData(orders) {
  const itemCount = {};

  orders.forEach((order) => {
    order.order_items.forEach((item) => {
      if (itemCount[item.item_name]) {
        itemCount[item.item_name] += item.item_quantity;
      } else {
        itemCount[item.item_name] = item.item_quantity;
      }
    });
  });

  const data = Object.keys(itemCount).map((itemName) => ({
    itemName,
    value: itemCount[itemName],
  }));

  return data;
}

function ItemShareChart({ orders }) {
  const data = prepareData(orders);
  const colors = generateColors(data.length);

  return (
    <ChartBox>
      <Heading as="h4">Item Share in Orders</Heading>
      <ResponsiveContainer width="90%" height={240}>
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
          <Tooltip />
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
