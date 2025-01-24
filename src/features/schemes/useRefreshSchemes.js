// hooks/useRefreshSchemes.js
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  updateScheme1,
  updateScheme2,
  updateScheme3,
} from "../../services/apiSchemes";
import toast from "react-hot-toast";

import { getStock } from "../../services/apiStock";
import {
  getSchemes1,
  getSchemes2,
  getSchemes3,
} from "../../services/apiSchemes";

export function useRefreshSchemes() {
  const queryClient = useQueryClient();

  // Mutation for bulk updating schemes
  const { mutate: refreshSchemes, isLoading: isRefreshing } = useMutation({
    mutationFn: async () => {
      // Fetch fresh stock data directly
      const stock = await getStock();

      // Fetch fresh schemes data directly
      const schemes_1 = await getSchemes1();
      const schemes_2 = await getSchemes2();
      const schemes_3 = await getSchemes3();

      // Recalculate all schemes for each table
      const updatedSchemes1 = schemes_1.map((scheme) =>
        recalculateSchemeValues(scheme, stock)
      );
      const updatedSchemes2 = schemes_2.map((scheme) =>
        recalculateSchemeValues(scheme, stock)
      );
      const updatedSchemes3 = schemes_3.map((scheme) =>
        recalculateSchemeValues(scheme, stock)
      );

      // Prepare all update promises
      const updates = [];
      for (const scheme of updatedSchemes1) {
        updates.push(
          updateScheme1({ item_id: scheme.item_id, new_scheme: scheme })
        );
      }
      for (const scheme of updatedSchemes2) {
        updates.push(
          updateScheme2({ item_id: scheme.item_id, new_scheme: scheme })
        );
      }
      for (const scheme of updatedSchemes3) {
        updates.push(
          updateScheme3({ item_id: scheme.item_id, new_scheme: scheme })
        );
      }

      await Promise.all(updates);
    },
    onSuccess: () => {
      toast.success("Schemes refreshed successfully");
      queryClient.invalidateQueries({
        queryKey: ["schemes_1", "schemes_2", "schemes_3"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { refreshSchemes, isRefreshing };
}

// Helper function to recalculate values
function recalculateSchemeValues(scheme, stock) {
  const { stock: _, ...schemeWithoutStock } = scheme;
  const updatedScheme = { ...schemeWithoutStock };

  const schemeItem = stock.find((item) => item.id === updatedScheme.item_id);
  if (!schemeItem) return updatedScheme;

  const freeFields = [
    "free_1pt",
    "free_2pt",
    "free_3pt",
    "free_4pt",
    "free_5pt",
    "free_6pt",
    "free_7pt",
    "free_8pt",
    "free_9pt",
    "free_10pt",
    "free_11pt",
    "free_12pt",
  ];

  freeFields.forEach((field) => {
    const freeData = updatedScheme[field];
    if (!freeData) return;

    const schemeLevel = freeData.scheme_level;

    // Recalculate core prices from current stock data
    const buying_price = schemeLevel * schemeItem.buying_price_per_pt;
    const base_selling_price =
      schemeLevel * schemeItem.base_selling_price_per_pt;
    const total_discount = freeData.discount_per_pt * schemeLevel;
    const discounted_selling_price = base_selling_price - total_discount;

    // Recalculate free items' values
    let total_free_value_mrp_price = 0;
    let total_free_value_buying_price = 0;

    freeData.free_items.forEach((freeItem) => {
      const stockItem = stock.find(
        (item) => item.id === Number(freeItem.free_item_id)
      );
      if (stockItem) {
        freeItem.free_value_mrp_price = Number(
          (freeItem.free_item_quantity * stockItem.mrp_per_pc).toFixed(2)
        );
        freeItem.free_value_buying_price = Number(
          (freeItem.free_item_quantity * stockItem.buying_price_per_pc).toFixed(
            2
          )
        );
        total_free_value_mrp_price += freeItem.free_value_mrp_price;
        total_free_value_buying_price += freeItem.free_value_buying_price;
      }
    });

    // Update all financial fields
    freeData.buying_price = Number(buying_price.toFixed(2));
    freeData.base_selling_price = Number(base_selling_price.toFixed(2));
    freeData.buying_price_per_pt = Number(
      schemeItem.buying_price_per_pt.toFixed(2)
    );
    freeData.base_selling_price_per_pt = Number(
      schemeItem.base_selling_price_per_pt.toFixed(2)
    );
    freeData.discounted_selling_price = Number(
      discounted_selling_price.toFixed(2)
    );
    freeData.total_free_value_mrp_price = Number(
      total_free_value_mrp_price.toFixed(2)
    );
    freeData.total_free_value_buying_price = Number(
      total_free_value_buying_price.toFixed(2)
    );
    freeData.effective_buying_price_customer = Number(
      (discounted_selling_price - total_free_value_mrp_price).toFixed(2)
    );
    freeData.effective_selling_price_enterprise = Number(
      (discounted_selling_price - total_free_value_buying_price).toFixed(2)
    );
    freeData.profit = Number(
      (freeData.effective_selling_price_enterprise - buying_price).toFixed(2)
    );
    freeData.profit_per_pt = Number((freeData.profit / schemeLevel).toFixed(2));
    freeData.effective_buying_price_customer_per_pt = Number(
      (freeData.effective_buying_price_customer / schemeLevel).toFixed(2)
    );
    freeData.effective_selling_price_enterprise_per_pt = Number(
      (freeData.effective_selling_price_enterprise / schemeLevel).toFixed(2)
    );

    updatedScheme[field] = freeData;
  });

  return updatedScheme;
}
