import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { BiDetail } from "react-icons/bi";
import SchemeDetails from "./SchemeDetails";
import EditScheme from "./EditScheme";
import useDeleteScheme from "./useDeleteScheme";

const Stacked1 = styled.div`
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

const Stacked3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 0.2rem;
`;

function SchemeRow({ scheme, scheme_item_id, scheme_item_name }) {
  const {
    scheme_level,
    free_items,
    discount_per_pt,
    buying_price_per_pt,
    effective_buying_price_customer_per_pt,
    effective_selling_price_enterprise_per_pt,
  } = scheme;

  const schemeItemId = Number(scheme_item_id);

  const { isDeleting, handleDelete } = useDeleteScheme({
    schemeItemId,
    scheme_level,
  });

  const hasFreeItems =
    free_items[0].free_item_quantity > 0 ||
    free_items[1].free_item_quantity > 0;

  return (
    <Table.Row role="row">
      <Modal>
        <Stacked1>{scheme_level}</Stacked1>

        <Modal.Open opens="details">
          <Stacked3>
            {free_items[0].free_item_quantity ? (
              <Stacked1>
                <span>{free_items[0].free_item_quantity} x </span>
                <span>{free_items[0].free_item_name}</span>
              </Stacked1>
            ) : null}
            {free_items[1].free_item_quantity ? (
              <Stacked1>
                <span>{free_items[1].free_item_quantity} x </span>
                <span>{free_items[1].free_item_name}</span>
              </Stacked1>
            ) : null}
            {discount_per_pt ? (
              <Stacked1>
                <span>D- Rs.</span>
                <span>{discount_per_pt}</span>
              </Stacked1>
            ) : null}
          </Stacked3>
        </Modal.Open>

        <Stacked3>
          <Stacked1>
            <span>BP- Rs.</span>
            <span>{buying_price_per_pt}</span>
          </Stacked1>
          {hasFreeItems ? (
            <>
              <Stacked1>
                <span>Ct.- Rs.</span>
                <span>{effective_buying_price_customer_per_pt}</span>
              </Stacked1>
              <Stacked1>
                <span>Et.- Rs.</span>
                <span>{effective_selling_price_enterprise_per_pt}</span>
              </Stacked1>
            </>
          ) : (
            <Stacked1>
              <span>SP- Rs.</span>
              <span>{effective_selling_price_enterprise_per_pt}</span>
            </Stacked1>
          )}
        </Stacked3>

        {/* <Modal> */}
        <Menus.Menu>
          <Menus.Toggle id={scheme_level} />
          <Menus.List id={scheme_level}>
            <Modal.Open opens="details">
              <Menus.Button icon={<BiDetail />}>Details</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />} checkAccess={true}>
                Edit
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} checkAccess={true}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="details">
            <SchemeDetails
              scheme={scheme}
              scheme_item_id={scheme_item_id}
              scheme_item_name={scheme_item_name}
            />
          </Modal.Window>
          <Modal.Window name="edit">
            <EditScheme scheme={scheme} scheme_item_id={scheme_item_id} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="scheme"
              disabled={isDeleting}
              onConfirm={() => handleDelete()}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default SchemeRow;
