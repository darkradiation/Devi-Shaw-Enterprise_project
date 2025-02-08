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
              { value: "order_date-desc", label: "order date (d)" },
              { value: "order_date-asc", label: "order date (a)" },
              { value: "bill_value-asc", label: "bill price (a)" },
              { value: "bill_value-desc", label: "bill price (d)" },
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
              { value: "all", label: "all status" },
              { value: "paid", label: "paid" },
              { value: "due", label: "due" },
              { value: "pending", label: "pending" },
            ]}
          />
        </Menus.HList>
      </Menus.Menu>
    </>
  );
}

export default OrderTableOperations;
