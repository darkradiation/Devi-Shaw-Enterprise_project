import { useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import FilterBy from "../../ui/FilterBy";
import SortBy from "../../ui/SortBy";
import Menus from "../../ui/Menus";
import ButtonIcon from "../../ui/ButtonIcon";
import { useSuppliers } from "../suppliers/useSuppliers";

function StockHistoryTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch suppliers using the useSuppliers hook
  const { isLoadingSuppliers, suppliers } = useSuppliers();

  // Dynamically create supplier options for the FilterBy component
  const supplierOptions = [
    { value: "all", label: "All Suppliers" }, // Default option
    ...(suppliers?.map((supplier) => ({
      value: supplier.id.toString(), // Ensure value is a string
      label: supplier.supplier_name,
    })) || []),
  ];

  return (
    <>
      <Menus.Menu>
        <Menus.Toggle id="stockHistorySortFilter" icon={<FaFilter />} />
        <Menus.HList id="stockHistorySortFilter">
          <ButtonIcon onClick={() => setSearchParams({})}>
            <GrPowerReset />
          </ButtonIcon>

          <SortBy
            options={[
              { value: "delivery_date-desc", label: "Date (newest)" },
              { value: "delivery_date-asc", label: "Date (oldest)" },
              { value: "bill_value-desc", label: "Bill (high → low)" },
              { value: "bill_value-asc", label: "Bill (low → high)" },
            ]}
          />

          <FilterBy
            filterField="supplier"
            options={supplierOptions} // Use dynamically loaded supplier options
            disabled={isLoadingSuppliers} // Disable the filter while loading
          />
        </Menus.HList>
      </Menus.Menu>
    </>
  );
}

export default StockHistoryTableOperations;
