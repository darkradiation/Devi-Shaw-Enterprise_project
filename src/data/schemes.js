import { add } from "date-fns";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

const schemes_near = [
  {
    created_at: fromToday(0, true),
    item_id: 1,
    free_1pt: {
      free_items: [
        {
          free_item_id: "1",
          free_item_name: "500ml",
          free_item_quantity: "1",
          free_value_buying_price: "4.42",
          free_value_selling_price: "10",
        },
      ],
      buying_price: "106", // cost price of 1pt 500ml
      scheme_level: "1",
      base_selling_price: "130", // base selling price of 1pt 500ml
      total_free_value_buying_price: "4.42", // cost price of 1pc 500ml
      total_free_value_selling_price: "10", // selling price of 1pc 500ml
      effective_buying_price_customer: "120",
      effective_selling_price_enterprise: "125.58", // base selling - free value buying price
      profit: "19.58",
      effective_buying_price_customer_per_pt: "120",
      effective_selling_price_enterprise_per_pt: "125.58",
      profit_per_pt: "19.58",
    },
    free_2pt: {
      free_items: [
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: "1",
          free_value_buying_price: "6.67",
          free_value_selling_price: "20",
        },
      ],
      buying_price: "212",
      scheme_level: "2",
      base_selling_price: "260",
      total_free_value_buying_price: "6.67",
      total_free_value_selling_price: "20",
      effective_buying_price_customer: "240",
      effective_selling_price_enterprise: "253.33",
      profit: "41.33",
      effective_buying_price_customer_per_pt: "120",
      effective_selling_price_enterprise_per_pt: "126.67",
      profit_per_pt: "20.67",
    },
    free_3pt: {
      free_items: [
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: "2",
          free_value_buying_price: "13.34",
          free_value_selling_price: "40",
        },
      ],
      buying_price: "318",
      scheme_level: "3",
      base_selling_price: "390",
      total_free_value_buying_price: "13.34",
      total_free_value_selling_price: "40",
      effective_buying_price_customer: "350",
      effective_selling_price_enterprise: "376.66",
      profit: "58.66",
      effective_buying_price_customer_per_pt: "116.67",
      effective_selling_price_enterprise_per_pt: "125.55",
      profit_per_pt: "19.55",
    },
    free_4pt: {
      free_items: [
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: "3",
          free_value_buying_price: "20.01",
          free_value_selling_price: "60",
        },
      ],
      buying_price: "424",
      scheme_level: "4",
      base_selling_price: "520",
      total_free_value_buying_price: "20.01",
      total_free_value_selling_price: "60",
      effective_buying_price_customer: "460",
      effective_selling_price_enterprise: "499.99",
      profit: "75.99",
      effective_buying_price_customer_per_pt: "115",
      effective_selling_price_enterprise_per_pt: "125",
      profit_per_pt: "19",
    },
    free_5pt: {
      free_items: [
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: "4",
          free_value_buying_price: "26.68",
          free_value_selling_price: "80",
        },
      ],
      buying_price: "530",
      scheme_level: "5",
      base_selling_price: "650",
      total_free_value_buying_price: "26.68",
      total_free_value_selling_price: "80",
      effective_buying_price_customer: "570",
      effective_selling_price_enterprise: "623.32",
      profit: "93.32",
      effective_buying_price_customer_per_pt: "114",
      effective_selling_price_enterprise_per_pt: "124.6",
      profit_per_pt: "18.66",
    },
  },
  {
    created_at: fromToday(0, true),
    item_id: 2,
    free_1pt: "",
    free_2pt: {
      free_items: [
        {
          free_item_id: "1",
          free_item_name: "500ml",
          free_item_quantity: "1",
          free_value_buying_price: "4.42",
          free_value_selling_price: "10",
        },
      ],
      buying_price: "160",
      scheme_level: "2",
      base_selling_price: "200",
      total_free_value_buying_price: "4.42",
      total_free_value_selling_price: "10",
      effective_buying_price_customer: "190",
      effective_selling_price_enterprise: "195.58",
      profit: "35.58",
      effective_buying_price_customer_per_pt: "95",
      effective_selling_price_enterprise_per_pt: "97.79",
      profit_per_pt: "17.79",
    },
    free_3pt: {
      free_items: [
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: "2",
          free_value_buying_price: "13.34",
          free_value_selling_price: "40",
        },
      ],
      buying_price: "318",
      scheme_level: "3",
      base_selling_price: "390",
      total_free_value_buying_price: "13.34",
      total_free_value_selling_price: "40",
      effective_buying_price_customer: "350",
      effective_selling_price_enterprise: "376.66",
      profit: "58.66",
      effective_buying_price_customer_per_pt: "116.67",
      effective_selling_price_enterprise_per_pt: "125.55",
      profit_per_pt: "19.55",
    },
    free_4pt: {
      free_items: [
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: "3",
          free_value_buying_price: "20.01",
          free_value_selling_price: "60",
        },
      ],
      buying_price: "424",
      scheme_level: "4",
      base_selling_price: "520",
      total_free_value_buying_price: "20.01",
      total_free_value_selling_price: "60",
      effective_buying_price_customer: "460",
      effective_selling_price_enterprise: "499.99",
      profit: "75.99",
      effective_buying_price_customer_per_pt: "115",
      effective_selling_price_enterprise_per_pt: "125",
      profit_per_pt: "19",
    },
    free_5pt: {
      free_items: [
        {
          free_item_id: "2",
          free_item_name: "1ltr",
          free_item_quantity: "4",
          free_value_buying_price: "26.68",
          free_value_selling_price: "80",
        },
      ],
      buying_price: "530",
      scheme_level: "5",
      base_selling_price: "650",
      total_free_value_buying_price: "26.68",
      total_free_value_selling_price: "80",
      effective_buying_price_customer: "570",
      effective_selling_price_enterprise: "623.32",
      profit: "93.32",
      effective_buying_price_customer_per_pt: "114",
      effective_selling_price_enterprise_per_pt: "124.6",
      profit_per_pt: "18.66",
    },
  },
];
