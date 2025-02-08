import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CustomerRowOperations from "./CustomerRowOperations";
import EditCustomer from "./EditCustomer";
import CreateOrderForm from "../orders/CreateOrderForm";
import CustomerDetails from "./CustomerDetails";

import { useDeleteCustomer } from "./useDeleteCustomer";

const Operations = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function CustomerRow({ customer }) {
  const { id, store_name, store_address, store_geoLink } = customer;
  const { isDeletingCustomer, deleteCustomer } = useDeleteCustomer();
  const isWorking = isDeletingCustomer;
  if (isWorking) return;

  return (
    <>
      <Table.Row role="row">
        <Modal>
          <div>{id}</div>
          <Modal.Open opens="details">
            <div>
              <div>{store_name}</div>
            </div>
          </Modal.Open>
          <Operations>
            <CustomerRowOperations
              store_address={store_address}
              store_geoLink={store_geoLink}
            />

            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open opens="details">
                  <Menus.Button icon={<BiDetail />}>Details</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="order">
                  <Menus.Button icon={<FaCartPlus />} level={2}>
                    Order
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />} level={2}>
                    Edit
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />} level={3}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="details">
                <CustomerDetails customer={customer} id={id} />
              </Modal.Window>
              <Modal.Window name="order">
                <CreateOrderForm store_id={id} />
              </Modal.Window>
              <Modal.Window name="edit">
                <EditCustomer customer={customer} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="customer"
                  disabled={isDeletingCustomer}
                  onConfirm={() => {
                    deleteCustomer({ id });
                  }}
                />
              </Modal.Window>
            </Menus.Menu>
          </Operations>
        </Modal>
      </Table.Row>
    </>
  );
}

export default CustomerRow;
