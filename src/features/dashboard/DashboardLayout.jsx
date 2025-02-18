import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import SalesMetricsChart from "./SalesMetricsChart";
import ItemShareChart from "./ItemShareChart";
import TodayActivity from "./TodayActivity";
import Row from "../../ui/Row";

import { useFilteredOrders } from "./useFilteredOrders";

const StyledDashboardLayout = styled.div`
  display: grid;
  gap: 1.2rem;
`;

function DashboardLayout() {
  const { isLoading, orders, startDate, endDate, numDays } =
    useFilteredOrders();
  const isWorking = isLoading;
  if (isWorking) return <Spinner />;

  if (orders?.length === 0)
    return (
      <StyledDashboardLayout>
        {numDays === 1 && <TodayActivity />}
        <Row>no orders found.</Row>
      </StyledDashboardLayout>
    );

  return (
    <StyledDashboardLayout>
      <Stats orders={orders} />
      {numDays === 1 && <TodayActivity />}
      <ItemShareChart orders={orders} />
      {numDays > 1 && (
        <SalesChart orders={orders} startDate={startDate} endDate={endDate} />
      )}
      {numDays > 1 && (
        <SalesMetricsChart
          orders={orders}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
