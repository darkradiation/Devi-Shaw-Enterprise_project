import { FaFilter } from "react-icons/fa";
import Searchbar from "../../ui/Searchbar";
import SortBy from "../../ui/SortBy";
import Menus from "../../ui/Menus";
import FilterByDay from "../../ui/FilterByDay";
import ButtonIcon from "../../ui/ButtonIcon";
import { GrPowerReset } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";

function DailyCustomerTableOperations() {
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
        </Menus.HList>
      </Menus.Menu>
    </>
  );
}

export default DailyCustomerTableOperations;
