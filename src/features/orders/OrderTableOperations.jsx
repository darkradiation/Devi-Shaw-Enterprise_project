import { useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import Searchbar from "../../ui/Searchbar";
import FilterBy from "../../ui/FilterBy";
import SortBy from "../../ui/SortBy";
import Menus from "../../ui/Menus";
import ButtonIcon from "../../ui/ButtonIcon";

function OrderTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Searchbar />
      <Menus.Menu>
        <Menus.Toggle id="ordersSortFilter" icon={<FaFilter />} />
        <Menus.HList id="ordersSortFilter">
          <ButtonIcon onClick={() => setSearchParams({})}>
            <GrPowerReset />
          </ButtonIcon>
          <SortBy
            options={[
              { value: "order_date-desc", label: "Order date (desc)" },
              { value: "order_date-asc", label: "Order date (asc)" },
              { value: "bill_value-asc", label: "Bill price (asc)" },
              { value: "bill_value-desc", label: "Bill price (desc)" },
            ]}
          />
          <FilterBy
            filterField="filterByDay"
            options={[
              { value: "all", label: "all days" },
              { value: "1", label: "monday" },
              { value: "2", label: "tuesday" },
              { value: "3", label: "wednesday" },
              { value: "4", label: "thursday" },
              { value: "5", label: "friday" },
              { value: "6", label: "saturday" },
              { value: "7", label: "sunday" },
            ]}
          />
          <FilterBy
            filterField="status"
            options={[
              { value: "all", label: "All" },
              { value: "paid", label: "Paid" },
              { value: "due", label: "Due" },
              { value: "pending", label: "Pending" },
            ]}
          />
        </Menus.HList>
      </Menus.Menu>
    </>
  );
}

export default OrderTableOperations;
