import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CustomerRowOperations from "./CustomerRowOperations";

import { HiPencil, HiTrash } from "react-icons/hi2";
import EditCustomer from "./EditCustomer";
import ConfirmDelete from "../../ui/ConfirmDelete";
import styled from "styled-components";
import CreateOrderForm from "../orders/CreateOrderForm";
import { useDeleteCustomer } from "./useDeleteCustomer";
import { FaCartPlus } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import CustomerDetails from "./CustomerDetails";

const Operations = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BlueTag = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 1rem;

  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-lg);

  background-color: var(--color-blue-100);
  color: var(--color-blue-700);
`;

function CustomerRow({ customer }) {
  const {
    id,
    store_name,
    store_address,
    store_geoLink,
    // routes: { route_name, near_or_far },
  } = customer;
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
              {/* <BlueTag>{route_name}</BlueTag> */}
            </div>
          </Modal.Open>
          <Operations>
            <CustomerRowOperations
              store_address={store_address}
              store_geoLink={store_geoLink}
            />

            {/* <Modal> */}
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open opens="details">
                  <Menus.Button icon={<BiDetail />}>Details</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="order">
                  <Menus.Button icon={<FaCartPlus />}>Order</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
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
            {/* </Modal> */}
          </Operations>
        </Modal>
      </Table.Row>
    </>
  );
}

export default CustomerRow;
