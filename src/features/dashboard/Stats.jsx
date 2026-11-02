import {
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineShoppingCart,
  HiOutlineWallet,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 0.4rem;
`;

const Money = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 0.4rem;
`;

const Caption = styled.p`
  margin-top: 0.4rem;
  font-size: 1rem;
  text-align: right;
  color: var(--color-grey-500);
`;

// collected / dues only count delivered orders (outstanding is set on delivery)
function totals(orders) {
  let sales = 0;
  let profit = 0;
  let collected = 0;
  let dues = 0;
  orders.forEach((o) => {
    sales += o.bill_value;
    profit += o.profit;
    if (!o.is_delivered) return;
    const outstanding = o.is_paid ? 0 : (o.outstanding_payment ?? o.bill_value);
    collected += o.bill_value - outstanding;
    dues += outstanding;
  });
  return { orders: orders.length, sales, profit, collected, dues };
}

const percentChange = (current, previous) =>
  previous ? ((current - previous) / previous) * 100 : null;

function Stats({ orders, prevOrders, compareLabel }) {
  const now = totals(orders);
  const before = prevOrders ? totals(prevOrders) : null;
  const change = (key) =>
    before ? percentChange(now[key], before[key]) : null;
  const hasChange = ["orders", "sales", "profit"].some(
    (key) => change(key) !== null,
  );

  return (
    <div>
      <StyledStats>
        <Stat
          title="Orders"
          value={now.orders}
          change={change("orders")}
          icon={<HiOutlineShoppingCart />}
          color="blue"
        />
        <Stat
          title="Sales"
          value={formatCurrency(now.sales)}
          change={change("sales")}
          icon={<HiOutlineBanknotes />}
          color="green"
        />
        <Stat
          title="Profit"
          value={formatCurrency(now.profit)}
          change={change("profit")}
          icon={<HiOutlineChartBar />}
          color="indigo"
        />
      </StyledStats>
      <Money>
        <Stat
          title="Collected"
          value={formatCurrency(now.collected)}
          icon={<HiOutlineWallet />}
          color="green"
        />
        <Stat
          title="Dues"
          value={formatCurrency(now.dues)}
          icon={<HiOutlineClock />}
          color="red"
        />
      </Money>
      {hasChange && <Caption>% change vs {compareLabel}</Caption>}
    </div>
  );
}

export default Stats;
