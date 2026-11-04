import { useEffect, useState } from "react";
import { add, format } from "date-fns";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import CreateOrderItem from "./CreateOrderItem";

import { useCustomers } from "../customers/useCustomers";
import { useStock } from "../stock/useStock";
import { useAddOrder } from "./useAddOrder";
import Input from "../../ui/Input";
import toast from "react-hot-toast";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  // if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 1rem 1rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h5`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--color-grey-500);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;

  & > label {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-grey-500);
  }

  & > small {
    font-size: 1.1rem;
    color: var(--color-grey-500);
  }

  & input,
  & select {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .dark-mode & input[type="date"],
  .dark-mode & input[type="time"] {
    color-scheme: dark;
  }
`;

const StoreList = styled.ul`
  max-height: 20rem;
  overflow-y: auto;
  list-style: none;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);

  & li {
    padding: 0.9rem 1.2rem;
    font-size: 1.3rem;
    cursor: pointer;
  }

  & li:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  & li[data-selected="true"] {
    font-weight: 600;
    color: var(--color-brand-600);
  }
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 1.2rem 0.6rem;
  padding: 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  font-size: 1.1rem;
  color: var(--color-grey-500);

  & strong {
    display: block;
    font-size: 1.4rem;
    color: var(--color-grey-700);
  }

  & div:last-child strong {
    color: var(--color-brand-600);
  }
