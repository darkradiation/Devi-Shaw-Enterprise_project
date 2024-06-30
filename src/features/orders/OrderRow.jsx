import styled from "styled-components";
import { add, format } from "date-fns";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { BiDetail } from "react-icons/bi";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import OrderDetails from "./OrderDetails";
import ConfirmUpdate from "./ConfirmUpdate";

import { useDeleteOrder } from "./useDeleteOrder";
import { useUpdateOrder } from "./useUpdateOrder";
import { ImCancelCircle } from "react-icons/im";
import { useCancelOrder } from "./useCancelOrder";

const Tag = styled.div`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;
const Stacked1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 400;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const Stacked2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 0.2rem;
  /* & div:first-child {
    padding-left: 1rem;
  } */
  & div:last-child {
    font-size: 1.15rem;
  }
`;

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

function OrderRow({ order }) {
  const {
    id,
    order_date,
    is_delivered,
    is_paid,
    bill_value,
    // customers: { store_name },
  } = order;
  // bug -- as soon i update the order the customers attribute is removed and the component crashes. to temporarily fix it i a used conditional chaining below . but now a new bug appears that is after changing the status it dose not updates in the page unless i refresh the page
  const store_name = order.customers?.store_name;

  const { isDeletingOrder, deleteOrder } = useDeleteOrder();
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();
  const { cancelOrder, isCancellingOrder } = useCancelOrder();
  const isWorking = isDeletingOrder || isUpdatingOrder || isCancellingOrder;

  if (isWorking) return;

  function markDelivered() {
    const modifiedOrder = {
      ...order,
      is_delivered: true,
      delivery_date: fromToday(0),
    };
    delete modifiedOrder["customers"];
    updateOrder({ id, updated_order: modifiedOrder });
  }

  function markPaid() {
    const modifiedOrder = {
      ...order,
      is_paid: true,
      payment_date: fromToday(0),
    };
    delete modifiedOrder["customers"];
    updateOrder({ id, updated_order: modifiedOrder });
  }

  const status = is_delivered ? (is_paid ? "paid" : "due") : "pending";
  const tag = is_delivered ? (is_paid ? "green" : "red") : "blue";

  const action = is_delivered ? (is_paid ? "" : "Mark paid") : "Mark delivered";
  const confirmation = is_delivered
    ? is_paid
      ? ""
      : "the bill has been paid by the customer in full"
    : "the entire order is delivered to the customer";

  const isCancellable = !is_delivered;

  return (
    <Table.Row role="row">
      <Modal>
        <div>{id}</div>
        <Modal.Open opens="details">
          <Stacked1>
            <div>{store_name}</div>
            <span>{format(order_date, "MMM dd yyyy")}</span>
          </Stacked1>
        </Modal.Open>

        <Stacked2>
          <div>Rs. {bill_value}</div>
          <Tag type={tag}>{status}</Tag>
        </Stacked2>

        {/* <Modal> */}
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="details">
              <Menus.Button icon={<BiDetail />}>Details</Menus.Button>
            </Modal.Open>
            {isCancellable && (
              <Modal.Open opens="cancel">
                <Menus.Button icon={<ImCancelCircle />}>Cancel</Menus.Button>
              </Modal.Open>
            )}
            {action && (
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>{action}</Menus.Button>
              </Modal.Open>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="details">
            <OrderDetails order={order} />
          </Modal.Window>
          <Modal.Window name="edit">
            <ConfirmUpdate
              task={"Update"}
              orderId={id}
              confirmation={confirmation}
              disabled={isWorking}
              onConfirm={() => {
                if (action === "Mark delivered") {
                  markDelivered();
                } else {
                  markPaid();
                }
              }}
            />
          </Modal.Window>
          <Modal.Window name="cancel">
            <ConfirmUpdate
              task={"Cancel"}
              orderId={id}
              confirmation={"you want to cancel the order !!"}
              disabled={isWorking}
              onConfirm={() => {
                cancelOrder({ order });
              }}
            />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="order"
              disabled={isWorking}
              onConfirm={() => {
                deleteOrder({ id });
              }}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default OrderRow;
