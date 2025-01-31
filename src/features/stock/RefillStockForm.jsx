import { useState } from "react";
import { add } from "date-fns";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Select from "../../ui/Select";
import { useStock } from "./useStock";
import { useRefillStock } from "./useRefillStock";
import { useSuppliers } from "../suppliers/useSuppliers";
import { useAddStockHistory } from "../stockHistory/useAddStockHistory";

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

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

function RefillStockForm({ onCloseModal }) {
  const [supplierId, setSupplierId] = useState(1);
  const { isLoadingSuppliers, suppliers } = useSuppliers();
  const { isLoadingStock, stock } = useStock();
  const { refillStock, isRefillingStock } = useRefillStock();
  const { addStockHistory, isAddingStockHistory } = useAddStockHistory();

  const isWorking =
    isLoadingStock ||
    isRefillingStock ||
    isLoadingSuppliers ||
    isAddingStockHistory;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      refillData: stock.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            refillQuantity: 0,
            buyingPrice: item.buying_price_per_pt,
          },
        }),
        {}
      ),
      extraCosts: 0,
    },
  });

  const onSubmit = (data) => {
    const totalBill =
      Object.values(data.refillData).reduce(
        (total, item) => total + item.refillQuantity * item.buyingPrice,
        0
      ) + data.extraCosts;

    const entry = {
      // delivery_date: fromToday(0),
      supplier_id: supplierId,
      items: data.refillData,
      extra_costs: data.extraCosts,
      bill_value: totalBill,
    };

    console.log(data.refillData);
    console.log(entry);

    refillStock(data.refillData);
    addStockHistory({ entry });

    // onCloseModal?.();
  };

  const handleCloseForm = () => {
    reset();
    onCloseModal?.();
  };

  if (isWorking) return null;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h4">Stock Refill</Heading>
      </FormRow>

      {suppliers && (
        <FormRow label="Supplier" error={errors?.supplier?.message}>
          <Select
            options={suppliers.map((supplier) => ({
              value: supplier.id,
              label: supplier.supplier_name,
            }))}
            value={supplierId}
            onChange={(e) => setSupplierId(Number(e.target.value))}
            type="white"
            id="supplier"
            disabled={isWorking}
          />
        </FormRow>
      )}

      {stock.map((stockItem) => (
        <StyledDiv key={stockItem.id}>
          <Desc>
            <span>{stockItem.item_name}</span>
            <span>inStock- {stockItem.available_stock.pt} pt.</span>
          </Desc>

          <FormRow
            label="Refill quantity"
            type="multi"
            error={errors.refillData?.[stockItem.id]?.refillQuantity?.message}
          >
            <Input
              type="text"
              id={`${stockItem.id}_refill`}
              disabled={isWorking}
              {...register(`refillData.${stockItem.id}.refillQuantity`, {
                valueAsNumber: true,
                required: "Refill quantity is required",
                min: {
                  value: 0,
                  message: "Must be at least 0",
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Buying price"
            type="multi"
            error={errors.refillData?.[stockItem.id]?.buyingPrice?.message}
          >
            <Input
              type="text"
              id={`${stockItem.id}_BP`}
              disabled={isWorking}
              {...register(`refillData.${stockItem.id}.buyingPrice`, {
                valueAsNumber: true,
                required: "Buying price is required",
                min: {
                  value: 0,
                  message: "Must be at least 0",
                },
              })}
            />
          </FormRow>
        </StyledDiv>
      ))}

      <FormRow label="Extra costs" error={errors.extraCosts?.message}>
        <Input
          type="number"
          disabled={isWorking}
          {...register("extraCosts", {
            valueAsNumber: true,
            required: "Extra costs are required",
            min: 0,
          })}
        />
      </FormRow>

      <FormRow>
        <StackedButtons>
          <Button variation="secondary" type="button" onClick={handleCloseForm}>
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

// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FormRow from "../../ui/FormRow";
// import Heading from "../../ui/Heading";
// import Select from "../../ui/Select";
// import styled from "styled-components";
// import { useStock } from "./useStock";
// import { useRefillStock } from "./useRefillStock";
// import { useState } from "react";
// import { useSuppliers } from "../suppliers/useSuppliers";
// import { useAddStockHistory } from "../stockHistory/useAddStockHistory";

// const StackedButtons = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1rem;
// `;

// const Desc = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   margin: 1rem 0 0.5rem;

//   & span:first-child {
//     font-weight: 600;
//   }
// `;

// const StyledDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 1.2rem 0;

//   &:not(:first-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
//   &:last-child {
//     border-bottom: 0;
//   }
// `;

// function RefillStockForm({ onCloseModal }) {
//   const [refillData, setRefillData] = useState({});
//   const [supplierId, setSupplierId] = useState(1);
//   const [extraCosts, setExtraCosts] = useState(0);

//   const { isLoadingSuppliers, suppliers } = useSuppliers();
//   const { isLoadingStock, stock } = useStock();
//   const { refillStock, isRefillingStock } = useRefillStock();
//   const { addStockHistory, isAddingStockHistory } = useAddStockHistory();
//   const isWorking =
//     isLoadingStock ||
//     isRefillingStock ||
//     isLoadingSuppliers ||
//     isAddingStockHistory;
//   if (isWorking) return null;

//   const handleRefillChange = (id, field, value) => {
//     setRefillData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value ? Number(value) : 0,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Calculate total bill
//     const totalBill =
//       Object.values(refillData).reduce((total, item) => {
//         return total + item.refillQuantity * item.buyingPrice;
//       }, 0) + extraCosts;

//     // logging
//     console.log(refillData);
//     console.log({
//       delivery_date: new Date().toISOString(), // assuming current date
//       supplier_id: supplierId,
//       items: refillData,
//       extra_costs: extraCosts,
//       bill_value: totalBill,
//     });

//     // Refill stock and add to history
//     // refillStock(refillData);
//     // addStockHistory({
//     //   delivery_date: new Date().toISOString(), // assuming current date
//     //   supplier_id: supplierId,
//     //   items: refillData,
//     //   extra_costs: extraCosts,
//     //   bill_value: totalBill,
//     // });

//     // // Close modal and reset form
//     // onCloseModal();
//     // setRefillData({});
//     // setExtraCosts(0);
//   };

//   function handleCloseForm() {
//     setRefillData({});
//     onCloseModal();
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormRow>
//         <Heading as="h4">Stock Refill</Heading>
//       </FormRow>

//       {/* select component to choose a supplier*/}
//       {suppliers && (
//         <FormRow>
//           <Select
//             options={suppliers.map((supplier) => ({
//               value: supplier.id,
//               label: supplier.supplier_name,
//             }))}
//             value={supplierId}
//             onChange={(e) => setSupplierId(e.target.value)}
//             type="white"
//             id="supplier"
//             disabled={isWorking}
//           />
//         </FormRow>
//       )}

//       {stock.map((stockItem) => (
//         <StyledDiv key={stockItem.id}>
//           <Desc>
//             <span>{stockItem.item_name}</span>
//             <span>inStock- {stockItem.available_stock.pt} pt.</span>
//           </Desc>
//           <FormRow
//             key={`${stockItem.id}_quantity`}
//             label="refill quantity"
//             type="multi"
//           >
//             <Input
//               type="text"
//               id={`${stockItem.id}_refill`}
//               defaultValue={0}
//               onChange={(e) =>
//                 handleRefillChange(
//                   stockItem.id,
//                   "refillQuantity",
//                   e.target.value
//                 )
//               }
//             />
//           </FormRow>
//           <FormRow key={`${stockItem.id}_bp`} label="buying price" type="multi">
//             <Input
//               type="text"
//               id={`${stockItem.id}_BP`}
//               defaultValue={Number(stockItem.buying_price_per_pt)}
//               onChange={(e) =>
//                 handleRefillChange(stockItem.id, "buyingPrice", e.target.value)
//               }
//             />
//           </FormRow>
//         </StyledDiv>
//       ))}

//       <FormRow label="extra costs">
//         <Input
//           type="text"
//           value={extraCosts}
//           onChange={(e) => setExtraCosts(Number(e.target.value))}
//         />
//       </FormRow>

//       <FormRow>
//         <StackedButtons>
//           <Button
//             variation="secondary"
//             type="reset"
//             onClick={() => handleCloseForm()}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isWorking}>
//             Add
//           </Button>
//         </StackedButtons>
//       </FormRow>
//     </Form>
//   );
// }

// export default RefillStockForm;
