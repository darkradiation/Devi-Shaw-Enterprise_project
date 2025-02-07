import { BiCartAdd } from "react-icons/bi";

import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import ButtonIcon from "../ui/ButtonIcon";
import Menus from "../ui/Menus";
import CreateOrderForm from "../features/orders/CreateOrderForm";
import OrderTable from "../features/orders/OrderTable";
import OrderTableOperations from "../features/orders/OrderTableOperations";
import ButtonIconWithPermission from "../ui/ButtonIconWithPermission";

function Orders() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Orders</Heading>
        <Modal>
          <Modal.Open opens="addCustomer">
            <ButtonIconWithPermission checkAccess={true}>
              <BiCartAdd />
            </ButtonIconWithPermission>
          </Modal.Open>

          <Modal.Window name="addCustomer">
            <CreateOrderForm />
          </Modal.Window>
        </Modal>
      </Row>

      <Row type="horizontal">
        <OrderTableOperations />
      </Row>

      <Row>
        <OrderTable />
      </Row>
    </Menus>
  );
}

export default Orders;
