import { RiRoadMapLine } from "react-icons/ri";
import ButtonIcon from "../ui/ButtonIcon";
import Heading from "../ui/Heading";
import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import RouteTable from "../features/routes/RouteTable";
import CreateRouteForm from "../features/routes/CreateRouteForm";

function RoutesPage() {
  return (
    <Menus>
      <Row type="horizontal">
        <Heading as="h4">Routes</Heading>
        <Modal>
          {/* <Modal.Open opens="addRoute">
            <ButtonIcon>
              <RiRoadMapLine />
            </ButtonIcon>
          </Modal.Open> */}

          {/* <Modal.Window name="addRoute">
            <CreateRouteForm />
          </Modal.Window> */}
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
