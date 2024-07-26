import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  /* height: 15.6rem; */
  /* height: 155px; */
  width: auto;
`;

function Logo({ size = 155 }) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" height={`${size}`} />
    </StyledLogo>
  );
}

export default Logo;
