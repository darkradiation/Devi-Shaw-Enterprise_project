import Searchbar from "../../ui/Searchbar";
import Row from "../../ui/Row";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function OrderTableOperations() {
  return (
    <>
      <Row type="horizontal">
        <Searchbar />
        <SortBy
          options={[
            { value: "order_date-desc", label: "Order date (desc)" },
            { value: "order_date-asc", label: "Order date (asc)" },
            { value: "bill_value-asc", label: "Bill price (asc)" },
            { value: "bill_value-desc", label: "Bill price (desc)" },
          ]}
        />
      </Row>
      <Row type="horizontal">
        <Filter
          filterField="status"
          options={[
            { value: "all", label: "All" },
            { value: "paid", label: "Paid" },
            { value: "due", label: "Due" },
            { value: "pending", label: "Pending" },
          ]}
        />
      </Row>
    </>
  );
}

export default OrderTableOperations;
