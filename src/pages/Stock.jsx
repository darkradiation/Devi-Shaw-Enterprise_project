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
import { SiLevelsdotfyi } from "react-icons/si";
import { useStock } from "../features/stock/useStock";
import { useAddStockLevel } from "../features/stockLevel/useAddStockLevel";

function Stocks() {
  const { isLoadingStock, stock } = useStock();
  const { addStockLevel, isAddingStockLevel } = useAddStockLevel();
  const isWorking = isLoadingStock || isAddingStockLevel;
  while (isWorking) return;

  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Stock</Heading>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={"stock"} icon={<TiThMenu />} />
            <Menus.List id={"stock"}>
              <Modal.Open opens="addStockItem">
                <Menus.Button icon={<AiOutlineAppstoreAdd />} level={2}>
                  Add Stock
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="refillStock">
                <Menus.Button icon={<FaFill />} level={2}>
                  Refill Stock
                </Menus.Button>
              </Modal.Open>
              <Menus.Button icon={<IoPeople />}>
                <NavLink to="/suppliers">Suppliers</NavLink>
              </Menus.Button>
              <Menus.Button icon={<FaHistory />}>
                <NavLink to="/stock_history">Stock History</NavLink>
              </Menus.Button>
              <Menus.Button
                icon={<SiLevelsdotfyi />}
                level={2}
                onClick={() => addStockLevel({ stock })}
              >
                Record Stock Level
              </Menus.Button>
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
