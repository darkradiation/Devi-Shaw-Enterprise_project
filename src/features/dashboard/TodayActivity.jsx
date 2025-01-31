import Menus from "../../ui/Menus";
import Row from "../../ui/Row";
import DailyCustomerTable from "./DailyCustomerTable";
import DailyCustomerTableOperations from "./DailyCustomerTableOperations";

function TodayActivity() {
  return (
    <div>
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
