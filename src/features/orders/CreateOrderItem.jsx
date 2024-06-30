import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useSchemeNearByItemId } from "../schemes/useSchemeNearByItemId";
import { useSchemeFarByItemId } from "../schemes/useSchemeFarByItemId";
import { useEffect } from "react";

const Label = styled.label`
  font-weight: 500;
  font-size: 1.2rem;
  position: absolute;
  left: 2rem;
  top: 0.4rem;
  background-color: var(--color-grey-0);
  padding: 0 0.3rem;
`;
const Stacked1 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  gap: 1rem;

  & div {
    width: 50%;
    position: relative;
    /* margin-top: 1rem; */
    padding: 1.2rem 0 0 0;
  }
  & div:last-child {
    margin-bottom: 1rem;
  }
`;
const Stacked2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  gap: 1rem;

  & span:first-child {
    font-weight: 600;
  }
  & span:last-child {
    font-size: smaller;
    /* font-weight: 600; */
  }
`;
function CreateOrderItem({ item, nearOrFar, newOrder, setNewOrder }) {
  const {
    id,
    item_name,
    buying_price_per_pt,
    selling_price_per_pt: { near: selling_price_near, far: selling_price_far },
    available_stock: { pt: available_pt },
  } = item;

  const selling_price =
    nearOrFar == "near" ? selling_price_near : selling_price_far;

  const [addScheme, setAddScheme] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [freeItems, setFreeItems] = useState([]);
  const [freeItemsString, setFreeItemsString] = useState("");

  const { isLoadingSchemeNear, scheme_near } = useSchemeNearByItemId(id);
  const { isLoadingSchemeFar, scheme_far } = useSchemeFarByItemId(id);

  useEffect(
    function () {
      const quantity = newOrder.order_items.find(
        (item) => item.item_id === id
      )?.item_quantity;
      const schemeLevel = getSchemeLevel(quantity);

      if (schemeLevel && quantity) {
        const scheme = nearOrFar == "near" ? scheme_near : scheme_far;
        const free_items = scheme[`free_${schemeLevel}pt`]?.free_items;

        console.log(free_items);
        let temp = "";
        if (free_items) {
          free_items.forEach((free_item) => {
            const freeItemName = free_item.free_item_name;
            const freeItemQuantity = free_item.free_item_quantity;

            if (Number(freeItemQuantity) > 0) {
              temp = `${temp}${freeItemQuantity}pc-${freeItemName} ,`;
            }
          });
        }
        if (temp) {
          setFreeItemsString(temp);
          setFreeItems(free_items);
        }
      } else if (addScheme) {
        setFreeItemsString("No scheme");
        setFreeItems([]);
      } else {
        setFreeItemsString("");
        setFreeItems([]);
      }
    },
    [
      addScheme,
      newOrder.order_items.find((item) => item.item_id === id)?.item_quantity,
      id,
      nearOrFar,
      newOrder,
      scheme_far,
      scheme_near,
    ]
  );

  const isWorking = isLoadingSchemeNear || isLoadingSchemeFar;
  if (isWorking) return;

  function handleQuantityChange(event) {
    const itemId = id;
    const newQuantity = Number(event.target.value);

    const existingItemIndex = newOrder.order_items.findIndex(
      (item) => item.item_id === itemId
    );

    if (existingItemIndex !== -1) {
      // Update the existing item

      const updatedOrderItems = [...newOrder.order_items];

      if (newQuantity === 0 || newQuantity === "") {
        // Remove the item if quantity is set to zero
        updatedOrderItems.splice(existingItemIndex, 1);
      } else {
        const updatedItem = {
          ...newOrder.order_items[existingItemIndex],
          item_quantity: newQuantity,
        };
        updatedOrderItems[existingItemIndex] = updatedItem;
      }

      const modifiedOrder = {
        ...newOrder,
        order_items: updatedOrderItems,
      };
      setNewOrder(modifiedOrder);
    } else {
      // Add a new item
      const modifiedOrder = {
        ...newOrder,
        order_items: [
          ...newOrder.order_items,
          {
            item_id: itemId,
            item_name: item_name,
            buying_price: buying_price_per_pt,
            item_quantity: newQuantity,
            selling_price: Number(selling_price),
            free_items: [],
            discount: 0,
          },
        ],
      };
      setNewOrder(modifiedOrder);
    }
  }
  function handleDiscountChange(event) {
    const d = Number(event.target.value) ? Number(event.target.value) : 0;
    setDiscount(d);

    const itemId = id;
    const existingItemIndex = newOrder.order_items.findIndex(
      (item) => item.item_id === itemId
    );
    if (existingItemIndex !== -1) {
      const updatedOrderItems = [...newOrder.order_items];

      const updatedItem = {
        ...newOrder.order_items[existingItemIndex],
        discount: d,
      };
      updatedOrderItems[existingItemIndex] = updatedItem;

      const modifiedOrder = {
        ...newOrder,
        order_items: updatedOrderItems,
      };
      setNewOrder(modifiedOrder);
    }
  }
  function handleAddSchemeChange(event) {
    setAddScheme(event.target.checked);

    const itemId = id;
    const existingItemIndex = newOrder.order_items.findIndex(
      (item) => item.item_id === itemId
    );
    if (existingItemIndex !== -1) {
      const updatedOrderItems = [...newOrder.order_items];

      const updatedItem = {
        ...newOrder.order_items[existingItemIndex],
        free_items: freeItems,
      };
      updatedOrderItems[existingItemIndex] = updatedItem;

      const modifiedOrder = {
        ...newOrder,
        order_items: updatedOrderItems,
      };
      setNewOrder(modifiedOrder);
    }
  }
  function getSchemeLevel(quantity) {
    switch (quantity) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 5;
      case 6:
        return 6;
      case 10:
        return 10;
      case 12:
        return 12;
      default:
        return null;
    }
  }

  return (
    <FormRow type="order">
      <Stacked2>
        <span>{item_name}</span>
        <span>
          Rs.{selling_price} -- {available_pt} pt.
        </span>
      </Stacked2>
      <Stacked1>
        <div>
          <Label htmlFor="quantity">quantity</Label>
          <Input
            type="number"
            id="quantity"
            defaultValue={0}
            onChange={handleQuantityChange}
          />
        </div>
        <div>
          <Label htmlFor="discount">Discount</Label>
          <Input
            type="text"
            id="discount"
            defaultValue={discount}
            onChange={handleDiscountChange}
          />
        </div>
      </Stacked1>
      <Stacked2>
        <Checkbox
          id="scheme"
          checked={addScheme}
          onChange={handleAddSchemeChange}
        >
          Add Scheme
        </Checkbox>
        {addScheme && <span>{freeItemsString}</span>}
      </Stacked2>
    </FormRow>
  );
}

export default CreateOrderItem;
