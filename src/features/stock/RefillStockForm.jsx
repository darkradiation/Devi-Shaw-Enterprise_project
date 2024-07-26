import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useStock } from "./useStock";
import { useRefillStock } from "./useRefillStock";
import { useState } from "react";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Desc = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0.5rem;

  & span:first-child {
    font-weight: 600;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.2rem 0;

  &:not(:first-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:last-child {
    border-bottom: 0;
  }
`;

function RefillStockForm({ onCloseModal }) {
  const [refillData, setRefillData] = useState({});

  const { isLoadingStock, stock } = useStock();
  const { refillStock, isRefillingStock } = useRefillStock();
  const isWorking = isLoadingStock || isRefillingStock;
  if (isWorking) return null;

  const handleRefillChange = (id, field, value) => {
    setRefillData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value ? Number(value) : 0,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(refillData);
    refillStock(refillData);
    onCloseModal();
  };

  function handleCloseForm() {
    setRefillData({});
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Heading as="h4">Stock Refill</Heading>
      </FormRow>

      {stock.map((stockItem) => (
        <StyledDiv key={stockItem.id}>
          <Desc>
            <span>{stockItem.item_name}</span>
            <span>inStock- {stockItem.available_stock.pt} pt.</span>
          </Desc>
          <FormRow key={stockItem.id} label="refill quantity" type="multi">
            <Input
              type="number"
              id={`${stockItem.id}_refill`}
              defaultValue={0}
              onChange={(e) =>
                handleRefillChange(
                  stockItem.id,
                  "refillQuantity",
                  e.target.value
                )
              }
            />
          </FormRow>
          <FormRow key={stockItem.id} label="buying price" type="multi">
            <Input
              type="number"
              id={`${stockItem.id}_BP`}
              defaultValue={Number(stockItem.buying_price_per_pt)}
              onChange={(e) =>
                handleRefillChange(stockItem.id, "buyingPrice", e.target.value)
              }
            />
          </FormRow>
        </StyledDiv>
      ))}

      <FormRow>
        <StackedButtons>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => handleCloseForm()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isWorking}>
            Add
          </Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default RefillStockForm;
