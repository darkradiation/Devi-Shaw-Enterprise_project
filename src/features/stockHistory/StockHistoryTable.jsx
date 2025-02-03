import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import StockHistoryRow from "./StockHistoryRow";
import { useStockHistory } from "./useStockHistory";
import Pagination from "../../ui/Pagination";

function StockHistoryTable() {
  const { isLoadingStockHistory, stockHistory, count } = useStockHistory();

  if (isLoadingStockHistory) return <Spinner />;

  return (
    <Table columns="1fr 2fr 3fr 3fr 1fr">
      <Table.Header>
        <div>ID</div>
        <div>Date</div>
        <div>Supplier</div>
        <div>Bill Value</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={stockHistory}
        render={(historyEntry) => (
          <StockHistoryRow stockHistory={historyEntry} key={historyEntry.id} />
        )}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default StockHistoryTable;
