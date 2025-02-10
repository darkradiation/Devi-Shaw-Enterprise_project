import styled from "styled-components";
import { format } from "date-fns";
import { ImLocation } from "react-icons/im";
import { MdCall } from "react-icons/md";

import Heading from "../../ui/Heading";
import Table from "../../ui/Table";
import ButtonIcon from "../../ui/ButtonIcon";
import { useStockItem } from "../stock/useStockItem";
import { useStock } from "../stock/useStock";

const StyledStockHistoryDetails = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
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
  & > div:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;

  & div:first-child {
    font-size: 1.3rem;
    font-weight: 600;
  }
  & div:last-child {
    font-size: 1.4rem;
    padding: 0 1.5rem;
  }
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

const IconBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 0.5rem 2rem;
`;

function StockHistoryDetails({ stockHistory }) {
  const {
    id,
    delivery_date,
    items,
    bill_value,
    extra_costs,
    cash_note,
    suppliers: { supplier_name, phone_no },
  } = stockHistory;

  const { isLoadingStock, stock } = useStock();
  while (isLoadingStock) return;

  const itemsArray = Object.entries(items)
    .map(([itemId, details]) => {
      // Find the corresponding item in the stock object
      const stockItem = stock.find(
        (stockItem) => Number(stockItem.id) === Number(itemId)
      );

      return {
        id: itemId,
        name: stockItem ? stockItem.item_name : "Unknown", // Use item_name from stock or a fallback
        ...details,
      };
    })
    .filter((item) => item.refillQuantity > 0);

  const handleCall = () => {
    if (!phone_no) return;
    window.open(`https://web.whatsapp.com/send?phone=${phone_no}`);
  };

  return (
    <StyledStockHistoryDetails>
      <HeadingBox>
        <Heading as="h2">
          #{id}-{supplier_name}
        </Heading>
        <BlueTag>
          {format(new Date(delivery_date), "MMM dd, yyyy HH:mm")}
        </BlueTag>
      </HeadingBox>

      <DataBox>
        <Heading as="h3">Refilled Items</Heading>
        <Table columns="4fr  2fr 2fr 4fr">
          <Table.Header>
            <div>Item</div>
            <div>Qt.</div>
            <div>BP</div>
            <div>Total</div>
          </Table.Header>
          <Table.Body
            data={itemsArray}
            render={(item) => (
              <Table.Row key={item.id}>
                <div>{item.name}</div>
                <div>{item.refillQuantity}</div>
                <div>{item.buyingPrice}</div>
                <div>{item.buyingPrice * item.refillQuantity}</div>
              </Table.Row>
            )}
          />
        </Table>
      </DataBox>

      <PricingBox>
        <PriceItem>
          <div>Bill Value</div>
          <div>Rs. {bill_value}</div>
        </PriceItem>

        {extra_costs > 0 && (
          <PriceItem>
            <div>Extra Costs</div>
            <div>Rs. {extra_costs}</div>
          </PriceItem>
        )}

        <PriceItem>
          <div>Total</div>
          <div>Rs. {bill_value + (extra_costs || 0)}</div>
        </PriceItem>
      </PricingBox>

      <DataBox>
        <Heading as="h3">Cash Note</Heading>
        <div>{cash_note}</div>
      </DataBox>

      <IconBox>
        {phone_no && (
          <ButtonIcon size="lg" onClick={handleCall}>
            <MdCall />
          </ButtonIcon>
        )}
      </IconBox>
    </StyledStockHistoryDetails>
  );
}

export default StockHistoryDetails;
