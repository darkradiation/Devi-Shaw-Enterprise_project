import { FaBoxOpen } from "react-icons/fa6";
import SchemeTable from "../features/schemes/SchemeTable";
import ButtonIcon from "../ui/ButtonIcon";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import CreateNewScheme from "../features/schemes/CreateNewScheme";
import SchemeTableOperations from "../features/schemes/SchemeTableOperations";

function Schemes() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Schemes</Heading>
        <div>
          <Modal>
            <Modal.Open opens="refillStock">
              <ButtonIcon>
                <FaBoxOpen />
              </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="refillStock">
              <CreateNewScheme />
            </Modal.Window>
          </Modal>
        </div>
      </Row>

      <SchemeTableOperations />

      <Row>
        <SchemeTable />
      </Row>
    </Menus>
  );
}

export default Schemes;
