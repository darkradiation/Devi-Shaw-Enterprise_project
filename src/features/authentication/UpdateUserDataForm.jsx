import styled from "styled-components";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Heading from "../../ui/Heading";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
const Label = styled.label`
  font-weight: 600;
  font-size: 1.2rem;
  position: absolute;
  right: 2rem;
  top: 0.4rem;
  background-color: var(--color-grey-0);
  padding: 0 0.3rem;
  /* color: var(--color-brand-500); */
`;

function UpdateUserDataForm({ onCloseModal }) {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      fullName: currentFullName,
    },
  });
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit = (data) => {
    const { fullName, avatar } = data;
    updateUser(
      { fullName, avatar: avatar[0] },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      }
    );
  };

  const handleCancel = () => {
    reset({ fullName: currentFullName });
    onCloseModal();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h4">Update User Data</Heading>
      </FormRow>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isUpdating}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Label id="avatar">Avatar image</Label>
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          {...register("avatar")}
        />
      </FormRow>
      <FormRow>
        <StackedButtons>
          <Button
            variation="secondary"
            type="reset"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
