/* eslint-disable no-unused-vars */

export const orders = [
  {
    id: 1,
    customer_id: 1,
    order_date: "2024-04-28T10:00:00",
    delivery_date: "2024-04-28T18:00:00",
    payment_date: "2024-04-28T19:00:00",
    is_delivered: true,
    is_paid: true,
    bill_value: 600,
    order_items: [
      {
        item_id: 16,
        item_name: "Item 16",
        buying_price: 80,
        item_quantity: 10,
        selling_price: 160,
        free_items: [
          {
            item_id: 18,
            item_name: "Free Item 6",
            buying_price: 40,
            item_quantity: 3,
            selling_price: 80,
          },
        ],
        discount: 30,
      },
      {
        item_id: 17,
        item_name: "Item 17",
        buying_price: 90,
        item_quantity: 6,
        selling_price: 180,
        free_items: [
          {
            item_id: 18,
            item_name: "Free Item 6",
            buying_price: 40,
            item_quantity: 3,
            selling_price: 80,
          },
        ],
        discount: 30,
      },
    ],
    extra_costs: 30,
    effective_total_buying_price: 540,
    effective_total_selling_price: 1140,
    profit: 600,
    total_buying_price_order_items: 500,
    total_selling_price_order_items: 1420,
    total_buying_price_free_items: 180,
    total_discount: 80,
  },
  {
    id: 2,
    customer_id: 1,
    order_date: "2024-04-29T11:00:00",
    delivery_date: "2024-04-29T19:00:00",
    payment_date: "2024-04-29T20:00:00",
    is_delivered: true,
    is_paid: false,
    bill_value: 750,
    order_items: [
      {
        item_id: 19,
        item_name: "Item 19",
        buying_price: 100,
        item_quantity: 5,
        selling_price: 200,
        free_items: [
          {
            item_id: 20,
            item_name: "Free Item 7",
            buying_price: 50,
            item_quantity: 2,
            selling_price: 100,
          },
        ],
        discount: 40,
      },
      {
        item_id: 21,
        item_name: "Item 21",
        buying_price: 110,
        item_quantity: 7,
        selling_price: 220,
        free_items: [
          {
            item_id: 20,
            item_name: "Free Item 7",
            buying_price: 50,
            item_quantity: 3,
            selling_price: 100,
          },
        ],
        discount: 40,
      },
    ],
    extra_costs: 40,
    effective_total_buying_price: 680,
    effective_total_selling_price: 1420,
    profit: 740,
    total_buying_price_order_items: 500,
    total_selling_price_order_items: 1420,
    total_buying_price_free_items: 180,
    total_discount: 80,
  },
  {
    id: 3,
    customer_id: 1,
    order_date: "2024-04-30T12:00:00",
    delivery_date: "2024-04-30T20:00:00",
    payment_date: "2024-04-30T21:00:00",
    is_delivered: true,
    is_paid: false,
    bill_value: 900,
    order_items: [
      {
        item_id: 22,
        item_name: "Item 22",
        buying_price: 120,
        item_quantity: 8,
        selling_price: 240,
        free_items: [
          {
            item_id: 23,
            item_name: "Free Item 8",
            buying_price: 60,
            item_quantity: 4,
            selling_price: 120,
          },
        ],
        discount: 50,
      },
      {
        item_id: 24,
        item_name: "Item 24",
        buying_price: 130,
        item_quantity: 9,
        selling_price: 260,
        free_items: [
          {
            item_id: 23,
            item_name: "Free Item 8",
            buying_price: 60,
            item_quantity: 5,
            selling_price: 120,
          },
        ],
        discount: 50,
      },
    ],
    extra_costs: 50,
    effective_total_buying_price: 820,
    effective_total_selling_price: 1660,
    profit: 840,
    total_buying_price_order_items: 500,
    total_selling_price_order_items: 1420,
    total_buying_price_free_items: 180,
    total_discount: 80,
  },
  {
    id: 4,
    customer_id: 1,
    order_date: "2024-05-01T13:00:00",
    delivery_date: "2024-05-01T21:00:00",
    payment_date: "2024-05-01T22:00:00",
    is_delivered: false,
    is_paid: false,
    bill_value: 1050,
    order_items: [
      {
        item_id: 25,
        item_name: "Item 25",
        buying_price: 140,
        item_quantity: 10,
        selling_price: 280,
        free_items: [
          {
            item_id: 26,
            item_name: "Free Item 9",
            buying_price: 70,
            item_quantity: 5,
            selling_price: 140,
          },
        ],
        discount: 60,
      },
      {
        item_id: 27,
        item_name: "Item 27",
        buying_price: 150,
        item_quantity: 11,
        selling_price: 300,
        free_items: [
          {
            item_id: 26,
            item_name: "Free Item 9",
            buying_price: 70,
            item_quantity: 6,
            selling_price: 140,
          },
        ],
        discount: 60,
      },
    ],
    extra_costs: 60,
    effective_total_buying_price: 960,
    effective_total_selling_price: 1900,
    profit: 940,
    total_buying_price_order_items: 500,
    total_selling_price_order_items: 1420,
    total_buying_price_free_items: 180,
    total_discount: 80,
  },
  {
    id: 5,
    customer_id: 1,
    order_date: "2024-05-02T14:00:00",
    delivery_date: "2024-05-02T22:00:00",
    payment_date: "2024-05-02T23:00:00",
    is_delivered: false,
    is_paid: false,
    bill_value: 1200,
    order_items: [
      {
        item_id: 28,
        item_name: "Item 28",
        buying_price: 160,
        item_quantity: 12,
        selling_price: 320,
        free_items: [
          {
            item_id: 29,
            item_name: "Free Item 10",
            buying_price: 80,
            item_quantity: 6,
            selling_price: 160,
          },
        ],
        discount: 70,
      },
      {
        item_id: 30,
        item_name: "Item 30",
        buying_price: 170,
        item_quantity: 13,
        selling_price: 340,
        free_items: [
          {
            item_id: 29,
            item_name: "Free Item 10",
            buying_price: 80,
            item_quantity: 7,
            selling_price: 160,
          },
        ],
        discount: 70,
      },
    ],
    extra_costs: 70,
    effective_total_buying_price: 1100,
    effective_total_selling_price: 2140,
    profit: 1040,
    total_buying_price_order_items: 500,
    total_selling_price_order_items: 1420,
    total_buying_price_free_items: 180,
    total_discount: 80,
  },
];
