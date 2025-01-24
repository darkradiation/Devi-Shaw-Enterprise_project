// CustomerTable.jsx
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CustomerRow from "./DailyCustomerRow";
import { useCustomers } from "../customers/useCustomers";

function DailyCustomerTable() {
  const { isLoadingCustomers, customers } = useCustomers();
  const [searchParams] = useSearchParams();

  const isWorking = isLoadingCustomers;
  if (isWorking) return <Spinner />;

  // FILTER on basis of day
  // get the day , convert to int , like mon->0,tue->1,wed->2,...,sun->6
  // filter the customer whose route_id === day(int) calculated above

  // 1) SORT
  const sortBy = searchParams.get("sortBy") || "id-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCustomers = [...customers];
  if (field === "id") {
    sortedCustomers.sort((a, b) => (a[field] - b[field]) * modifier);
  } else if (field === "store_name") {
    sortedCustomers.sort((a, b) => {
      if (a.store_name > b.store_name) return modifier;
      if (a.store_name < b.store_name) return -modifier;
      return 0;
    });
  }

  // 2) FILTER BY TODAY'S DAY
  const today = new Date();
  const dayOfWeek = today.getDay(); // Returns 0 (Sunday) to 6 (Saturday)

  // Adjust to match your route_id mapping (1=Monday to 7=Sunday)
  const routeDay = dayOfWeek === 0 ? 7 : dayOfWeek;

  // Filter customers for today's route
  let filteredByDay = sortedCustomers.filter(
    (customer) => customer.route_id === routeDay
  );

  // 3) FILTER BY SEARCH TERM (keep existing search logic)
  const searchTerm = searchParams.get("search") || "";
  const filteredCustomers = filteredByDay.filter((customer) =>
    customer.store_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Table columns="1fr 8fr 6fr">
      <Table.Header>
        <div>id</div>
        <div>Store</div>
        <div>Operations</div>
      </Table.Header>
      <Table.Body
        data={filteredCustomers}
        render={(customer) => (
          <CustomerRow customer={customer} key={customer.id} />
        )}
      />
    </Table>
  );
}

export default DailyCustomerTable;
