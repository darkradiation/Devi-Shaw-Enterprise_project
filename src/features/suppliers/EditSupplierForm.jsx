import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useUpdateSupplier } from "./useUpdateSupplier";
import Spinner from "../../ui/Spinner";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function EditSupplierForm({ supplier, onCloseModal }) {
  const { id, supplier_name, phone_no } = supplier;

  const defaultSupplierName = supplier_name;
  const defaultPhoneNo = phone_no;

  const { register, handleSubmit, reset, formState } = useForm();
  const { updateSupplier, isUpdatingSupplier } = useUpdateSupplier();
  const isWorking = isUpdatingSupplier;
  if (isWorking) return <Spinner />;

  const { errors } = formState;

  function onSubmit({ supplier_name, phone_no }) {
    // Check if no changes were made
    if (
      supplier_name === defaultSupplierName &&
      Number(phone_no) === defaultPhoneNo
    ) {
      console.log("No changes made");
      onCloseModal();
      return;
    }

    const updated_supplier = {
      id,
      supplier_name,
      phone_no: Number(phone_no),
    };

    updateSupplier({ id, updated_supplier });
    onCloseModal();
  }

  function onError(errors) {
    console.log(errors);
  }

  function handleCloseForm() {
    reset();
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Heading as="h4">Edit Supplier</Heading>
      </FormRow>

      <FormRow label="Supplier Name" error={errors?.supplier_name?.message}>
        <Input
          type="text"
          id="supplier_name"
          defaultValue={defaultSupplierName}
          disabled={isWorking}
          {...register("supplier_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Phone Number" error={errors?.phone_no?.message}>
        <Input
          type="text"
          id="phone_no"
          defaultValue={defaultPhoneNo}
          disabled={isWorking}
          {...register("phone_no", {
            required: "This field is required",
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
          <Button disabled={isWorking}>Save Changes</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default EditSupplierForm;
