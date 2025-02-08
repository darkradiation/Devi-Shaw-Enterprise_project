import { RiRoadMapLine } from "react-icons/ri";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import RouteTable from "../features/routes/RouteTable";
import CreateRouteForm from "../features/routes/CreateRouteForm";
import ButtonIconWithPermission from "../ui/ButtonIconWithPermission";

function RoutesPage() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Routes</Heading>
        <Modal>
          <Modal.Open opens="addRoute">
            <ButtonIconWithPermission level={2}>
              <RiRoadMapLine />
            </ButtonIconWithPermission>
          </Modal.Open>

          <Modal.Window name="addRoute">
            <CreateRouteForm />
          </Modal.Window>
        </Modal>
      </Row>

      <Row>
        <RouteTable />
      </Row>
    </Menus>
  );
}

export default RoutesPage;

// add route is not working due to duplicate key in supabase.
