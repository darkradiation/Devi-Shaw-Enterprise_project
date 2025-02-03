import { RiUserAddLine } from "react-icons/ri";
import ButtonIcon from "../ui/ButtonIcon";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import SupplierTable from "../features/suppliers/SupplierTable";
import CreateSupplierForm from "../features/suppliers/CreateSupplierForm";

function Suppliers() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Suppliers</Heading>
        <Modal>
          <Modal.Open opens="addSupplier">
            <ButtonIcon>
              <RiUserAddLine />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Window name="addSupplier">
            <CreateSupplierForm />
          </Modal.Window>
        </Modal>
      </Row>

      <Row>
        <SupplierTable />
      </Row>
    </Menus>
  );
}

export default Suppliers;
