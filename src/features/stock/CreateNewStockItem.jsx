import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import { useAddStockItem } from "./useAddStockItem";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function CreateNewStockItem({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { addStockItem, isAddingStockItem } = useAddStockItem();
  const isWorking = isAddingStockItem;
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
    const buying_price_per_pc = (buying_price / quantity_per_pt).toFixed(2);
    const selling_price_near_per_pc = (
      selling_price_near / quantity_per_pt
    ).toFixed(2);
    const selling_price_far_per_pc = (
      selling_price_far / quantity_per_pt
    ).toFixed(2);

    const new_stock = {
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

    console.log(new_stock);
    addStockItem({ new_stock });

    // const new_scheme = {
    //   id: addedStockItem.id,
    //   item_id: addedStockItem.id,
    //   free_1pt: null,
    //   free_2pt: null,
    //   free_3pt: null,
    //   free_4pt: null,
    //   free_5pt: null,
    //   free_6pt: null,
    //   free_10pt: null,
    //   free_12pt: null,
    // };

    // addScheme({ new_scheme });
    // console.log(new_scheme);
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
          <Button disabled={isWorking}>Add</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default CreateNewStockItem;
