import { useState } from "react";
import { add } from "date-fns";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import styled from "styled-components";
import CreateOrderItem from "./CreateOrderItem";

import { useCustomers } from "../customers/useCustomers";
import { useStock } from "../stock/useStock";
import { useSchemesNear } from "../schemes/useSchemesNear";
import { useSchemesFar } from "../schemes/useSchemesFar";
import { useAddOrder } from "./useAddOrder";

//                               2024-05-23T07:44:27+00:00
//  required date output      -- 2024-04-25T12:00:00+00:00
//  current date output format --2024-05-23T00:00:00.000

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}
// function fromToday(numDays, withTime = true) {
//   const date = add(new Date(), { days: numDays });
//   if (!withTime) date.setUTCHours(0, 0, 0, 0);
//   const isoString = date.toISOString();
//   const formattedDate = withTime
//     ? isoString.slice(0, 19) + "+00:00"
//     : isoString.slice(0, 10) + "T12:00:00+00:00";
//   return formattedDate;
// }
const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
const order_template = {
  customer_id: 1,
  order_date: fromToday(0),
  // delivery_date: fromToday(0),
  // payment_date: fromToday(0),
  is_delivered: false,
  is_paid: false,
  bill_value: 0,
  order_items: [
    // {
    //   item_id: 1,
    //   item_name: "",
    //   buying_price: 0,
    //   item_quantity: 0,
    //   selling_price: 0,
    //   free_items: [
    //     {
    //       item_id: 1,
    //       item_name: "Free Item 1",
    //       buying_price: 0,
    //       item_quantity: 0,
    //       selling_price: 0,
    //     },
    //   ],
    //   discount: 0,
    // },
    // {
    //   item_id: 2,
    //   item_name: "",
    //   buying_price: 0,
    //   item_quantity: 0,
    //   selling_price: 0,
    // },
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
  console.log("hi");
  const [selectedStoreId, setSelectedStoreId] = useState(store_id);
  const [nearOrFar, setNearOrFar] = useState("near");
  const [newOrder, setNewOrder] = useState({
    ...order_template,
    customer_id: Number(store_id),
  });
  const [extraCosts, setExtraCosts] = useState(0);

  const { handleSubmit, reset } = useForm();

  const { isLoadingCustomers, customers } = useCustomers();
  const { isLoadingStock, stock } = useStock();
  const { addOrder, isAddingOrder } = useAddOrder();
  const isWorking = isLoadingCustomers || isLoadingStock || isAddingOrder;
  if (isWorking) return <Spinner />;

  const handleStoreChange = (event) => {
    setSelectedStoreId(event.target.value);
    setNewOrder({ ...newOrder, customer_id: Number(event.target.value) });
    setNearOrFar(
      customers.find((customer) => customer.id === Number(selectedStoreId))
        .routes.near_or_far
    );
    // log the selected customer
    // console.log(
    //   "Selected customer:",
    //   customers.find((customer) => customer.id === Number(selectedStoreId))
    // );
  };

  function applyExtraCosts() {}
  function calculateOrderValues() {
    const totalDiscount = newOrder.order_items.reduce((total, item) => {
      return total + item.discount;
    }, 0);

    const totalSellingPriceOrderItems = newOrder.order_items.reduce(
      (total, item) => {
        return total + item.selling_price * item.item_quantity;
      },
      0
    );

    const totalBuyingPriceOrderItems = newOrder.order_items.reduce(
      (total, item) => {
        return total + item.buying_price * item.item_quantity;
      },
      0
    );

    const totalBuyingPriceFreeItems = newOrder.order_items.reduce(
      (total, item) => {
        return (
          total +
          item.free_items.reduce((freeTotal, freeItem) => {
            return freeTotal + freeItem.free_value_buying_price;
          }, 0)
        );
      },
      0
    );

    let modifiedOrder = newOrder;
    modifiedOrder.total_buying_price_free_items = totalBuyingPriceFreeItems;
    modifiedOrder.total_buying_price_order_items = totalBuyingPriceOrderItems;
    modifiedOrder.total_selling_price_order_items = totalSellingPriceOrderItems;
    modifiedOrder.effective_total_buying_price =
      totalBuyingPriceOrderItems + totalBuyingPriceFreeItems;
    modifiedOrder.effective_total_selling_price = totalSellingPriceOrderItems;
    modifiedOrder.total_discount = totalDiscount;
    modifiedOrder.bill_value = Number(
      (totalSellingPriceOrderItems - totalDiscount).toFixed(2)
    );
    modifiedOrder.profit = Number(
      (
        totalSellingPriceOrderItems -
        totalBuyingPriceOrderItems -
        totalBuyingPriceFreeItems -
        totalDiscount -
        extraCosts
      ).toFixed(2)
    );
    console.log("order after calculating order item values", modifiedOrder);
    setNewOrder(modifiedOrder);
  }

  function onSubmit() {
    applyExtraCosts();
    calculateOrderValues();
    console.log(newOrder);
    addOrder({ new_order: newOrder });
    handleCloseForm();
  }

  function onError(errors) {
    console.error(errors);
  }

  function handleCloseForm() {
    reset();
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Heading as="h4">Create new order</Heading>
      </FormRow>
      <FormRow label="Store name">
        <Select
          options={customers.map((customer) => ({
            value: customer.id,
            label: customer.store_name,
          }))}
          value={selectedStoreId}
          onChange={handleStoreChange}
          type="white"
        />
      </FormRow>

      {stock.map((item) => (
        <CreateOrderItem
          key={item.id}
          item={item}
          nearOrFar={nearOrFar}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
        />
      ))}

      <FormRow>
        {/* type is an HTML attribute! */}
        <StackedButtons>
          <Button variation="secondary" type="reset" onClick={handleCloseForm}>
            Cancel
          </Button>
          <Button>Add</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default CreateOrderForm;
