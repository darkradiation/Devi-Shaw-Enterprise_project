// import { useSearchParams } from "react-router-dom";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import OrderRow from "./OrderRow";

import { useOrders } from "./useOrders";
import Pagination from "../../ui/Pagination";

function OrderTable() {
  // const [searchParams] = useSearchParams();

  const { isLoadingOrders, orders, count } = useOrders();
  const isWorking = isLoadingOrders;
  if (isWorking) return <Spinner />;

  // 1) SORT & FILTER by status is applied on server side through api params
  // 2) Fiter by search terms

  return (
    <Table columns="1fr 7fr 4fr  1fr">
      <Table.Header>
        <div>id</div>
        <div>Store</div>
        <div>Price</div>
        <div></div>
      </Table.Header>
      <Table.Body
        // data={filteredOrders}
        data={orders}
        render={(order) => <OrderRow order={order} key={order.id} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default OrderTable;
