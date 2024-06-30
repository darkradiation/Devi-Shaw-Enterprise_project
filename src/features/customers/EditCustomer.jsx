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
import { useUpdateCustomer } from "./useUpdateCustomer";
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
  "https://btudmhxamelonucdbupr.supabase.co/storage/v1/object/public/customer_store_pictures/0.38892795734812036-default_store_image.jpg";
const default_owner_pic =
  "https://btudmhxamelonucdbupr.supabase.co/storage/v1/object/public/customer_owner_pictures/0.034979561436823126-default_store_owner_image.jpeg";

function EditCustomer({ customer, onCloseModal }) {
  const {
    id,
    store_name,
    owner_name,
    owner_phone_no,
    store_address,
    open_hours,
    store_picture,
    owner_picture,
    route_id,

    // created_at,
    // store_geolocation,
    // store_geoLink,
    // distance,
    // coords,
  } = customer;

  const defaultStoreName = store_name;
  const defaultOwnerName = owner_name;
  const defaultOwnerPhoneNo = owner_phone_no;
  const defaultStoreAddress = store_address;
  const defaultOpenHours = open_hours;
  const defaultStorePicture = store_picture ? store_picture : default_store_pic;
  const defaultOwnerPicture = owner_picture ? owner_picture : default_owner_pic;
  const defaultRouteId = route_id ? route_id : 1;

  const [routeId, setRouteId] = useState(defaultRouteId);
  const { isLoadingRoutes, routes } = useRoutes();
  const { updateCustomer, isUpdatingCustomer } = useUpdateCustomer();
  const { register, handleSubmit, reset, formState } = useForm();

  const isWorking = isLoadingRoutes || isUpdatingCustomer;
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
    const storePic =
      typeof store_picture === "string"
        ? store_picture
        : store_picture.length === 0
        ? defaultStorePicture
        : store_picture[0];
    const ownerPic =
      typeof owner_picture === "string"
        ? owner_picture
        : owner_picture.length === 0
        ? defaultOwnerPicture
        : owner_picture[0];

    if (
      store_name === defaultStoreName &&
      owner_phone_no === defaultOwnerPhoneNo &&
      store_address === defaultStoreAddress &&
      owner_name === defaultOwnerName &&
      open_hours === defaultOpenHours &&
      storePic === defaultStorePicture &&
      ownerPic === defaultOwnerPicture
    ) {
      onCloseModal();
      return;
    }

    const updated_customer = {
      store_name,
      owner_name,
      owner_phone_no,
      store_address,
      open_hours,
      store_picture: storePic,
      owner_picture: ownerPic,
      route_id: routeId,

      //   id,
      //   distance,
      //   coords,
      //   created_at,
      //   store_geolocation,
      //   store_geoLink,
    };

    delete updated_customer["routes"];

    console.log(updated_customer);
    updateCustomer(
      { id, updated_customer },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      }
    );
  }

  function onError(errors) {
    console.error(errors);
  }
  function handleCloseForm() {
    reset();
    onCloseModal();
  }
  return (
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
          defaultValue={defaultStoreName}
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
          defaultValue={defaultOwnerPhoneNo}
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
          defaultValue={defaultStoreAddress}
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
          defaultValue={defaultOwnerName}
          {...register("owner_name")}
        />
      </FormRow>

      <FormRow label="Open hours" error={errors?.open_hours?.message}>
        <Input
          type="text"
          id="open_hours"
          defaultValue={defaultOpenHours}
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
          <Button
            variation="secondary"
            type="reset"
            onClick={() => handleCloseForm()}
          >
            Cancel
          </Button>
          <Button>Update</Button>
        </StackedButtons>
      </FormRow>
    </Form>
  );
}

export default EditCustomer;
