import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";

import { useStock } from "../stock/useStock";
import { useUpdateScheme1 } from "./useUpdateScheme1";
import { useUpdateScheme2 } from "./useUpdateScheme2";
import { useSearchParams } from "react-router-dom";
import { useUpdateScheme3 } from "./useUpdateScheme3";

const StackedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function EditScheme({ onCloseModal, scheme, scheme_item_id }) {
  const { free_items, scheme_level, discount_per_pt } = scheme;
  const [searchParams] = useSearchParams();
  const scheme_type = searchParams.get("scheme_type") || "schemes_1";

  const defaultCategory =
    scheme_type === "schemes_1" ? "1" : scheme_type === "schemes_2" ? "2" : "3";
  const defaultSchemeItemId = scheme_item_id;
  const defaultSchemeLevel = scheme_level;
  const defaultDiscountPerPt = discount_per_pt;
  const defaultFree500mlQuantity = free_items[0].free_item_quantity;
  const defaultFree1ltrQuantity = free_items[1].free_item_quantity;

  const [schemeItemId, setSchemeItemId] = useState(defaultSchemeItemId);
  const [category, setCategory] = useState(defaultCategory);

  const { isLoadingStock, stock } = useStock();
  const { isUpdatingScheme1, handleUpdateScheme1 } = useUpdateScheme1();
  const { isUpdatingScheme2, handleUpdateScheme2 } = useUpdateScheme2();
  const { isUpdatingScheme3, handleUpdateScheme3 } = useUpdateScheme3();

  const { register, handleSubmit, reset, formState } = useForm();

  const isWorking =
    isLoadingStock ||
    isUpdatingScheme1 ||
    isUpdatingScheme2 ||
    isUpdatingScheme3;
  if (isWorking) return <Spinner />;

  const { errors } = formState;

  function handleSchemeItemChange(event) {
    setSchemeItemId(event.target.value);
  }
  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function onSubmit({
    scheme_level,
    discount,
    free_500ml_quantity,
    free_1ltr_quantity,
  }) {
    if (
      schemeItemId === defaultSchemeItemId &&
      category === defaultCategory &&
      scheme_level === defaultSchemeLevel &&
      discount === defaultDiscountPerPt &&
      free_500ml_quantity === defaultFree500mlQuantity &&
      free_1ltr_quantity === defaultFree1ltrQuantity
    ) {
      onCloseModal();
      console.log("No change done.");
      return;
    }

    const schemeItemIndex = stock.findIndex(
      (stock_item) => stock_item.id === Number(schemeItemId)
    );

    const scheme_item = stock[schemeItemIndex];
    const item_500ml = stock[0];
    const item_1ltr = stock[1];

    const free_value_buying_price_500ml =
      Number(free_500ml_quantity) * item_500ml.buying_price_per_pc;
    const free_value_mrp_price_500ml =
      Number(free_500ml_quantity) * item_500ml.mrp_per_pc;
    const free_value_buying_price_1ltr =
      Number(free_1ltr_quantity) * item_1ltr.buying_price_per_pc;
    const free_value_mrp_price_1ltr =
      Number(free_1ltr_quantity) * item_1ltr.mrp_per_pc;

    const total_free_value_buying_price =
      free_value_buying_price_1ltr + free_value_buying_price_500ml;
    const total_free_value_mrp_price =
      free_value_mrp_price_500ml + free_value_mrp_price_1ltr;

    const buying_price = Number(scheme_level) * scheme_item.buying_price_per_pt;
    const base_selling_price =
      Number(scheme_level) * scheme_item.base_selling_price_per_pt;
    const total_discount = Number(scheme_level) * Number(discount);
    const discounted_selling_price = base_selling_price - total_discount;

    const effective_buying_price_customer =
      discounted_selling_price - total_free_value_mrp_price;
    const effective_selling_price_enterprise =
      discounted_selling_price - total_free_value_buying_price;
    const profit = (effective_selling_price_enterprise - buying_price).toFixed(
      2
    );
    const profit_per_pt = (Number(profit) / Number(scheme_level)).toFixed(2);

    const new_scheme = {
      free_items: [
        free_500ml_quantity && {
          free_item_id: "1",
          free_item_name: "500ml",
          free_item_quantity: Number(free_500ml_quantity),
          free_value_buying_price: free_value_buying_price_500ml,
          free_value_mrp_price: free_value_mrp_price_500ml,
        },
        free_1ltr_quantity && {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: Number(free_1ltr_quantity),
          free_value_buying_price: free_value_buying_price_1ltr,
          free_value_mrp_price: free_value_mrp_price_1ltr,
        },
      ],
      buying_price,
      scheme_level: Number(scheme_level),
      base_selling_price,
      discount: total_discount,
      discounted_selling_price,
      total_free_value_buying_price,
      total_free_value_mrp_price,
      effective_buying_price_customer,
      effective_selling_price_enterprise,
      profit: Number(profit),
      buying_price_per_pt: scheme_item.buying_price_per_pt,
      effective_buying_price_customer_per_pt: (
        effective_buying_price_customer / Number(scheme_level)
      ).toFixed(2),
      effective_selling_price_enterprise_per_pt: (
        effective_selling_price_enterprise / Number(scheme_level)
      ).toFixed(2),
      discount_per_pt: Number(discount),
      profit_per_pt: Number(profit_per_pt),
    };
    console.log(new_scheme);

    if (category === "1") {
      handleUpdateScheme1({ schemeItemId, scheme_level, new_scheme });
    } else if (category === "2") {
      handleUpdateScheme2({ schemeItemId, scheme_level, new_scheme });
    } else {
      handleUpdateScheme3({ schemeItemId, scheme_level, new_scheme });
    }

    onCloseModal();
  }
  function onError(errors) {
    console.log(errors);
  }
  function handleCloseForm() {
    reset();
    onCloseModal();
  }

  function getSP(id) {
    const schemeItemIndex = stock.findIndex(
      (stock_item) => stock_item.id === Number(id)
    );
    const scheme_item = stock[schemeItemIndex];
    return scheme_item.base_selling_price_per_pt;
  }

  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        // type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow>
          <Heading as="h4">Create new scheme</Heading>
        </FormRow>

        <FormRow label="category" error={errors?.category?.message}>
          <Select
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            value={category}
            onChange={handleCategoryChange}
            type="white"
            id="category"
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="scheme item" error={errors?.item_id?.message}>
          <Select
            options={stock.map((item) => ({
              value: item.id,
              label: item.item_name,
            }))}
            value={schemeItemId}
            onChange={handleSchemeItemChange}
            type="white"
            id="item_id"
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="selling price">
          <Input
            type="number"
            id="selling_price"
            value={getSP(schemeItemId)}
            disabled={true}
          />
        </FormRow>

        <FormRow label="scheme level" error={errors?.scheme_level?.message}>
          <Input
            type="number"
            id="scheme_level"
            defaultValue={defaultSchemeLevel}
            disabled={isWorking}
            {...register("scheme_level", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Scheme level must be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="discount/pt." error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            defaultValue={defaultDiscountPerPt}
            disabled={isWorking}
            {...register("discount", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow
          label="free 500ml quantity"
          error={errors?.free_500ml_quantity?.message}
        >
          <Input
            type="number"
            id="free_500ml_quantity"
            defaultValue={defaultFree500mlQuantity}
            disabled={isWorking}
            {...register("free_500ml_quantity", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow
          label="free 1ltr quantity"
          error={errors?.free_1ltr_quantity?.message}
        >
          <Input
            type="number"
            id="free_1ltr_quantity"
            defaultValue={defaultFree1ltrQuantity}
            disabled={isWorking}
            {...register("free_1ltr_quantity", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <StackedButtons>
            <Button
              variation="secondary"
              type="reset"
              onClick={() => handleCloseForm()}
            >
              Cancel
            </Button>
            <Button disabled={isWorking}>Edit scheme</Button>
          </StackedButtons>
        </FormRow>
      </Form>
    </div>
  );
}

export default EditScheme;
