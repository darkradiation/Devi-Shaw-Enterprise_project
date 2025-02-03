import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useUpdateRoute } from "./useUpdateRoute";
import Spinner from "../../ui/Spinner";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function EditRouteForm({ route, onCloseModal }) {
  const { id, route_name, near_or_far, distance } = route;

  // Store original values for change detection
  const defaultRouteName = route_name;
  const defaultNearFar = near_or_far;
  const defaultDistance = distance;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      route_name: defaultRouteName,
      near_or_far: defaultNearFar,
      distance: distance?.toString() || "",
    },
  });

  const { updateRoute, isUpdatingRoute } = useUpdateRoute();
  const isWorking = isUpdatingRoute;
  if (isWorking) return <Spinner />;

  const { errors } = formState;

  function onSubmit({ route_name, near_or_far, distance }) {
    // Check for changes
    if (
      route_name === defaultRouteName &&
      near_or_far === defaultNearFar &&
      (distance === defaultDistance?.toString() ||
        (distance === "" && defaultDistance === null))
    ) {
      console.log("No changes made");
      onCloseModal?.();
      return;
    }

    const updated_route = {
      id,
      route_name,
      near_or_far,
      distance: distance ? Number(distance) : null,
    };

    updateRoute({ id, updated_route });
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
        <Heading as="h4">Edit Route</Heading>
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

      <FormRow label="Near/Far" error={errors?.near_or_far?.message}>
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
          <Button disabled={isWorking}>Save Changes</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default EditRouteForm;
