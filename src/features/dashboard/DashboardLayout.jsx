import { format, addDays } from "date-fns";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import SalesMetricsChart from "./SalesMetricsChart";
import ItemShareChart from "./ItemShareChart";
import TodayActivity from "./TodayActivity";
import Row from "../../ui/Row";
import Button from "../../ui/Button";

import { useFilteredOrders } from "./useFilteredOrders";
import { useIsAdmin } from "../authentication/useIsAdmin";
import {
  downloadModifiedOrdersCSV,
  downloadModifiedStockHistoryCSV,
} from "../../services/apiDownloadCsv";

const StyledDashboardLayout = styled.div`
  display: grid;
  gap: 1.2rem;
`;
const DownLoadBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
`;

function DashboardLayout() {
  const { isAdmin } = useIsAdmin();
  const { isLoading, orders, startDate, endDate, numDays } =
    useFilteredOrders();
  const isWorking = isLoading;
  if (isWorking) return <Spinner />;

  // Convert dates: format startDate as "yyyy-MM-dd" for the API
  // and increment endDate by one day, then format it.
  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(addDays(endDate, 1), "yyyy-MM-dd");

  if (orders?.length === 0)
    return (
      <StyledDashboardLayout>
        {/* {numDays === 1 && <TodayActivity />} */}
        <Row>no orders found.</Row>
      </StyledDashboardLayout>
    );

  return (
    <StyledDashboardLayout>
      <Stats orders={orders} />
      {/* {numDays === 1 && <TodayActivity />} */}
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

      {isAdmin && (
        <DownLoadBox>
          <Button
            onClick={() =>
              downloadModifiedOrdersCSV({
                startDate: formattedStartDate,
                endDate: formattedEndDate,
              })
            }
          >
            Download Orders
          </Button>
          <Button
            onClick={() =>
              downloadModifiedStockHistoryCSV({
                startDate: formattedStartDate,
                endDate: formattedEndDate,
              })
            }
          >
            Download Stock History
          </Button>
        </DownLoadBox>
      )}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
