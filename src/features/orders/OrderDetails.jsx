import styled from "styled-components";
import { add } from "date-fns";
import { MdCall } from "react-icons/md";
import { ImCancelCircle, ImLocation } from "react-icons/im";
import { HiPencil } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";

import Heading from "../../ui/Heading";
import Table from "../../ui/Table";
import ButtonIconWithPermission from "../../ui/ButtonIconWithPermission";
import ButtonIcon from "../../ui/ButtonIcon";
import Modal from "../../ui/Modal";
import CreateOrderForm from "./CreateOrderForm";

import ConfirmUpdate from "./ConfirmUpdate";
import { useCancelOrder } from "./useCancelOrder";
import { useUpdateOrder } from "./useUpdateOrder";
import ConfirmPayment from "./ConfirmPayment";
import { formatDateTime } from "../../utils/date";
import { formatCurrency } from "../../utils/helpers";

const StyledOrderDetailsComponent = styled.div`
  /* width: 75vw; */
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
  gap: 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);
`;

const PricingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 1rem 2rem;
  & div:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const PriceItem = styled.div`
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
  &:nth-child(3) {
    & div:last-child {
      border-top: 1px solid var(--color-grey-600);
    }
  }
  &:nth-child(6) {
    & div:last-child {
      border-top: 1px solid var(--color-grey-600);
    }
  }
`;

const DateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 1rem 2rem;
`;

const PaymentSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  font-size: 1.1rem;
  color: var(--color-grey-500);

  & strong {
    display: block;
    margin-top: 0.2rem;
    font-size: 1.4rem;
    color: var(--color-grey-700);
  }

  & div:last-child strong {
    color: ${(props) =>
      props.$balance > 0 ? "var(--color-red-700)" : "var(--color-green-700)"};
  }
`;

const ProgressTrack = styled.div`
  height: 0.8rem;
  border-radius: 100px;
  background-color: var(--color-grey-100);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 100px;
  background-color: var(--color-green-700);
`;

const HistoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;

  & small {
    display: block;
    font-size: 1.1rem;
    color: var(--color-grey-500);
  }

  & strong {
    font-size: 1.4rem;
  }

  &:not(:last-child) {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Muted = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

const IconBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 0.5rem 2rem;
`;

const Stacked2 = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  & div:first-child {
    font-size: 1.3rem;
  }
  & div:last-child {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const Stacked = styled.div`
  display: grid;
  grid-template-columns: 4fr 7fr;
  align-items: start;
  & div:first-child {
    font-size: 1.3rem;
    font-weight: 600;
  }
  & div:last-child {
    font-size: 1.4rem;
  }
  margin-bottom: 0.5rem;
`;

const Tag = styled.div`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

const BlueTag = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-lg);
  background-color: var(--color-blue-100);
  color: var(--color-blue-700);
`;

const GreenTag = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-lg);
  background-color: var(--color-green-100);
  color: var(--color-green-700);
`;

