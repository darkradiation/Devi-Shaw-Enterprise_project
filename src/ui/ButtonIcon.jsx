import styled, { css } from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  ${(props) =>
    props.size === "sm" &&
    css`
      & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-brand-600);
      }
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      & svg {
        width: 1.8rem;
        height: 1.8rem;
        color: var(--color-brand-600);
      }
    `}

  ${(props) =>
    props.size === "lg" &&
    css`
      & svg {
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-brand-600);
      }
    `}
`;

ButtonIcon.defaultProps = {
  size: "md",
};

export default ButtonIcon;
