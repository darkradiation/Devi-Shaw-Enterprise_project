import Table from "../../ui/Table";
import SupplierRow from "./SupplierRow";
import { useSuppliers } from "./useSuppliers";
import Spinner from "../../ui/Spinner";

function SupplierTable() {
  const { isLoadingSuppliers, suppliers } = useSuppliers();
  if (isLoadingSuppliers) return <Spinner />;
  return (
    <>
      <Table columns="1fr 3fr 3fr 1fr">
        <Table.Header>
          <div>id</div>
          <div>name</div>
          <div>phone no.</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={suppliers}
          render={(supplier) => (
            <SupplierRow supplier={supplier} key={supplier.id} />
          )}
        />
      </Table>
    </>
  );
}

export default SupplierTable;
