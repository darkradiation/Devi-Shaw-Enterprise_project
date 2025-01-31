import { FaFilter } from "react-icons/fa";
import Searchbar from "../../ui/Searchbar";
import SortBy from "../../ui/SortBy";
import Menus from "../../ui/Menus";
import FilterBy from "../../ui/FilterBy";
import ButtonIcon from "../../ui/ButtonIcon";
import { GrPowerReset } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";

function CustomerTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Searchbar />
      <Menus.Menu>
        <Menus.Toggle id="customersSortFilter" icon={<FaFilter />} />
        <Menus.HList id="customersSortFilter">
          <ButtonIcon onClick={() => setSearchParams({})}>
            <GrPowerReset />
          </ButtonIcon>
          <SortBy
            options={[
              { value: "id-asc", label: "ID (asc)" },
              { value: "id-desc", label: "ID (desc)" },
              { value: "store_name-asc", label: "Alpha (asc)" },
              { value: "store_name-desc", label: "Alpha (desc)" },
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
        </Menus.HList>
      </Menus.Menu>
    </>
  );
}

export default CustomerTableOperations;
