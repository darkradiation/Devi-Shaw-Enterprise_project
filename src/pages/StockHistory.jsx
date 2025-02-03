import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import StockHistoryTable from "../features/stockHistory/StockHistoryTable";
import StockHistoryTableOperations from "../features/stockHistory/StockHistoryTableOperations";

function StockHistory() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Stock History</Heading>
        <StockHistoryTableOperations />
      </Row>

      <Row>
        <StockHistoryTable />
      </Row>
    </Menus>
  );
}

export default StockHistory;
