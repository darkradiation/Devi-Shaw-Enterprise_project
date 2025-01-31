import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import RefillStockForm from "../features/stock/RefillStockForm";
import StockTable from "../features/stock/StockTable";
import CreateNewStockItem from "../features/stock/CreateNewStockItem";
import { TiThMenu } from "react-icons/ti";

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
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={"stock"} icon={<TiThMenu />} />
            <Menus.List id={"stock"}>
              <Modal.Open opens="addStockItem">
                <Menus.Button>Add Stock</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="refillStock">
                <Menus.Button>Refill Stock</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="stockHistory">
                <Menus.Button>Stock History</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="suppliers">
                <Menus.Button>Suppliers</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="refillStock">
              <RefillStockForm />
            </Modal.Window>
            <Modal.Window name="addStockItem">
              <CreateNewStockItem />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Row>

      <Row>
        <StockTable />
      </Row>
    </Menus>
  );
}

export default Stocks;
