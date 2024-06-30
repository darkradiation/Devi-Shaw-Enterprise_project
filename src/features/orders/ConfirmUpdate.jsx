import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledConfirmUpdate = styled.div`
  width: 28rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmUpdate({
  task,
  orderId,
  confirmation,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <StyledConfirmUpdate>
      <Heading as="h3">
        {task} Order# {orderId}
      </Heading>
      <p>You confirm that {confirmation} .</p>

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
            onConfirm();
            onCloseModal();
          }}
        >
          Confirm
        </Button>
      </div>
    </StyledConfirmUpdate>
  );
}

export default ConfirmUpdate;
