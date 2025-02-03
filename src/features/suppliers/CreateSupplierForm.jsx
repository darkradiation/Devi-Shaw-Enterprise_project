import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

import { useAddSupplier } from "./useAddSupplier";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function CreateSupplierForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { addSupplier, isAddingSupplier } = useAddSupplier();
  const isWorking = isAddingSupplier;
  if (isWorking) return <Spinner />;

  const { errors } = formState;

  function onSubmit({ supplier_name, phone_no }) {
    const newSupplier = {
      supplier_name,
      phone_no: Number(phone_no),
    };

    // console.log(newSupplier);
    addSupplier({ newSupplier });
    onCloseModal();
  }

  function onError(errors) {
    console.log("Form errors:", errors);
  }

  function handleCloseForm() {
    reset();
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Heading as="h4">Add New Supplier</Heading>
      </FormRow>

      <FormRow label="Supplier Name" error={errors?.supplier_name?.message}>
        <Input
          type="text"
          id="supplier_name"
          disabled={isWorking}
          {...register("supplier_name", {
            required: "Supplier name is required",
          })}
        />
      </FormRow>

      <FormRow label="Phone Number" error={errors?.phone_no?.message}>
        <Input
          type="tel"
          id="phone_no"
          disabled={isWorking}
          {...register("phone_no", {
            required: "Phone number is required",
            pattern: {
              value: /^\d+$/,
              message: "Phone number should contain only numbers",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <StackedButtons>
          <Button variation="secondary" type="reset" onClick={handleCloseForm}>
            Cancel
          </Button>
          <Button disabled={isWorking}>Add Supplier</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default CreateSupplierForm;
