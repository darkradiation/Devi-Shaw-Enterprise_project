import { FaBoxOpen, FaPlus } from "react-icons/fa6";
import SchemeTable from "../features/schemes/SchemeTable";
import ButtonIcon from "../ui/ButtonIcon";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import CreateNewScheme from "../features/schemes/CreateNewScheme";
import SchemeTableOperations from "../features/schemes/SchemeTableOperations";
import styled from "styled-components";
import ButtonIconWithPermission from "../ui/ButtonIconWithPermission";

const Stacked = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Schemes() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Schemes</Heading>
        <Stacked>
          <Row type="horizontal">
            <Filter
              filterField="scheme_type"
              options={[
                { value: "schemes_1", label: "1" },
                { value: "schemes_2", label: "2" },
                { value: "schemes_3", label: "3" },
              ]}
            />
          </Row>
          <div>
            <Modal>
              <Modal.Open opens="addScheme">
                <ButtonIconWithPermission checkAccess={true}>
                  {/* <FaBoxOpen /> */}
                  <FaPlus />
                </ButtonIconWithPermission>
              </Modal.Open>
              <Modal.Window name="addScheme">
                <CreateNewScheme />
              </Modal.Window>
            </Modal>
          </div>
        </Stacked>
      </Row>

      <SchemeTableOperations />

      <Row>
        <SchemeTable />
      </Row>
    </Menus>
  );
}

export default Schemes;