const YellowTag = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-lg);
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);
`;

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

function OrderDetails({ order }) {
  const {
    id,
    customer_id,
    order_date,
    delivery_date,
    payment_date,
    is_delivered,
    is_paid,
    bill_value,
    payments,
    outstanding_payment,
    customers: {
      store_name,
      owner_name,
      store_geoLink,
      store_address,
      owner_phone_no,
    },
    order_items: orderItems,
    total_buying_price_order_items: orderItemsTotalBP,
    total_selling_price_order_items: orderItemsTotalSP,
    total_buying_price_free_items: freeItemsTotalBP,
    total_discount,
    extra_costs,
    effective_total_buying_price,
    effective_total_selling_price,
    profit,
  } = order;
  const { cancelOrder, isCancellingOrder } = useCancelOrder();
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();
  const isWorking = isUpdatingOrder || isCancellingOrder;

  const tag = is_delivered ? (is_paid ? "green" : "red") : "blue";

  const action = is_delivered
    ? is_paid
      ? ""
      : "Make payment"
    : "Mark delivered";
  const confirmation = is_delivered
    ? is_paid
      ? ""
      : "the bill has been paid by the customer in full"
    : "the entire order is delivered to the customer";

  const isCancellable = !is_delivered;

  // amounts for the payment block (outstanding_payment is only set on delivery)
  const paidAmount = is_paid
    ? bill_value
    : is_delivered
      ? bill_value - (outstanding_payment ?? bill_value)
      : 0;
  const balance = Math.max(bill_value - paidAmount, 0);
  const paymentStatus = !is_delivered
    ? "Awaiting delivery"
    : is_paid
      ? "Paid in full"
      : paidAmount > 0
        ? "Partially paid"
        : "Unpaid";
  const paidPercent = bill_value
    ? Math.min((paidAmount / bill_value) * 100, 100)
    : 0;

  function markDelivered() {
    const modifiedOrder = {
      ...order,
      is_delivered: true,
      outstanding_payment: bill_value,
      delivery_date: fromToday(0, true),
    };
    delete modifiedOrder["customers"];
    updateOrder({ id, updated_order: modifiedOrder });
  }

  function makePayment({ amount }) {
    if (!amount) return null;
    if (amount > outstanding_payment) return null; // show a toast

    let modifiedOrder = { ...order };

    if (!modifiedOrder.payments) {
      modifiedOrder.payments = [];
    }

    const paymentDate = fromToday(0, true);
    modifiedOrder.payments.push({ amount, date: paymentDate });

    if (amount < outstanding_payment) {
      modifiedOrder.outstanding_payment = outstanding_payment - amount;
    } else if (amount === outstanding_payment) {
      modifiedOrder.is_paid = true;
      modifiedOrder.outstanding_payment = 0;
      modifiedOrder.payment_date = paymentDate;
    }

    delete modifiedOrder["customers"];
    updateOrder({ id, updated_order: modifiedOrder });
  }

  const freeItems = order.order_items
    .reduce((accumulator, orderItem) => {
      if (orderItem.free_items && orderItem.free_items.length > 0) {
        orderItem.free_items.forEach((freeItem) => {
          if (freeItem.free_item_quantity > 0) {
            // Only include items with quantity > 0
            const existingItem = accumulator.find(
              (item) => item.item_id === freeItem.free_item_id,
            );

            if (existingItem) {
              existingItem.item_quantity += freeItem.free_item_quantity;
              existingItem.buying_price += freeItem.free_value_buying_price;
              existingItem.selling_price += freeItem.free_value_mrp_price;
            } else {
              accumulator.push({
                item_id: freeItem.free_item_id,
                item_name: freeItem.free_item_name,
                buying_price: freeItem.free_value_buying_price,
                selling_price: freeItem.free_value_mrp_price,
                item_quantity: freeItem.free_item_quantity,
              });
            }
          }
        });
      }
      return accumulator;
    }, [])
    .filter((item) => item.item_quantity > 0);

  const noFreeItems = freeItems.length === 0;

  const filteredOrderItems = orderItems.filter(
    (item) => item.item_quantity > 0,
  );

  const handleLocate = () => {
    if (!store_geoLink && !store_address && !store_name) return;
    window.open(
      store_geoLink
        ? store_geoLink
        : store_address
          ? `https://www.google.com/maps/search/?api=1&query=${store_address}`
          : `https://www.google.com/maps/search/?api=1&query=${store_name}`,
    );
  };

  const handleCall = () => {
    window.open(
      `https://web.whatsapp.com/send?phone=${owner_phone_no}&text=Hi%20${owner_name}%2C%20I%20am%20interested%20in%20your%20store%20at%20${store_address}%20and%20would%20like%20to%20know%20more%20about%20your%20store.`,
    );
  };

  return (
    <StyledOrderDetailsComponent>
      <HeadingBox>
        <Heading as="h2">{store_name}</Heading>
        <div>{owner_name}</div>
      </HeadingBox>

      <DateBox>
        <Stacked>
          <div>Order date</div>
          <BlueTag>{formatDateTime(order_date)}</BlueTag>
        </Stacked>
        <Stacked>
          <div>Delivery date</div>
          {delivery_date ? (
            <YellowTag>{formatDateTime(delivery_date)}</YellowTag>
          ) : (
            <Muted>Not delivered yet</Muted>
          )}
        </Stacked>
        {payment_date && (
          <Stacked>
            <div>Payment date</div>
            <GreenTag>{formatDateTime(payment_date)}</GreenTag>
          </Stacked>
        )}
      </DateBox>

      <DataBox>
        <Tag type={tag}>{paymentStatus}</Tag>
        <PaymentSummary $balance={balance}>
          <div>
            Bill value
            <strong>{formatCurrency(bill_value)}</strong>
          </div>
          <div>
            Paid
            <strong>{formatCurrency(paidAmount)}</strong>
          </div>
          <div>
            Balance
            <strong>{formatCurrency(balance)}</strong>
          </div>
        </PaymentSummary>
        <ProgressTrack>
          <ProgressFill style={{ width: `${paidPercent}%` }} />
        </ProgressTrack>
        {payments?.length > 0 ? (
          <div>
            {payments.map((payment, index) => (
              <HistoryRow key={index}>
                <div>
                  Payment {index + 1}
                  <small>{formatDateTime(payment.date)}</small>
                </div>
                <strong>{formatCurrency(payment.amount)}</strong>
              </HistoryRow>
            ))}
          </div>
        ) : is_paid && payment_date ? (
          <HistoryRow>
            <div>
              Paid in full
              <small>{formatDateTime(payment_date)}</small>
            </div>
            <strong>{formatCurrency(bill_value)}</strong>
          </HistoryRow>
        ) : (
          <Muted>No payments recorded yet</Muted>
        )}
      </DataBox>

      <DataBox>
        <Heading as="h3">Order Items</Heading>
        <Table columns="1fr 5fr 2fr 2fr">
          <Table.Header>
            <div>qt.</div>
            <div>name</div>
            <div>bp</div>
            <div>sp</div>
          </Table.Header>
          <Table.Body
            data={filteredOrderItems}
            render={(item) => (
              <Table.Row role="row">
                <div>{item.item_quantity}</div>
                <div>{item.item_name}</div>
                <div>{item.buying_price}</div>
                <div>{item.selling_price}</div>
              </Table.Row>
            )}
          />
        </Table>
        <div>
          <Stacked2>
            <div>Buying Price : </div>
            <div>Rs. {orderItemsTotalBP}</div>
          </Stacked2>
          <Stacked2>
            <div>Selling Price : </div>
            <div>Rs. {orderItemsTotalSP}</div>
          </Stacked2>
        </div>
      </DataBox>

      {!noFreeItems && (
        <DataBox>
          <Heading as="h3">Free Items</Heading>
          <Table columns="1fr 5fr 2fr 2fr">
            <Table.Header>
              <div>qt.</div>
              <div>name</div>
              <div>bp</div>
              <div>sp</div>
            </Table.Header>
            <Table.Body
              data={freeItems}
              render={(item) => (
                <Table.Row role="row">
                  <div>{item.item_quantity}</div>
                  <div>{item.item_name}</div>
                  <div>{item.buying_price}</div>
                  <div>{item.selling_price}</div>
                </Table.Row>
              )}
            />
          </Table>
          <div>
            <Stacked2>
              <div>Buying Price : </div>
              <div>Rs. {freeItemsTotalBP}</div>
            </Stacked2>
          </div>
        </DataBox>
      )}

      <PricingBox>
        <PriceItem>
          <div>Selling Price </div>
          <div>{effective_total_selling_price}</div>
        </PriceItem>

        <PriceItem>
          <div>Discounts</div>
          <div>- {total_discount}</div>
        </PriceItem>

        <PriceItem>
          <div>Bill Value</div>
          <div>{bill_value}</div>
        </PriceItem>

        <PriceItem>
          <div>Total Buying Price</div>
          <div>- {effective_total_buying_price}</div>
        </PriceItem>

        <PriceItem>
          <div>Extra Costs</div>
          <div>- {extra_costs}</div>
        </PriceItem>

        <PriceItem>
          <div>Profit</div>
          <div>{profit}</div>
        </PriceItem>
      </PricingBox>

      <IconBox>
        <ButtonIcon size="lg" onClick={handleCall}>
          <MdCall />
        </ButtonIcon>

        <ButtonIcon size="lg" onClick={handleLocate}>
          <ImLocation />
        </ButtonIcon>

        {isCancellable && (
          <Modal.Open opens="cancel">
            <ButtonIconWithPermission level={1}>
              <ImCancelCircle />
            </ButtonIconWithPermission>
          </Modal.Open>
        )}
        {action === "Mark delivered" && (
          <Modal.Open opens="markDelivered">
            <ButtonIconWithPermission level={1}>
              <HiPencil />
            </ButtonIconWithPermission>
          </Modal.Open>
        )}
        {action === "Make payment" && (
          <Modal.Open opens="makePayment">
            <ButtonIconWithPermission level={1}>
              <HiPencil />
            </ButtonIconWithPermission>
          </Modal.Open>
        )}

        <Modal.Open opens="order">
          <ButtonIconWithPermission level={1} size="lg">
            <FaCartPlus />
          </ButtonIconWithPermission>
        </Modal.Open>

        <Modal.Window opens="order">
          <CreateOrderForm store_id={customer_id} />
        </Modal.Window>

        <Modal.Window opens="cancel">
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

        <Modal.Window name="markDelivered">
          <ConfirmUpdate
            task={"Update"}
            orderId={id}
            confirmation={confirmation}
            disabled={isWorking}
            onConfirm={markDelivered}
          />
        </Modal.Window>
        <Modal.Window name="makePayment">
          <ConfirmPayment
            orderId={id}
            outstanding_payment={outstanding_payment}
            disabled={isWorking}
            onConfirm={makePayment}
          />
        </Modal.Window>
      </IconBox>
    </StyledOrderDetailsComponent>
  );
}

export default OrderDetails;
