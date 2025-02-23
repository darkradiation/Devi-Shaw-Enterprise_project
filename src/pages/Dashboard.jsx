import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  return (
    <>
      {/* <Row type="horizontal">
        
      </Row> */}
      <Row type="horizontal">
        <Heading as="h4">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <Row>{<DashboardLayout />}</Row>
    </>
  );
}

export default Dashboard;
