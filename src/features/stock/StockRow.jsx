import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import styled from "styled-components";
import EditStockItem from "./EditStockItem";
import { useDeleteStockItem } from "./useDeleteStockitem";

const Stacked2 = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  gap: 0.2rem;

  & span:first-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  & span:last-child {
    font-weight: 400;
  }
`;
const Stacked1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.2rem;
`;

function StockRow({ item }) {
  const {
    id,
    item_name,
    buying_price_per_pt,
    base_selling_price_per_pt,
    available_stock: { pt: available_pt, pcs: available_pcs },
    quantity_per_pt,
  } = item;

  const { isDeletingStockItem, deleteStockItem } = useDeleteStockItem();

  return (
    <Table.Row role="row">
      <Stacked1>
        <div>{item_name}</div>
        <Stacked2>
          <span>{quantity_per_pt}pcs</span>
        </Stacked2>
      </Stacked1>

      <Stacked1>
        <Stacked2>
          <span>BP - </span>
          <span>Rs.{buying_price_per_pt}</span>
        </Stacked2>
        <Stacked2>
          <span>SP - </span>
          <span>Rs.{base_selling_price_per_pt}</span>
        </Stacked2>
      </Stacked1>

      <Stacked1>
        {available_pt !== "0" && (
          <Stacked2>
            <span>Pt. - </span>
            <span>{available_pt}</span>
          </Stacked2>
        )}
        {available_pcs !== "0" && (
          <Stacked2>
            <span>Pcs - </span>
            <span>{available_pcs}</span>
          </Stacked2>
        )}
        {available_pt === "0" && available_pcs === "0" && <span>--</span>}
      </Stacked1>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="edit">
            <EditStockItem item={item} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="stock item"
              disabled={isDeletingStockItem}
              onConfirm={() => deleteStockItem({ id })}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default StockRow;
