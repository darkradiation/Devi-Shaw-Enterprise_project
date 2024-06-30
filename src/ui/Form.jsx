import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1.2rem 0.1rem;
      width: 28rem;

      /* Box */
      background-color: var(--color-grey-0);
      /* border: 1px solid var(--color-grey-100); */
      /* border-radius: var(--border-radius-md); */
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      padding: 1.2rem 0.5rem;
      width: 32rem;

      /* Box */
      background-color: var(--color-grey-0);
      /* border: 1px solid var(--color-grey-100); */
      /* border-radius: var(--border-radius-md); */
    `}
    
  overflow: scroll;
  font-size: 1.4rem;
  max-height: 80vh;

  scrollbar-width: none;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
