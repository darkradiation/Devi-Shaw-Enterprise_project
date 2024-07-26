import { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Select from "../../ui/Select";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

import { useRoutes } from "../routes/useRoutes";
import { fromToday } from "../../utils/date";
import { useGeolocated } from "react-geolocated";
import { useAddCustomer } from "./useAddCustomer";
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

const default_store_pic =
  "https://nnfnobdpdtdimlugwmig.supabase.co/storage/v1/object/public/customer_store_pictures/0.38892795734812036-default_store_image.jpg";
const default_owner_pic =
  "https://nnfnobdpdtdimlugwmig.supabase.co/storage/v1/object/public/customer_owner_pictures/0.034979561436823126-default_store_owner_image.jpeg";

function CreateCustomerForm({ onCloseModal }) {
  const [routeId, setRouteId] = useState("1");
  const { isLoadingRoutes, routes } = useRoutes();
  const { addCustomer, isAddingCustomer } = useAddCustomer();
  const { register, handleSubmit, reset, formState } = useForm();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      },
      watchPosition: false,
      userDecisionTimeout: 5000,
    });

  const isWorking = isLoadingRoutes || isAddingCustomer;
  if (isWorking) return <Spinner />;

  const { errors } = formState;

  function handleRouteChange(event) {
    setRouteId(event.target.value);
  }

  function onSubmit({
    store_name,
    owner_phone_no,
    store_address,
    owner_name,
    open_hours,
    store_picture,
    owner_picture,
  }) {
    // console.log(data);
    const storePic =
      typeof store_picture === "string" ? store_picture : store_picture[0];
    const ownerPic =
      typeof owner_picture === "string" ? owner_picture : owner_picture[0];

    const new_customer = {
      created_at: fromToday(0),
      store_name,
      owner_name,
      owner_phone_no,
      store_address,
      open_hours,
      store_picture: storePic ? storePic : default_store_pic,
      owner_picture: ownerPic ? ownerPic : default_owner_pic,
      route_id: routeId,
      distance: null,
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      // store_geoLink: `https://www.google.com/maps/@?api=1&map_action=map&center=${coords.latitude},${coords.longitude}&zoom=15`,
    };

    delete new_customer["routes"];

    // console.log(new_customer);
    addCustomer({ new_customer });
    onCloseModal();
  }

  function onError(errors) {
    console.error(errors);
  }
  function handleCloseForm() {
    reset();
    onCloseModal();
  }
  return !isGeolocationAvailable ? (
    <Heading as="h4">Your browser does not support Geolocation</Heading>
  ) : !isGeolocationEnabled ? (
    <Heading as="h4">Geolocation is not enabled</Heading>
  ) : coords ? (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Heading as="h4">Create new customer</Heading>
      </FormRow>

      <FormRow label="Route">
        <Select
          options={routes.map((route) => ({
            value: route.id,
            label: route.route_name,
          }))}
          value={routeId}
          onChange={handleRouteChange}
          type="white"
          id="route"
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Store name" error={errors?.store_name?.message}>
        <Input
          type="text"
          id="store_name"
          disabled={isWorking}
          {...register("store_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Phone no." error={errors?.owner_phone_no?.message}>
        <Input
          type="number"
          id="owner_phone_no"
          defaultValue="0000"
          disabled={isWorking}
          {...register("owner_phone_no", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Address" error={errors?.store_address?.message}>
        <Textarea
          type="text"
          id="store_address"
          defaultValue="xxxx"
          disabled={isWorking}
          {...register("store_address", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Owner name" error={errors?.owner_name?.message}>
        <Input
          type="text"
          id="owner_name"
          defaultValue={null}
          {...register("owner_name")}
        />
      </FormRow>

      <FormRow label="Open hours" error={errors?.open_hours?.message}>
        <Input
          type="text"
          id="open_hours"
          defaultValue={null}
          {...register("open_hours")}
        />
      </FormRow>

      <FormRow>
        <Label id="store_picture">Store pic</Label>
        <FileInput
          id="store_picture"
          accept="image/*"
          {...register("store_picture")}
        />
      </FormRow>

      <FormRow>
        <Label id="owner_picture">Owner pic</Label>
        <FileInput
          id="owner_picture"
          accept="image/*"
          {...register("owner_picture")}
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
          <Button>Add</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  ) : (
    <Heading as="h4">Getting the location data </Heading>
  );
}

export default CreateCustomerForm;
