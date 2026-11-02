import Menus from "../../ui/Menus";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import DailyCustomerTable from "./DailyCustomerTable";
import DailyCustomerTableOperations from "./DailyCustomerTableOperations";

function TodayActivity() {
  return (
    <div>
      <Heading as="h4">Today&apos;s route</Heading>
      <Menus>
        <Row type="horizontal">
          <DailyCustomerTableOperations />
        </Row>
        <Row>
          <DailyCustomerTable />
        </Row>
      </Menus>
    </div>
  );
}

export default TodayActivity;
