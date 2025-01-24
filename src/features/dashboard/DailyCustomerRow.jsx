import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CustomerRowOperations from "../customers/CustomerRowOperations";

import styled from "styled-components";
import CreateOrderForm from "../orders/CreateOrderForm";
import { FaCartPlus, FaCheck } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import CustomerDetails from "../customers/CustomerDetails";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const Operations = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function DailyCustomerRow({ customer }) {
  const [visited, setVisited] = useState(false);
  const { id, store_name, store_address, store_geoLink } = customer;
  const isWorking = false;
  if (isWorking) return;

  return (
    <>
      <Table.Row role="row" visited={visited}>
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
                {!visited && (
                  <Menus.Button
                    icon={<FaCheck />}
                    onClick={() => setVisited(true)}
                  >
                    Visited
                  </Menus.Button>
                )}
                {visited && (
                  <Menus.Button
                    icon={<IoCloseSharp />}
                    onClick={() => setVisited(false)}
                  >
                    Unvisited
                  </Menus.Button>
                )}
              </Menus.List>
              <Modal.Window name="details">
                <CustomerDetails customer={customer} id={id} />
              </Modal.Window>
              <Modal.Window name="order">
                <CreateOrderForm store_id={id} />
              </Modal.Window>
            </Menus.Menu>
          </Operations>
        </Modal>
      </Table.Row>
    </>
  );
}

export default DailyCustomerRow;
