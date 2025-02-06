import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import Heading from "../../ui/Heading";
import styled from "styled-components";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

// Email regex: /\S+@\S+\.\S+/

function SignupForm({ onCloseModal }) {
  const { signup, isLoading } = useSignup();
  const { register, handleSubmit, formState, getValues, reset } = useForm();

  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
          onCloseModal();
        },
      }
    );
  }
  function handleCloseForm() {
    reset();
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h4">SignUp new user</Heading>
      </FormRow>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <StackedButtons>
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={() => handleCloseForm()}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
