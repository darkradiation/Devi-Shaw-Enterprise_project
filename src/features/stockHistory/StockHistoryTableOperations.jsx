import { useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import FilterBy from "../../ui/FilterBy";
import SortBy from "../../ui/SortBy";
import Menus from "../../ui/Menus";
import ButtonIcon from "../../ui/ButtonIcon";

function StockHistoryTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

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
            options={[
              { value: "all", label: "All Suppliers" },
              { value: "1", label: "Supplier 1" },
              { value: "2", label: "Supplier 2" },
              { value: "3", label: "Supplier 3" },
              // Note: In real implementation, these would be dynamically loaded from the suppliers table
            ]}
          />
        </Menus.HList>
      </Menus.Menu>
    </>
  );
}

export default StockHistoryTableOperations;
