import Menus from "../../ui/Menus";
import Row from "../../ui/Row";
import CustomerTableOperations from "../customers/CustomerTableOperations";
import DailyCustomerTable from "./DailyCustomerTable";

function TodayActivity() {
  return (
    <div>
      <Menus>
        <Row type="horizontal">
          <CustomerTableOperations />
        </Row>
        <Row>
          <DailyCustomerTable />
        </Row>
      </Menus>
    </div>
  );
}

export default TodayActivity;
