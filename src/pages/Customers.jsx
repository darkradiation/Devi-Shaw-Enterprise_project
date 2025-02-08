import { NavLink } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { RiRoadMapLine, RiUserAddLine } from "react-icons/ri";

import CustomerTable from "../features/customers/CustomerTable";
import CustomerTableOperations from "../features/customers/CustomerTableOperations";
import CreateCustomerForm from "../features/customers/CreateCustomerForm";

import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Menus from "../ui/Menus";

function Customers() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Customers</Heading>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={"customers"} icon={<TiThMenu />} />
            <Menus.List id={"customers"}>
              <Modal.Open opens="addCustomer">
                <Menus.Button icon={<RiUserAddLine />} level={2}>
                  Add Customer
                </Menus.Button>
              </Modal.Open>

              <Menus.Button icon={<RiRoadMapLine />}>
                <NavLink to="/routes">Routes</NavLink>
              </Menus.Button>
            </Menus.List>

            <Modal.Window name="addCustomer">
              <CreateCustomerForm />
            </Modal.Window>
          </Menus.Menu>
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
