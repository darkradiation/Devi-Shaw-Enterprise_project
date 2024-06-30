import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CustomerTable from "../features/customers/CustomerTable";
import CustomerTableOperations from "../features/customers/CustomerTableOperations";
import Modal from "../ui/Modal";
import CreateCustomerForm from "../features/customers/CreateCustomerForm";
import ButtonIcon from "../ui/ButtonIcon";
import Menus from "../ui/Menus";
import { RiUserAddLine } from "react-icons/ri";

function Customers() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Customers</Heading>
        <Modal>
          <Modal.Open opens="addCustomer">
            <ButtonIcon>
              <RiUserAddLine />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Window name="addCustomer">
            <CreateCustomerForm />
          </Modal.Window>
        </Modal>
      </Row>

      <Row type="horizontal">
        <CustomerTableOperations />
      </Row>

      <Row>
        <CustomerTable />
      </Row>
    </Menus>
  );
}

export default Customers;
