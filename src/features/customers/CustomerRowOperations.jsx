import ButtonIcon from "../../ui/ButtonIcon";
import { MdCall } from "react-icons/md";
import { ImLocation } from "react-icons/im";

function CustomerRowOperations({ store_address, store_geoLink }) {
  function handleLocate() {
    console.log(store_address, store_geoLink);
    window.open(
      store_geoLink
        ? store_geoLink
        : `https://www.google.com/maps/search/?api=1&query=${store_address}`
      // `https://www.google.com/maps/search/?api=1&query=${store_name}${store_address}`
    );
  }
  return (
    <div>
      <ButtonIcon size="sm" onClick={() => {}}>
        <MdCall />
      </ButtonIcon>
      <ButtonIcon size="sm" onClick={handleLocate}>
        <ImLocation />
      </ButtonIcon>
    </div>
  );
}

export default CustomerRowOperations;
