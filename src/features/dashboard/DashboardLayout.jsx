import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";

import { useRecentOrders } from "./useRecentOrders";
import SalesMetricsChart from "./SalesMetricsChart";
import ItemShareChart from "./ItemShareChart";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  gap: 1.2rem;
`;

function DashboardLayout() {
  const { isLoadingRecentOrders, recentOrders, numDays } = useRecentOrders();
  const isWorking = isLoadingRecentOrders;
  if (isWorking) return <Spinner />;
  // console.log(recentOrders);

  if (recentOrders?.length === 0) return <p>no orders found.</p>;

  return (
    <StyledDashboardLayout>
      <Stats orders={recentOrders} numDays={numDays} />
      {numDays === 1 && <TodayActivity />}
      {numDays > 1 && <SalesChart orders={recentOrders} numDays={numDays} />}
      {numDays > 1 && (
        <SalesMetricsChart orders={recentOrders} numDays={numDays} />
      )}
      <ItemShareChart orders={recentOrders} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
