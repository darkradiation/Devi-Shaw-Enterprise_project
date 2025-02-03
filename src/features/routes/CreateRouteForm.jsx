import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

import { useAddRoute } from "./useAddRoute";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function CreateRouteForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { addRoute, isAddingRoute } = useAddRoute();
  const isWorking = isAddingRoute;
  if (isWorking) return <Spinner />;

  const { errors } = formState;

  function onSubmit({ route_name, near_or_far, distance }) {
    const newRoute = {
      route_name,
      near_or_far,
      distance: distance ? Number(distance) : null, // Convert distance to a number if provided
    };

    addRoute({ newRoute });
    reset();
    onCloseModal?.();
  }

  function onError(errors) {
    console.log("Form errors:", errors);
  }

  function handleCloseForm() {
    reset();
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Heading as="h4">Add New Route</Heading>
      </FormRow>

      <FormRow label="Route Name" error={errors?.route_name?.message}>
        <Input
          type="text"
          id="route_name"
          disabled={isWorking}
          {...register("route_name", {
            required: "Route name is required",
          })}
        />
      </FormRow>

      <FormRow label="Near or Far" error={errors?.near_or_far?.message}>
        <Input
          type="text"
          id="near_or_far"
          disabled={isWorking}
          {...register("near_or_far", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Distance (optional)" error={errors?.distance?.message}>
        <Input
          type="number"
          id="distance"
          disabled={isWorking}
          {...register("distance", {
            min: {
              value: 0,
              message: "Distance must be a positive number",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <StackedButtons>
          <Button variation="secondary" type="reset" onClick={handleCloseForm}>
            Cancel
          </Button>
          <Button disabled={isWorking}>Add Route</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default CreateRouteForm;
