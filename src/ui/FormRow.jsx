import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1.2rem 0; */
  position: relative;

  &:first-child {
    padding-top: 0;
    margin-bottom: 1rem;
  }

  &:last-child {
    padding-bottom: 0;
  }

  /* &:not(:last-child), */
  &:not(:first-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:last-child {
    border-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    /* border: none; */
  }

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1.2rem 0;
    `}

  ${(props) =>
    props.type === "order" &&
    css`
      padding: 0.5rem 0;
      padding-bottom: 1rem;

      /* &:not(:last-child), */
      &:not(:first-child) {
        border-bottom: 1px solid var(--color-grey-200);
      }
      &:last-child {
        border-bottom: 0;
      }

      overflow-x: hidden;
    `}
    ${(props) =>
    props.type === "multi" &&
    css`
      padding: 1rem 0 0;
    `}
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.2rem;
  position: absolute;
  left: 2rem;
  top: 0.4rem;
  background-color: var(--color-grey-0);
  padding: 0 0.3rem;
  /* color: var(--color-brand-500); */
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, type, children }) {
  return (
    <StyledFormRow type={type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
StyledFormRow.defaultProps = {
  type: "regular",
};

export default FormRow;
