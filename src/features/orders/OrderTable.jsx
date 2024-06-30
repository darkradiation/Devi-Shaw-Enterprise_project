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

  // 1) FILTER
  // const filterValue = searchParams.get("status") || "all";
  // // console.log(filterValue);
  // let filteredOrders;
  // if (filterValue === "all") filteredOrders = orders;
  // else if (filterValue === "paid")
  //   filteredOrders = orders.filter(
  //     (order) => order.is_paid === true && order.is_delivered === true
  //   );
  // else if (filterValue === "due")
  //   filteredOrders = orders.filter(
  //     (order) => order.is_paid === false && order.is_delivered === true
  //   );
  // else if (filterValue === "pending")
  //   filteredOrders = orders.filter(
  //     (order) => order.is_paid === false && order.is_delivered === false
  //   );

  // 2) SORT
  // will implement server-side sorting instead of client-side because the orders object can be large .

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
