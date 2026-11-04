import { useState } from "react";
import styled from "styled-components";
import Input from "../../ui/Input";
import { useScheme1ByItemId } from "../schemes/useScheme1ByItemId";
import { useScheme2ByItemId } from "../schemes/useScheme2ByItemId";
import { useScheme3ByItemId } from "../schemes/useScheme3ByItemId";
import toast from "react-hot-toast";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--color-brand-600)" : "var(--color-grey-200)"};
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  opacity: ${(props) => (props.$disabled ? 0.55 : 1)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Meta = styled.div`
  margin-top: 0.2rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const Subtotal = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-brand-600);
`;

const StockChip = styled.span`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: 100px;
  font-size: 1.1rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.$out ? "var(--color-red-100)" : "var(--color-green-100)"};
  color: ${(props) =>
    props.$out ? "var(--color-red-700)" : "var(--color-green-700)"};
`;

const Controls = styled.div`
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

  & input {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
`;

const Stepper = styled.div`
  display: flex;
  gap: 0.4rem;

  & input {
    text-align: center;
    font-weight: 600;
  }
`;

const StepButton = styled.button`
  flex: 0 0 3.6rem;
  font-size: 2rem;
  line-height: 1;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-brand-600);

  &:disabled {
    opacity: 0.4;
  }
`;

const Pills = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
`;

const Pill = styled.button`
  padding: 0.7rem 0.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 100px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--color-brand-600)" : "var(--color-grey-300)"};
  background-color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "transparent"};
  color: ${(props) => (props.$active ? "#fff" : "var(--color-grey-700)")};

  &:disabled {
    opacity: 0.4;
  }
