import { HiPencil, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

import EditSupplierForm from "./EditSupplierForm";
import { useDeleteSupplier } from "./useDeleteSupplier";

function SupplierRow({ supplier }) {
  const { id, supplier_name, phone_no } = supplier;

  const { isDeletingSupplier, deleteSupplier } = useDeleteSupplier();
  const isWorking = isDeletingSupplier;

  return (
    <Table.Row role="row">
      <Modal>
        <div>{id}</div>
        <div>{supplier_name}</div>
        <div>{phone_no}</div>

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
            <EditSupplierForm supplier={supplier} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="supplier"
              disabled={isWorking}
              onConfirm={() => deleteSupplier({ id })}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default SupplierRow;
