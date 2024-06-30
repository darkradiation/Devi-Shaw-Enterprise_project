// CustomerTable.jsx
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./useCustomers";

function CustomerTable() {
  const { isLoadingCustomers, customers } = useCustomers();
  const [searchParams] = useSearchParams();

  const isWorking = isLoadingCustomers;
  if (isWorking) return <Spinner />;

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

  // 2) FILTER
  const searchTerm = searchParams.get("search") || "";
  const filteredCustomers = sortedCustomers.filter((customer) =>
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

export default CustomerTable;
