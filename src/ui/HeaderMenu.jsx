import styled from "styled-components";
import DarkModeToggle from "./DarkModeToggle";
import Account from "../pages/Account";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin: -1rem 0; // vvi
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Account />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
