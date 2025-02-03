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
import { useAddOrder } from "./useAddOrder";
import Input from "../../ui/Input";

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
  const [extraFree500ml, setExtraFree500ml] = useState(0);
  const [extraFree1ltr, setExtraFree1ltr] = useState(0);
  const [extraDiscount, setExtraDiscount] = useState(0);
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
  };

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
      0
    );

    const totalBuyingPriceOrderItems = order.order_items.reduce(
      (total, item) => {
        return total + item.buying_price * item.item_quantity;
      },
      0
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
      0
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
    return modifiedOrder;
  }

  async function onSubmit() {
    console.log(newOrder);
    const modifiedOrderAUEFI = updateExtraFreeItems(newOrder);
    console.log(modifiedOrderAUEFI);
    const modifiedOrderAAEC = applyExtraCosts(modifiedOrderAUEFI);
    console.log(modifiedOrderAAEC);
    const modifiedOrderACOV = calculateOrderValues(modifiedOrderAAEC);
    console.log(modifiedOrderACOV);
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
          newOrder={newOrder}
          setNewOrder={setNewOrder}
        />
      ))}

      <FormRow label="extra free 500ml">
        <Input
          type="number"
          value={extraFree500ml}
          onChange={(e) => setExtraFree500ml(Number(e.target.value))}
        />
      </FormRow>
      <FormRow label="extra free 1ltr">
        <Input
          type="number"
          value={extraFree1ltr}
          onChange={(e) => setExtraFree1ltr(Number(e.target.value))}
        />
      </FormRow>
      <FormRow label="extra discount">
        <Input
          type="number"
          value={extraDiscount}
          onChange={(e) => setExtraDiscount(Number(e.target.value))}
        />
      </FormRow>

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
