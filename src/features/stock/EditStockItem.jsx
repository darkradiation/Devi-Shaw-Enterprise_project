import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useUpdateStockItem } from "./useUpdateStockItem";
import Spinner from "../../ui/Spinner";
const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function EditStockItem({ item, onCloseModal }) {
  const {
    id,
    quantity_per_pt,
    mrp_per_pc,
    item_name,
    buying_price_per_pt,
    base_selling_price_per_pt,
    available_stock: { pt: available_pt, pcs: available_pcs },
  } = item;

  const defaultItemName = item_name;
  const defaultQuantityPerPt = quantity_per_pt;
  const defaultMrpPerPc = mrp_per_pc;
  const defaultBuyingPrice = buying_price_per_pt;
  const defaultSellingPrice = base_selling_price_per_pt;
  const defaultAvailablePt = available_pt;
  const defaultAvailablePcs = available_pcs;

  const { register, handleSubmit, reset, formState } = useForm();
  const { updateStockItem, isUpdatingStockItem } = useUpdateStockItem();
  const isWorking = isUpdatingStockItem;
  if (isWorking) return <Spinner />;

  const { errors } = formState;

  function onSubmit({
    item_name,
    quantity_per_pt,
    mrp_per_pc,
    buying_price,
    selling_price,
    available_pt,
    available_pcs,
  }) {
    if (
      item_name === defaultItemName &&
      Number(quantity_per_pt) === defaultQuantityPerPt &&
      Number(mrp_per_pc) === defaultMrpPerPc &&
      Number(buying_price) === defaultBuyingPrice &&
      Number(selling_price) === defaultSellingPrice &&
      Number(available_pt) === defaultAvailablePt &&
      Number(available_pcs) === defaultAvailablePcs
    ) {
      console.log("No change done");
      onCloseModal();
      return;
    }

    function checkValueChange(fieldName, defaultValue, newValue) {
      if (defaultValue !== newValue) {
        console.log(`${fieldName} changed`, defaultValue, newValue);
      }
    }
    checkValueChange("Item name", defaultItemName, item_name);
    checkValueChange(
      "Quantity per pt",
      defaultQuantityPerPt,
      Number(quantity_per_pt)
    );
    checkValueChange("Mrp per pc", defaultMrpPerPc, Number(mrp_per_pc));
    checkValueChange("Buying price", defaultBuyingPrice, Number(buying_price));
    checkValueChange(
      "Selling price",
      defaultSellingPrice,
      Number(selling_price)
    );
    checkValueChange("Available pt", defaultAvailablePt, Number(available_pt));
    checkValueChange(
      "Available pcs",
      defaultAvailablePcs,
      Number(available_pcs)
    );

    const buying_price_per_pc = (
      Number(buying_price) / Number(quantity_per_pt)
    ).toFixed(2);
    const base_selling_price_per_pc = (
      Number(selling_price) / Number(quantity_per_pt)
    ).toFixed(2);

    const updated_stock = {
      id,
      item_name,
      quantity_per_pt: Number(quantity_per_pt),
      buying_price_per_pt: Number(buying_price),
      base_selling_price_per_pt: Number(selling_price),
      buying_price_per_pc: Number(buying_price_per_pc),
      base_selling_price_per_pc: Number(base_selling_price_per_pc),
      mrp_per_pc: Number(mrp_per_pc),
      available_stock: { pt: Number(available_pt), pcs: Number(available_pcs) },
    };

    console.log(updated_stock);
    updateStockItem({ id, updated_stock });
    onCloseModal();
  }
  function onError(errors) {
    console.log("errors");
    console.log(errors);
  }
  function handleCloseForm() {
    reset();
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Heading as="h4">Edit stock item</Heading>
      </FormRow>

      <FormRow label="Item name" error={errors?.item_name?.message}>
        <Input
          type="text"
          id="item_name"
          defaultValue={defaultItemName}
          disabled={isWorking}
          {...register("item_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Pcs per pt" error={errors?.quantity_per_pt?.message}>
        <Input
          type="number"
          id="quantity_per_pt"
          defaultValue={defaultQuantityPerPt}
          disabled={isWorking}
          {...register("quantity_per_pt", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Mrp/pc" error={errors?.mrp_per_pc?.message}>
        <Input
          type="number"
          id="mrp_per_pc"
          defaultValue={defaultMrpPerPc}
          disabled={isWorking}
          {...register("mrp_per_pc", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Buying Price /pt" error={errors?.buying_price?.message}>
        <Input
          type="number"
          id="buying_price"
          defaultValue={defaultBuyingPrice}
          disabled={isWorking}
          {...register("buying_price", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Selling Price /pt" error={errors?.selling_price?.message}>
        <Input
          type="number"
          id="selling_price"
          defaultValue={defaultSellingPrice}
          disabled={isWorking}
          {...register("selling_price", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Available stock - Pt."
        error={errors?.available_pt?.message}
      >
        <Input
          type="number"
          id="available_pt"
          defaultValue={defaultAvailablePt}
          disabled={isWorking}
          {...register("available_pt", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Available stock - Pcs"
        error={errors?.available_pcs?.message}
      >
        <Input
          type="number"
          id="available_pcs"
          defaultValue={defaultAvailablePcs}
          disabled={isWorking}
          {...register("available_pcs", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <StackedButtons>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => handleCloseForm()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>Edit</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default EditStockItem;
