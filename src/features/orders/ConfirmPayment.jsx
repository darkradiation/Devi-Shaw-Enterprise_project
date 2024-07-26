import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";

const StyledConfirmPayment = styled.div`
  width: 28rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    text-align: right;
    /* margin-bottom: 1.2rem; */
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.2rem 0.5rem 0.2rem;
`;

export default function ConfirmPayment({
  orderId,
  outstanding_payment,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  const [isMakingFullPayment, setIsMakingFullPayment] = useState(true);
  const [amount, setAmount] = useState(outstanding_payment);
  return (
    <StyledConfirmPayment>
      <Heading as="h3">Update Order# {orderId}</Heading>
      <Column>
        <p>Outstanding - Rs.{outstanding_payment}</p>
        <Checkbox
          id="scheme"
          checked={isMakingFullPayment}
          onChange={(e) => setIsMakingFullPayment(e.target.checked)}
        >
          Make Full Payment
        </Checkbox>
      </Column>
      {!isMakingFullPayment && (
        <Column>
          <Input
            type="number"
            id="amount"
            defaultValue={0}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Column>
      )}

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal()}
        >
          Cancel
        </Button>
        <Button
          variation="primary"
          disabled={disabled}
          onClick={() => {
            onConfirm({ amount });
            console.log(Number(amount));
            onCloseModal();
          }}
        >
          Confirm
        </Button>
      </div>
    </StyledConfirmPayment>
  );
}