`;

const SchemeNote = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

function CreateOrderItem({ item, newOrder, setNewOrder }) {
  const {
    id,
    item_name,
    buying_price_per_pt,
    base_selling_price_per_pt,
    available_stock: { pt: available_pt },
  } = item;

  const [selectedScheme, setSelectedScheme] = useState(0);

  const [addScheme1, setAddScheme1] = useState(false);
  const [addScheme2, setAddScheme2] = useState(false);
  const [addScheme3, setAddScheme3] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [discountPerPt, setDiscountPerPt] = useState(0);
  const [freeItemsString, setFreeItemsString] = useState("");

  const { isLoadingScheme1, scheme_1 } = useScheme1ByItemId(id);
  const { isLoadingScheme2, scheme_2 } = useScheme2ByItemId(id);
  const { isLoadingScheme3, scheme_3 } = useScheme3ByItemId(id);

  const isWorking = isLoadingScheme1 || isLoadingScheme2 || isLoadingScheme3;
  if (isWorking) return null;

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value) || 0;

    if (newQuantity > available_pt) {
      toast.error(`Only ${available_pt} pt. available in stock.`);
      return;
    }

    setQuantity(newQuantity);
    updateFreeItemsString(selectedScheme, newQuantity);
  };

  const handleDiscountChange = (event) => {
    const newDiscount = Number(event.target.value) || 0;
    setDiscountPerPt(newDiscount);
    updateOrderItem(id, {
      discount: Number((newDiscount * quantity).toFixed(2)),
    });
  };

  const handleAddScheme1Change = (event) => {
    const isChecked = event.target.checked;
    setAddScheme1(isChecked);
    setAddScheme2(false);
    setAddScheme3(false);
    setSelectedScheme(isChecked ? 1 : 0);
    updateFreeItemsString(
      isChecked ? 1 : 0,
      newOrder.order_items.find((item) => item.item_id === id)?.item_quantity,
    );
  };

  const handleAddScheme2Change = (event) => {
    const isChecked = event.target.checked;
    setAddScheme2(isChecked);
    setAddScheme1(false);
    setAddScheme3(false);
    setSelectedScheme(isChecked ? 2 : 0);
    updateFreeItemsString(
      isChecked ? 2 : 0,
      newOrder.order_items.find((item) => item.item_id === id)?.item_quantity,
    );
  };

  const handleAddScheme3Change = (event) => {
    const isChecked = event.target.checked;
    setAddScheme3(isChecked);
    setAddScheme2(false);
    setAddScheme1(false);
    setSelectedScheme(isChecked ? 3 : 0);
    updateFreeItemsString(
      isChecked ? 3 : 0,
      newOrder.order_items.find((item) => item.item_id === id)?.item_quantity,
    );
  };

  const updateFreeItemsString = (scheme, quantity) => {
    const schemeLevel = getSchemeLevel(quantity);
    if (schemeLevel && quantity && scheme !== 0) {
      const schemeData =
        scheme === 1 ? scheme_1 : scheme === 2 ? scheme_2 : scheme_3;
      const free_items = schemeData[`free_${schemeLevel}pt`]?.free_items;
      const schemeDiscount = schemeData[`free_${schemeLevel}pt`]
        ?.discount_per_pt
        ? schemeData[`free_${schemeLevel}pt`]?.discount_per_pt
        : 0;

      setDiscountPerPt(schemeDiscount);

      let temp = "";
      if (free_items) {
        free_items.forEach((free_item) => {
          const { free_item_name, free_item_quantity } = free_item;
          if (Number(free_item_quantity) > 0) {
            temp = `${temp}${free_item_quantity}pc-${free_item_name} ,`;
          }
        });
      }
      setFreeItemsString(temp || "No scheme");
      updateOrderItem(id, {
        free_items: temp ? free_items : [],
        item_quantity: quantity,
        discount: Number((schemeDiscount * quantity).toFixed(2)),
      });
    } else {
      setFreeItemsString("");
      setDiscountPerPt(0);
      updateOrderItem(id, {
        free_items: [],
        item_quantity: quantity,
        discount: 0,
      });
    }
  };

  const updateOrderItem = (itemId, updates) => {
    // console.log(itemId, updates);
    const existingItemIndex = newOrder.order_items.findIndex(
      (item) => item.item_id === itemId,
    );
    const updatedOrderItems = [...newOrder.order_items];

    if (existingItemIndex !== -1) {
      if (updates.item_quantity === 0) {
        updatedOrderItems.splice(existingItemIndex, 1);
      } else {
        const updatedItem = {
          ...updatedOrderItems[existingItemIndex],
          ...updates,
        };
        updatedOrderItems[existingItemIndex] = updatedItem;
      }
    } else if (updates.item_quantity > 0) {
      updatedOrderItems.push({
        ...updates,
        item_id: itemId,
        item_name,
        buying_price: buying_price_per_pt,
        selling_price: base_selling_price_per_pt,
      });
    }

    setNewOrder({ ...newOrder, order_items: updatedOrderItems });
    console.log(updatedOrderItems);
  };

  const getSchemeLevel = (quantity) => {
    const levels = [1, 2, 3, 4, 5, 6, 10, 12];
    return levels.includes(quantity) ? quantity : null;
  };

  const noStock = available_pt <= 0;
  const freeText = freeItemsString.split(" ,").filter(Boolean).join(", ");
  const subtotal = (base_selling_price_per_pt - discountPerPt) * quantity;
  const schemes = [
    { n: 1, active: addScheme1, onChange: handleAddScheme1Change },
    { n: 2, active: addScheme2, onChange: handleAddScheme2Change },
    { n: 3, active: addScheme3, onChange: handleAddScheme3Change },
  ];

  return (
    <Card $active={quantity > 0} $disabled={noStock}>
      <Header>
        <div>
          <Name>{item_name}</Name>
          <Meta>Rs.{base_selling_price_per_pt} per pt</Meta>
        </div>
        <div style={{ textAlign: "right" }}>
          <StockChip $out={noStock}>
            {noStock ? "Out of stock" : `${available_pt} pt in stock`}
          </StockChip>
          {quantity > 0 && <Subtotal>Rs.{subtotal.toFixed(2)}</Subtotal>}
        </div>
      </Header>

      <Controls>
        <Field>
          <label htmlFor={`quantity-${id}`}>Quantity (pt)</label>
          <Stepper>
            <StepButton
              type="button"
              aria-label={`decrease ${item_name} quantity`}
              disabled={noStock || quantity <= 0}
              onClick={() =>
                handleQuantityChange({ target: { value: quantity - 1 } })
              }
            >
              −
            </StepButton>
            <Input
              type="text"
              inputMode="numeric"
              id={`quantity-${id}`}
              value={quantity}
              onChange={handleQuantityChange}
              disabled={noStock}
            />
            <StepButton
              type="button"
              aria-label={`increase ${item_name} quantity`}
              disabled={noStock || quantity >= available_pt}
              onClick={() =>
                handleQuantityChange({ target: { value: quantity + 1 } })
              }
            >
              +
            </StepButton>
          </Stepper>
        </Field>
        <Field>
          <label htmlFor={`discount-${id}`}>Discount / pt (Rs)</label>
          <Input
            type="text"
            inputMode="decimal"
            id={`discount-${id}`}
            value={discountPerPt}
            onChange={handleDiscountChange}
            disabled={noStock}
          />
        </Field>
      </Controls>

      <Pills>
        {schemes.map(({ n, active, onChange }) => (
          <Pill
            key={n}
            type="button"
            $active={active}
            disabled={noStock}
            onClick={() => onChange({ target: { checked: !active } })}
          >
            Scheme {n}
          </Pill>
        ))}
      </Pills>
      {(addScheme1 || addScheme2 || addScheme3) && quantity > 0 && (
        <SchemeNote>
          {freeText && freeItemsString !== "No scheme"
            ? `Free: ${freeText}`
            : "No scheme for this quantity"}
        </SchemeNote>
      )}
    </Card>
  );
}

export default CreateOrderItem;
