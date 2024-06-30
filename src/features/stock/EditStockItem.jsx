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
    selling_price_per_pt: { near: selling_price_near, far: selling_price_far },
    available_stock: { pt: available_pt, pcs: available_pcs },
  } = item;

  const defaultItemName = item_name;
  const defaultQuantityPerPt = quantity_per_pt;
  const defaultMrpPerPc = mrp_per_pc;
  const defaultBuyingPrice = buying_price_per_pt;
  const defaultSellingPriceNear = selling_price_near;
  const defaultSellingPriceFar = selling_price_far;
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
    selling_price_near,
    selling_price_far,
    available_pt,
    available_pcs,
  }) {
    if (
      item_name === defaultItemName &&
      buying_price === defaultBuyingPrice &&
      selling_price_near === defaultSellingPriceNear &&
      selling_price_far === defaultSellingPriceFar &&
      available_pt === defaultAvailablePt &&
      available_pcs === defaultAvailablePcs
    ) {
      onCloseModal();
      return;
    }

    const buying_price_per_pc = (buying_price / quantity_per_pt).toFixed(2);
    const selling_price_near_per_pc = (
      selling_price_near / quantity_per_pt
    ).toFixed(2);
    const selling_price_far_per_pc = (
      selling_price_far / quantity_per_pt
    ).toFixed(2);

    const updated_stock = {
      id,
      item_name,
      quantity_per_pt,
      buying_price_per_pt: buying_price,
      selling_price_per_pt: {
        near: selling_price_near,
        far: selling_price_far,
      },
      buying_price_per_pc,
      selling_price_per_pc: {
        near: selling_price_near_per_pc,
        far: selling_price_far_per_pc,
      },
      mrp_per_pc,
      available_stock: { pt: available_pt, pcs: available_pcs },
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

      <FormRow
        label="Selling Price Near /pt"
        error={errors?.selling_price_near?.message}
      >
        <Input
          type="number"
          id="selling_price_near"
          defaultValue={defaultSellingPriceNear}
          disabled={isWorking}
          {...register("selling_price_near", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Selling Price Far /pt"
        error={errors?.selling_price_far?.message}
      >
        <Input
          type="number"
          id="selling_price_far"
          defaultValue={defaultSellingPriceFar}
          disabled={isWorking}
          {...register("selling_price_far", {
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
          {/* type is an HTML attribute! */}
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
