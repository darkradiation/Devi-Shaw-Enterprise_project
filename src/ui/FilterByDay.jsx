import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function FilterByDay({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSelectValue = searchParams.get("filterByDay") || "";

  function handleChange(e) {
    searchParams.set("filterByDay", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentSelectValue}
      type="white"
    />
  );
}

export default FilterByDay;
