import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import Heading from "./Heading";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return (
    <StyledHeader>
      {/* <div> */}
      {/* <Logo /> */}
      <Heading as="h3">Devi Shaw Enterprise</Heading>
      {/* </div> */}
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
