import styled from "styled-components";
import { format } from "date-fns";
import { BiDetail } from "react-icons/bi";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import StockHistoryDetails from "./StockHistoryDetails";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function StockHistoryRow({ stockHistory }) {
  const {
    id,
    delivery_date,
    bill_value,
    suppliers: { supplier_name } = { supplier_name: "Unknown Supplier" },
  } = stockHistory;

  return (
    <Table.Row role="row">
      <Modal>
        <div>{id}</div>

        <Modal.Open opens="details">
          <Stacked>
            <span>{format(new Date(delivery_date), "MMM dd")}</span>
            <span>{format(new Date(delivery_date), "yyyy")}</span>
          </Stacked>
        </Modal.Open>

        <Modal.Open opens="details">
          <div>{supplier_name}</div>
        </Modal.Open>

        <Modal.Open opens="details">
          <div>Rs. {bill_value}</div>
        </Modal.Open>

        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="details">
              <Menus.Button icon={<BiDetail />}>Details</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="details">
            <StockHistoryDetails stockHistory={stockHistory} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default StockHistoryRow;
