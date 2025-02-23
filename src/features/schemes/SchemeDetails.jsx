import styled from "styled-components";
import Modal from "../../ui/Modal";
import EditScheme from "./EditScheme";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteScheme from "./useDeleteScheme";
import Table from "../../ui/Table";
import Heading from "../../ui/Heading";
import ButtonIconWithPermission from "../../ui/ButtonIconWithPermission";
import { HiPencil, HiTrash } from "react-icons/hi2";

const StyledSchemeDetailsComponent = styled.div`
  /* width: 75vw; */
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 0 2rem 0;

  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const HeadingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem 2rem;

  box-shadow: var(--shadow-md);
`;

const DataBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem 2rem;

  box-shadow: var(--shadow-md);
`;

const IconBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 0.5rem 2rem;
`;

const PricingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 1rem 2rem;

  & div:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div:first-child {
    font-size: 1.3rem;
    font-weight: 600;
  }
  & div:last-child {
    font-size: 1.4rem;
    padding: 0 1.5rem;
  }

  &:nth-child(3) {
    & div:last-child {
      border-top: 1px solid var(--color-grey-600);
    }
  }

  &:nth-child(5) {
    & div:last-child {
      border-top: 1px solid var(--color-grey-600);
    }
  }
`;

const Stacked2 = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;

  & div:first-child {
    font-size: 1.3rem;
    /* font-weight: 600; */
  }
  & div:last-child {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

function SchemeDetails({ scheme, scheme_item_id, scheme_item_name }) {
  const {
    free_items,
    scheme_level,
    buying_price,
    base_selling_price,
    discount,
    discounted_selling_price,
    total_free_value_mrp_price,
    total_free_value_buying_price,
    effective_buying_price_customer,
    effective_selling_price_enterprise,
    effective_buying_price_customer_per_pt,
    effective_selling_price_enterprise_per_pt,
  } = scheme;

  const items = [
    {
      item_name: scheme_item_name,
      item_quantity: scheme_level,
      buying_price: Number(buying_price) / Number(scheme_level),
      selling_price: Number(discounted_selling_price) / Number(scheme_level),
    },
  ];

  const schemeItemId = Number(scheme_item_id);

  const { isDeleting, handleDelete } = useDeleteScheme({
    schemeItemId,
    scheme_level,
  });

  const hasFreeItems =
    free_items[0].free_item_quantity > 0 ||
    free_items[1].free_item_quantity > 0;

  return (
    <StyledSchemeDetailsComponent>
      <HeadingBox>
        <Heading as="h2">Scheme Details</Heading>
      </HeadingBox>

      <DataBox>
        <Heading as="h3">Scheme Item</Heading>
        <Table columns="1fr 5fr 2fr 2fr">
          <Table.Header>
            <div>qt.</div>
            <div>name</div>
            <div>bp</div>
            <div>sp</div>
          </Table.Header>
          <Table.Body
            data={items}
            render={(item) => (
              <Table.Row role="row">
                <div>{item.item_quantity}</div>
                <div>{item.item_name}</div>
                <div>{item.buying_price}</div>
                <div>{item.selling_price}</div>
              </Table.Row>
            )}
          />
        </Table>
        <div>
          <Stacked2>
            <div>Buying Price : </div>
            <div>Rs. {buying_price}</div>
          </Stacked2>
          <Stacked2>
            <div>Selling Price : </div>
            <div>Rs. {discounted_selling_price}</div>
          </Stacked2>
        </div>
      </DataBox>

      {hasFreeItems && (
        <DataBox>
          <Heading as="h3">Free Items</Heading>
          <Table columns="1fr 5fr 2fr 2fr">
            <Table.Header>
              <div>qt.</div>
              <div>name</div>
              <div>bp</div>
              <div>mrp</div>
            </Table.Header>
            <Table.Body
              data={free_items}
              render={(item) => (
                <Table.Row role="row">
                  <div>{item.free_item_quantity}</div>
                  <div>{item.free_item_name}</div>
                  <div>{item.free_value_buying_price}</div>
                  <div>{item.free_value_mrp_price}</div>
                </Table.Row>
              )}
            />
          </Table>
          <div>
            <Stacked2>
              <div>Buying Price : </div>
              <div>Rs. {total_free_value_buying_price}</div>
            </Stacked2>
            <Stacked2>
              <div>Total Mrp Price : </div>
              <div>Rs. {total_free_value_mrp_price}</div>
            </Stacked2>
          </div>
        </DataBox>
      )}

      {hasFreeItems && (
        <PricingBox>
          {/* <Heading as="h4">Pricing for Customer</Heading> */}
          <PriceItem>
            <div>Base Selling Price</div>
            <div>{base_selling_price}</div>
          </PriceItem>

          <PriceItem>
            <div>discount</div>
            <div>- {discount}</div>
          </PriceItem>

          <PriceItem>
            <div>Discounted SP</div>
            <div>{discounted_selling_price}</div>
          </PriceItem>

          <PriceItem>
            <div>Free MRP value</div>
            <div>- {total_free_value_mrp_price}</div>
          </PriceItem>

          <PriceItem>
            <div>BP for Customer</div>
            <div>{effective_buying_price_customer}</div>
          </PriceItem>

          <PriceItem>
            <div>BP for Customer/pt</div>
            <div>{effective_buying_price_customer_per_pt}</div>
          </PriceItem>
        </PricingBox>
      )}

      <PricingBox>
        {/* <Heading as="h4">Pricing for Enterprise</Heading> */}
        <PriceItem>
          <div>Base Selling Price</div>
          <div>{base_selling_price}</div>
        </PriceItem>

        <PriceItem>
          <div>discount</div>
          <div>- {discount}</div>
        </PriceItem>

        <PriceItem>
          <div>Discounted SP</div>
          <div>{discounted_selling_price}</div>
        </PriceItem>

        <PriceItem>
          <div>Free BP value</div>
          <div>- {total_free_value_buying_price}</div>
        </PriceItem>

        <PriceItem>
          <div>SP for Enterprise</div>
          <div>{effective_selling_price_enterprise}</div>
        </PriceItem>

        <PriceItem>
          <div>SP for Enterprise/pt</div>
          <div>{effective_selling_price_enterprise_per_pt}</div>
        </PriceItem>
      </PricingBox>

      <IconBox>
        <Modal.Open opens="edit">
          <ButtonIconWithPermission level={2} size="lg">
            <HiPencil />
          </ButtonIconWithPermission>
        </Modal.Open>

        <Modal.Open opens="delete">
          <ButtonIconWithPermission level={3} size="lg">
            <HiTrash />
          </ButtonIconWithPermission>
        </Modal.Open>

        <Modal.Window name="edit">
          <EditScheme scheme={scheme} scheme_item_id={scheme_item_id} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="scheme"
            disabled={isDeleting}
            onConfirm={() => handleDelete()}
          />
        </Modal.Window>
      </IconBox>
    </StyledSchemeDetailsComponent>
  );
}

export default SchemeDetails;
