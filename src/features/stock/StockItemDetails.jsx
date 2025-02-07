// StockItemDetails.jsx
import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import Heading from "../../ui/Heading";
import Table from "../../ui/Table";
import ButtonIconWithPermission from "../../ui/ButtonIconWithPermission";
import Modal from "../../ui/Modal";
import EditStockItem from "./EditStockItem";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteStockItem } from "./useDeleteStockitem";
import { IoDownloadOutline } from "react-icons/io5";
import { useLoadNewStock } from "./useLoadNewStock";

// Styled container similar to OrderDetails
const StyledStockItemDetailsComponent = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const HeadingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);
`;

const DataBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);
`;
const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div:first-child {
    font-size: 1.3rem;
    font-weight: 600;
  }
  & div:last-child {
    font-size: 1.4rem;
    padding: 0 1.5rem;
  }

  padding-top: 0.5rem;
  /* border-bottom: 1px solid var(--color-grey-100); */
  border-top: 1px solid var(--color-grey-100);
`;

const IconBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 0.5rem 2rem;
  gap: 1.2rem;
`;

const Spacer = styled.div`
  height: 1rem;
`;

function StockItemDetails({ stockItem }) {
  const {
    id,
    item_name,
    quantity_per_pt,
    buying_price_per_pt,
    buying_price_per_pc,
    mrp_per_pc,
    available_stock,
    base_selling_price_per_pt,
    base_selling_price_per_pc,
    new_stock,
  } = stockItem;

  const { isDeletingStockItem, deleteStockItem } = useDeleteStockItem();
  const { loadNewStock, isLoadingNewStock } = useLoadNewStock();
  const isWorking = isDeletingStockItem || isLoadingNewStock;

  return (
    <StyledStockItemDetailsComponent>
      <HeadingBox>
        <Heading as="h2">{item_name}</Heading>
      </HeadingBox>

      <DataBox>
        <Heading as="h3">Information</Heading>
        <Spacer />
        <DataItem>
          <div>Quantity(per pt)</div>
          <div> {quantity_per_pt}</div>
        </DataItem>
        <DataItem>
          <div>Available Stock</div>
          <div>
            {available_stock.pt} pt, {available_stock.pcs} pcs
          </div>
        </DataItem>
      </DataBox>

      <DataBox>
        <Heading as="h3">Prices</Heading>
        <Spacer />
        <DataItem>
          <div>Buying Price (per pt)</div>
          <div> {buying_price_per_pt}</div>
        </DataItem>
        <DataItem>
          <div>Selling Price (per pt)</div>
          <div> {base_selling_price_per_pt}</div>
        </DataItem>
        <div></div>
        <DataItem>
          <div>Buying Price (per pc)</div>
          <div>{buying_price_per_pc}</div>
        </DataItem>
        <DataItem>
          <div>Selling Price (per pc)</div>
          <div>{base_selling_price_per_pc}</div>
        </DataItem>
        <DataItem>
          <div>MRP (per pc)</div>
          <div>{mrp_per_pc}</div>
        </DataItem>
      </DataBox>

      {Array.isArray(new_stock) && new_stock.length > 0 && (
        <DataBox>
          <Heading as="h3">New Stock Details</Heading>
          <Spacer />
          <Table columns="1fr 1fr">
            <Table.Header>
              <div>Quantity(pt)</div>
              <div>Buying Price</div>
            </Table.Header>
            <Table.Body
              data={new_stock}
              render={(entry, index) => (
                <Table.Row key={index}>
                  <div>{entry.quantity}</div>
                  <div>Rs. {entry.buyingPrice}</div>
                </Table.Row>
              )}
            />
          </Table>
        </DataBox>
      )}

      <IconBox>
        <Modal.Open opens="edit-stock" disabled={isWorking}>
          <ButtonIconWithPermission checkAccess={true} size="lg">
            <FaEdit />
          </ButtonIconWithPermission>
        </Modal.Open>

        <ButtonIconWithPermission
          checkAccess={true}
          size="lg"
          disabled={isWorking}
          onClick={() => loadNewStock(id)}
        >
          <IoDownloadOutline />
        </ButtonIconWithPermission>

        <Modal.Open opens="delete-stock" disabled={isWorking}>
          <ButtonIconWithPermission checkAccess={true} size="lg">
            <HiTrash />
          </ButtonIconWithPermission>
        </Modal.Open>

        <Modal.Window opens="edit-stock">
          <EditStockItem stockItem={stockItem} />
        </Modal.Window>

        <Modal.Window opens="delete-stock">
          <ConfirmDelete
            resourceName="stock item"
            disabled={isDeletingStockItem}
            onConfirm={() => {
              deleteStockItem({ id });
            }}
          />
        </Modal.Window>
      </IconBox>
    </StyledStockItemDetailsComponent>
  );
}

export default StockItemDetails;
