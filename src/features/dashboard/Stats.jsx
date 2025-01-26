import {
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* gap: 1.2rem; */
`;

function Stats({ orders, numDays }) {
  const numOrders = orders.length;

  const sales = orders.reduce((acc, cur) => acc + cur.bill_value, 0);
  const profit = orders.reduce((acc, cur) => acc + cur.profit, 0);

  return (
    <StyledStats>
      <Stat
        title="Orders"
        value={numOrders}
        icon={<HiOutlineShoppingCart />}
        color="blue"
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color="green"
      />
      <Stat
        title="Profit"
        value={formatCurrency(profit)}
        icon={<HiOutlineChartBar />}
        color="indigo"
      />
    </StyledStats>
  );
}

export default Stats;
