import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function FilterBy({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterValue =
    searchParams.get(filterField) || options.at(0).value;

  function handleChange(e) {
    searchParams.set(filterField, e.target.value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentFilterValue}
      type="white"
    />
  );
}

export default FilterBy;