`;

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

// order_date is stored as a UTC ISO string; the form edits it in local time
function toOrderDate(date, time) {
  return new Date(`${date}T${time}`).toISOString().slice(0, -1);
}
const order_template = {
  customer_id: 1,
  order_date: fromToday(0),
  // delivery_date: fromToday(0),
  // payment_date: fromToday(0),
  is_delivered: false,
  is_paid: false,
  bill_value: 0,
  order_items: [
    {
      item_id: 0,
      item_name: "extra free",
      buying_price: 0,
      item_quantity: 0,
      selling_price: 0,
      free_items: [
        {
          free_item_id: "1",
          free_item_name: "500ml",
          free_value_buying_price: 0,
          free_item_quantity: 0,
          free_value_mrp_price: 0,
        },
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_value_buying_price: 0,
          free_item_quantity: 0,
          free_value_mrp_price: 0,
        },
      ],
      discount: 0,
    },
  ],
  extra_costs: 0,
  effective_total_buying_price: 0,
  effective_total_selling_price: 0,
  profit: 0,
  total_buying_price_order_items: 0,
  total_selling_price_order_items: 0,
  total_buying_price_free_items: 0,
  total_discount: 0,
};

function CreateOrderForm({ onCloseModal, store_id = "1" }) {
  const [selectedStoreId, setSelectedStoreId] = useState(store_id);
  const [newOrder, setNewOrder] = useState({
    ...order_template,
    customer_id: Number(store_id),
  });
  const [orderDate, setOrderDate] = useState(fromToday(0));
  const [storeSearch, setStoreSearch] = useState("");
  const [isStoreListOpen, setIsStoreListOpen] = useState(false);
  const [extraFree500ml, setExtraFree500ml] = useState(0);
  const [extraFree1ltr, setExtraFree1ltr] = useState(0);
  const [extraDiscount, setExtraDiscount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [extraCosts, setExtraCosts] = useState(0);

  const [availablePcs500ml, setAvailablePcs500ml] = useState(0);
  const [availablePcs1ltr, setAvailablePcs1ltr] = useState(0);

  const { handleSubmit, reset } = useForm();

  const { isLoadingCustomers, customers } = useCustomers();
  const { isLoadingStock, stock } = useStock();
  const { addOrder, isAddingOrder } = useAddOrder();

  // useEffect to calculate and update available pcs for 500ml and 1ltr whenever newOrder or stock changes
  useEffect(() => {
    const calculateAvailablePcs = (itemId) => {
      const itemStock = stock?.find((s) => s.id === itemId);
      if (!itemStock) return 0;

      // Calculate the "pt" ordered (for paid items) for the given item
      const ptUsed = newOrder.order_items
        .filter((orderItem) => orderItem.item_id === itemId)
        .reduce((sum, orderItem) => sum + orderItem.item_quantity, 0);

      // Calculate the free pieces used for the given item from all orders.
      // Free items are stored in the "free_items" array (usually under an extra order item, e.g., item_id 0).
      const freeUsed = newOrder.order_items.reduce((sum, orderItem) => {
        if (orderItem.free_items && orderItem.free_items.length > 0) {
          const freeForItem = orderItem.free_items
            .filter((freeItem) => Number(freeItem.free_item_id) === itemId)
            .reduce((acc, freeItem) => acc + freeItem.free_item_quantity, 0);
          return sum + freeForItem;
        }
        return sum;
      }, 0);

      // Calculate remaining "pt" available in stock (ensuring non-negative)
      const availablePt = Math.max(itemStock.available_stock.pt - ptUsed, 0);

      // Total available pieces (pcs) is calculated by converting the remaining "pt" into pcs and adding any extra pcs available.
      const totalAvailablePcs =
        availablePt * itemStock.quantity_per_pt + itemStock.available_stock.pcs;

      // Finally, deduct the free items already used.
      return Math.max(totalAvailablePcs - freeUsed, 0);
    };

    const avail500ml = calculateAvailablePcs(1);
    const avail1ltr = calculateAvailablePcs(2);
    setAvailablePcs500ml(avail500ml);
    setAvailablePcs1ltr(avail1ltr);
  }, [newOrder, stock]);

  const isWorking = isLoadingCustomers || isLoadingStock || isAddingOrder;
  if (isWorking) return <Spinner />;

  const handleStoreChange = (event) => {
    setSelectedStoreId(event.target.value);
    setNewOrder({ ...newOrder, customer_id: Number(event.target.value) });
  };

  const localOrderDate = new Date(`${orderDate}Z`);
  const orderDay = format(localOrderDate, "yyyy-MM-dd");
  const orderTime = format(localOrderDate, "HH:mm");

  const handleOrderDateChange = (day, time) => {
    if (!day || !time) return;
    const value = toOrderDate(day, time);
    setOrderDate(value);
    setNewOrder({ ...newOrder, order_date: value });
  };

  // live totals for the summary bar (display only)
  const orderedItems = newOrder.order_items.filter((i) => i.item_id !== 0);
  const totalPt = orderedItems.reduce((t, i) => t + i.item_quantity, 0);
  const itemsValue = orderedItems.reduce(
    (t, i) => t + i.selling_price * i.item_quantity,
    0,
  );
  const itemDiscount = orderedItems.reduce((t, i) => t + (i.discount || 0), 0);
  const freePcs =
    orderedItems.reduce(
      (t, i) =>
        t +
        (i.free_items || []).reduce(
          (f, free) => f + Number(free.free_item_quantity || 0),
          0,
        ),
      0,
    ) +
    extraFree500ml +
    extraFree1ltr;
  const billValue = itemsValue - itemDiscount - extraDiscount;

  function handleExtra500mlChange(e) {
    const newQ = Number(e.target.value);
    if (newQ > availablePcs500ml) {
      toast.error(`Only ${availablePcs500ml} pcs. available in stock.`);
      return;
    }
    setExtraFree500ml(newQ);
  }
  function handleExtra1ltrChange(e) {
    const newQ = Number(e.target.value);
    if (newQ > availablePcs1ltr) {
      toast.error(`Only ${availablePcs1ltr} pcs. available in stock.`);
      return;
    }
    setExtraFree1ltr(newQ);
  }

  function updateExtraFreeItems(order) {
    const free500mlStock = stock.find((s) => s.id === 1);
    const free1ltrStock = stock.find((s) => s.id === 2);

    const updatedOrderItems = order.order_items.map((orderItem) => {
      // Identify the extra free order item (with item_id 0)
      if (orderItem.item_id === 0) {
        const updatedFreeItems = orderItem.free_items.map((freeItem) => {
          // Update free 500ml item details
          if (freeItem.free_item_id === "1") {
            return {
              ...freeItem,
              free_item_quantity: extraFree500ml,
              free_value_buying_price: free500mlStock
                ? free500mlStock.buying_price_per_pc * extraFree500ml
                : 0,
              free_value_mrp_price: free500mlStock
                ? free500mlStock.mrp_per_pc * extraFree500ml
                : 0,
            };
          }
          // Update free 1ltr item details
          else if (freeItem.free_item_id === "2") {
            return {
              ...freeItem,
              free_item_quantity: extraFree1ltr,
              free_value_buying_price: free1ltrStock
                ? free1ltrStock.buying_price_per_pc * extraFree1ltr
                : 0,
              free_value_mrp_price: free1ltrStock
                ? free1ltrStock.mrp_per_pc * extraFree1ltr
                : 0,
            };
          }
          return freeItem;
        });

        return {
          ...orderItem,
          free_items: updatedFreeItems,
          discount: extraDiscount,
        };
      }
      return orderItem;
    });

    const modifiedOrder = { ...order, order_items: updatedOrderItems };
    return modifiedOrder;
  }

  function applyExtraCosts(order) {
    return {
      ...order,
      extra_costs: Number(extraCosts),
    };
  }
  function calculateOrderValues(order) {
    const totalDiscount = order.order_items.reduce((total, item) => {
      return total + item.discount;
    }, 0);

    const totalSellingPriceOrderItems = order.order_items.reduce(
      (total, item) => {
        return total + item.selling_price * item.item_quantity;
      },
      0,
    );

    const totalBuyingPriceOrderItems = order.order_items.reduce(
      (total, item) => {
        return total + item.buying_price * item.item_quantity;
      },
      0,
    );

    const totalBuyingPriceFreeItems = order.order_items.reduce(
      (total, item) => {
        return (
          total +
          item.free_items.reduce((freeTotal, freeItem) => {
            return freeTotal + freeItem.free_value_buying_price;
          }, 0)
        );
      },
      0,
    );

    let modifiedOrder = order;
    modifiedOrder.total_buying_price_free_items = totalBuyingPriceFreeItems;
    modifiedOrder.total_buying_price_order_items = totalBuyingPriceOrderItems;
    modifiedOrder.total_selling_price_order_items = totalSellingPriceOrderItems;
    modifiedOrder.effective_total_buying_price =
      totalBuyingPriceOrderItems + totalBuyingPriceFreeItems;
    modifiedOrder.effective_total_selling_price = totalSellingPriceOrderItems;
    modifiedOrder.total_discount = totalDiscount;
    modifiedOrder.bill_value = Number(
      (totalSellingPriceOrderItems - totalDiscount).toFixed(2),
    );
    modifiedOrder.profit = Number(
      (
        totalSellingPriceOrderItems -
        totalBuyingPriceOrderItems -
        totalBuyingPriceFreeItems -
        totalDiscount -
        extraCosts
      ).toFixed(2),
    );
    return modifiedOrder;
  }

  async function onSubmit() {
    // console.log(newOrder);
    const modifiedOrderAUEFI = updateExtraFreeItems(newOrder);
    // console.log(modifiedOrderAUEFI);
    const modifiedOrderAAEC = applyExtraCosts(modifiedOrderAUEFI);
    // console.log(modifiedOrderAAEC);
    const modifiedOrderACOV = calculateOrderValues(modifiedOrderAAEC);
    // console.log(modifiedOrderACOV);
    addOrder({ new_order: modifiedOrderACOV });
    handleCloseForm();
  }

  function onError(errors) {
    console.error(errors);
  }

  function handleCloseForm() {
    reset();
    onCloseModal();
  }

  // create a useeffect to calculate and update available 500ml and 1ltr pcs when newOrder achnges

  const selectedStoreName =
    customers.find((c) => String(c.id) === String(selectedStoreId))
      ?.store_name || "";
  const matchingStores = customers.filter((customer) =>
    customer.store_name.toLowerCase().includes(storeSearch.toLowerCase()),
  );

  function selectStore(id) {
    handleStoreChange({ target: { value: id } });
    setIsStoreListOpen(false);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Body>
        <Heading as="h4">Create new order</Heading>

        <Section>
          <SectionTitle>Customer</SectionTitle>
          <Field>
            <label htmlFor="storeSearch">Store name</label>
            <Input
              id="storeSearch"
              type="text"
              autoComplete="off"
              placeholder="Search store..."
              value={isStoreListOpen ? storeSearch : selectedStoreName}
              onFocus={() => {
                setStoreSearch("");
                setIsStoreListOpen(true);
              }}
              onBlur={() => setIsStoreListOpen(false)}
              onChange={(e) => setStoreSearch(e.target.value)}
            />
            {isStoreListOpen && (
              <StoreList>
                {matchingStores.length === 0 && <li>No store found</li>}
                {matchingStores.map((customer) => (
                  <li
                    key={customer.id}
                    // mousedown (not click) so the input's blur doesn't close the list first
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectStore(customer.id);
                    }}
                    data-selected={
                      String(customer.id) === String(selectedStoreId)
                    }
                  >
                    {customer.store_name}
                  </li>
                ))}
              </StoreList>
            )}
          </Field>
          <Grid>
            <Field>
              <label htmlFor="orderDay">Order date</label>
              <Input
                id="orderDay"
                type="date"
                value={orderDay}
                onChange={(e) =>
                  handleOrderDateChange(e.target.value, orderTime)
                }
              />
            </Field>
            <Field>
              <label htmlFor="orderTime">Order time</label>
              <Input
                id="orderTime"
                type="time"
                value={orderTime}
                onChange={(e) =>
                  handleOrderDateChange(orderDay, e.target.value)
                }
              />
            </Field>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Items</SectionTitle>
          {stock.map((item) => (
            <CreateOrderItem
              key={item.id}
              item={item}
              newOrder={newOrder}
              setNewOrder={setNewOrder}
            />
          ))}
        </Section>

        <Section>
          <SectionTitle>Extras</SectionTitle>
          <Grid>
            <Field>
              <label htmlFor="extraFree500">Extra free 500ml (pcs)</label>
              <Input
                id="extraFree500"
                type="number"
                value={extraFree500ml}
                onChange={(e) => handleExtra500mlChange(e)}
                disabled={availablePcs500ml <= 0}
              />
              <small>{availablePcs500ml} pcs available</small>
            </Field>
            <Field>
              <label htmlFor="extraFree1ltr">Extra free 1ltr (pcs)</label>
              <Input
                id="extraFree1ltr"
                type="number"
                value={extraFree1ltr}
                onChange={(e) => handleExtra1ltrChange(e)}
                disabled={availablePcs1ltr <= 0}
              />
              <small>{availablePcs1ltr} pcs available</small>
            </Field>
          </Grid>
          <Field>
            <label htmlFor="extraDiscount">Extra discount (Rs)</label>
            <Input
              id="extraDiscount"
              type="number"
              value={extraDiscount}
              onChange={(e) => setExtraDiscount(Number(e.target.value))}
            />
          </Field>
        </Section>
      </Body>

      <Footer>
        <Summary>
          <div>
            Items
            <strong>{totalPt} pt</strong>
          </div>
          <div>
            Free / discount
            <strong>
              {freePcs} pcs · Rs.{(itemDiscount + extraDiscount).toFixed(0)}
            </strong>
          </div>
          <div>
            Bill value
            <strong>Rs.{billValue.toFixed(2)}</strong>
          </div>
        </Summary>
        <StackedButtons>
          <Button variation="secondary" type="reset" onClick={handleCloseForm}>
            Cancel
          </Button>
          <Button>Add</Button>
        </StackedButtons>
      </Footer>
    </Form>
  );
}

export default CreateOrderForm;

// to apply available pcs fro extra items also
