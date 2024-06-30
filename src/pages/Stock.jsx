import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import RefillStockForm from "../features/stock/RefillStockForm";
import StockTable from "../features/stock/StockTable";
import CreateNewStockItem from "../features/stock/CreateNewStockItem";

const Stacked = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

function Stocks() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Stock</Heading>
        <Stacked>
          <Modal>
            <Modal.Open opens="addStockItem">
              <Button size="small">Add Stock</Button>
            </Modal.Open>

            <Modal.Open opens="refillStock">
              <Button size="small">Refill Stock</Button>
            </Modal.Open>

            <Modal.Window name="refillStock">
              <RefillStockForm />
            </Modal.Window>
            <Modal.Window name="addStockItem">
              <CreateNewStockItem />
            </Modal.Window>
          </Modal>
        </Stacked>
      </Row>

      <Row>
        <StockTable />
      </Row>
    </Menus>
  );
}

export default Stocks;
