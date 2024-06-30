import Searchbar from "../../ui/Searchbar";
import SortBy from "../../ui/SortBy";

function CustomerTableOperations() {
  return (
    <>
      <Searchbar />

      <SortBy
        options={[
          { value: "id-asc", label: "ID (asc)" },
          { value: "id-desc", label: "ID (desc)" },
          { value: "store_name-asc", label: "Alpha (asc)" },
          { value: "store_name-desc", label: "Alpha (desc)" },
        ]}
      />
    </>
  );
}

export default CustomerTableOperations;
