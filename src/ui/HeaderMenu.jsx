import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
// import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import Uploader from "../data/Uploader";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      {/* <li>
        <ButtonIcon onClick={() => navigate("/account")} size="lg">
          <HiOutlineUser />
        </ButtonIcon>
      </li> */}
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>

      {/* <li>
        <Uploader />
      </li> */}
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
