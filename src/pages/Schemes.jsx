import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";

import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import ButtonIconWithPermission from "../ui/ButtonIconWithPermission";
import CreateNewScheme from "../features/schemes/CreateNewScheme";
import SchemeTable from "../features/schemes/SchemeTable";
import SchemeTableOperations from "../features/schemes/SchemeTableOperations";

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
                <ButtonIconWithPermission level={2}>
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
