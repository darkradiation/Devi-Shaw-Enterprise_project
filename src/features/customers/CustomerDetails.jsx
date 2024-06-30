import styled from "styled-components";
import { FaCartPlus } from "react-icons/fa";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { MdCall } from "react-icons/md";
import { ImLocation } from "react-icons/im";

import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import ButtonIcon from "../../ui/ButtonIcon";
import CreateOrderForm from "../orders/CreateOrderForm";
import EditCustomer from "./EditCustomer";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useDeleteCustomer } from "./useDeleteCustomer";
import { useCustomerById } from "./useCustomerById";

const StyledCustomerDetailsComponent = styled.div`
  width: 75vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */
`;

const StyledImagesContainer = styled.div`
  width: 127%;
  height: 33%;
  position: relative;
  margin-top: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const StyledStoreImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */

  & :img {
    width: 100%;
    object-fit: cover;
  }
`;
const StyledOwnerImage = styled.div`
  width: 10rem;
  height: 10rem;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  border-radius: 50%;
  overflow: hidden;
`;

const DataBox = styled.div`
  width: 110%;
  display: flex;
  flex-direction: column;

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 1rem 2rem;
`;

const IconBox = styled.div`
  width: 110%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 0.5rem 2rem;
`;

const Stacked = styled.div`
  /* display: flex;
  gap: 1rem; */

  display: grid;
  grid-template-columns: 2fr 6fr;
  align-items: start;

  & div:first-child {
    font-size: 1.3rem;
    font-weight: 600;
  }
  & div:last-child {
    font-size: 1.4rem;
  }

  margin-bottom: 0.5rem;
`;

const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 1rem;

  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-lg);

  background-color: var(--color-blue-100);
  color: var(--color-blue-700);
`;
const NumberBox = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 1rem;

  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-lg);

  background-color: var(--color-blue-100);
  color: var(--color-blue-700);
`;

function CustomerDetails({ id, customer }) {
  const { isLoadingCustomer, customer: cust } = useCustomerById(id);
  const { isDeletingCustomer, deleteCustomer } = useDeleteCustomer();
  if (isLoadingCustomer) return <Spinner />;
  const {
    store_name,
    owner_name,
    store_picture,
    owner_picture,
    owner_phone_no,
    store_address,
    open_hours,
    distance,
    store_geoLink,
    routes: { route_name, near_or_far },
  } = cust;

  function handleLocate() {
    window.open(
      store_geoLink
        ? store_geoLink
        : `https://www.google.com/maps/search/?api=1&query=${store_address}`
      // `https://www.google.com/maps/search/?api=1&query=${store_name}${store_address}`
    );
  }
  function handleCall() {
    window.open(
      `https://web.whatsapp.com/send?phone=${owner_phone_no}&text=Hi%20${owner_name}%2C%20I%20am%20interested%20in%20your%20store%20at%20${store_address}%20and%20would%20like%20to%20know%20more%20about%20your%20store.`
    );
  }
  return (
    <StyledCustomerDetailsComponent>
      <StyledImagesContainer>
        <StyledStoreImage>
          <img src={store_picture} alt={store_name} />
        </StyledStoreImage>
        <StyledOwnerImage>
          <img src={owner_picture} alt={owner_name} />
        </StyledOwnerImage>
      </StyledImagesContainer>

      <DataBox>
        <Heading as="h2">{store_name}</Heading>
        <div>{owner_name}</div>
      </DataBox>

      <DataBox>
        <Stacked>
          <div>Opens </div>
          <TimeBox>{open_hours}</TimeBox>
        </Stacked>
        <Stacked>
          <div>Phone no </div>
          <NumberBox>{owner_phone_no}</NumberBox>
        </Stacked>
        <Stacked>
          <div>Address </div>
          <div>{store_address}</div>
        </Stacked>
      </DataBox>

      <DataBox>
        <Stacked>
          <div>Route </div>
          <div>{route_name}</div>
        </Stacked>
        <Stacked>
          <div>Distance </div>
          <div>{distance} km</div>
        </Stacked>
        <Stacked>
          <div>Near/Far </div>
          <div>{near_or_far}</div>
        </Stacked>
      </DataBox>

      <IconBox>
        <ButtonIcon size="lg" onClick={handleCall}>
          <MdCall />
        </ButtonIcon>

        <ButtonIcon size="lg" onClick={handleLocate}>
          <ImLocation />
        </ButtonIcon>

        <Modal.Open opens="order">
          <ButtonIcon size="lg">
            <FaCartPlus />
          </ButtonIcon>
        </Modal.Open>

        <Modal.Open opens="edit">
          <ButtonIcon size="lg">
            <HiPencil />
          </ButtonIcon>
        </Modal.Open>

        <Modal.Open opens="delete">
          <ButtonIcon size="lg">
            <HiTrash />
          </ButtonIcon>
        </Modal.Open>

        <Modal.Window opens="order">
          <CreateOrderForm store_id={id} />
        </Modal.Window>
        <Modal.Window opens="edit">
          <EditCustomer customer={customer} />
        </Modal.Window>
        <Modal.Window opens="delete">
          <ConfirmDelete
            resourceName="customer"
            disabled={isDeletingCustomer}
            onConfirm={() => {
              deleteCustomer({ id });
            }}
          />
        </Modal.Window>
      </IconBox>
    </StyledCustomerDetailsComponent>
  );
}

export default CustomerDetails;
