import Table from "../../ui/Table";
import RouteRow from "./RouteRow";
import { useRoutes } from "./useRoutes";
import Spinner from "../../ui/Spinner";

function RouteTable() {
  const { isLoadingRoutes, routes } = useRoutes();
  if (isLoadingRoutes) return <Spinner />;
  return (
    <>
      <Table columns="1fr 4fr 3fr 2fr 1fr">
        <Table.Header>
          <div>id</div>
          <div>Name</div>
          <div>Near/Far</div>
          <div>Distance</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={routes}
          render={(route) => <RouteRow route={route} key={route.id} />}
        />
      </Table>
    </>
  );
}

export default RouteTable;
