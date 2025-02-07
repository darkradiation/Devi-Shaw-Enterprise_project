import { HiPencil, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

import EditRouteForm from "./EditRouteForm";
import { useDeleteRoute } from "./useDeleteRoute";

function RouteRow({ route }) {
  const { id, route_name, near_or_far, distance } = route;

  const { isDeletingRoute, deleteRoute } = useDeleteRoute();
  const isWorking = isDeletingRoute;

  return (
    <Table.Row role="row">
      <Modal>
        <div>{id}</div>
        <div>{route_name}</div>
        <div>{near_or_far}</div>
        <div>{distance}</div>

        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />} checkAccess={true}>
                Edit
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} checkAccess={true}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="edit">
            <EditRouteForm route={route} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="route"
              disabled={isWorking}
              onConfirm={() => deleteRoute({ id })}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default RouteRow;
