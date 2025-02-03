import { NavLink } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { IoPeople } from "react-icons/io5";
import { FaFill, FaHistory } from "react-icons/fa";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";

import RefillStockForm from "../features/stock/RefillStockForm";
import StockTable from "../features/stock/StockTable";
import CreateNewStockItem from "../features/stock/CreateNewStockItem";
import Suppliers from "./Suppliers";

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
                <Menus.Button icon={<AiOutlineAppstoreAdd />}>
                  Add Stock
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="refillStock">
                <Menus.Button icon={<FaFill />}>Refill Stock</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="stockHistory">
                <Menus.Button icon={<FaHistory />}>Stock History</Menus.Button>
              </Modal.Open>
              <Menus.Button icon={<IoPeople />}>
                <NavLink to="/suppliers">Suppliers</NavLink>
              </Menus.Button>
            </Menus.List>

            <Modal.Window name="refillStock">
              <RefillStockForm />
            </Modal.Window>
            <Modal.Window name="addStockItem">
              <CreateNewStockItem />
            </Modal.Window>
            <Modal.Window name="stockHistory"></Modal.Window>
            <Modal.Window name="suppliers">
              <Suppliers />
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
