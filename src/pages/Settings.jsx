import { useDarkMode } from "../context/DarkModeContext";
import DarkModeToggle from "../ui/DarkModeToggle";
import Heading from "../ui/Heading";

import styled, { css } from "styled-components";

const StledSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;

  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const StyledLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    margin-top: 1rem;
  }
`;

function Settings() {
  const { isDarkMode } = useDarkMode();
  return (
    <StledSettings>
      <StyledUl>
        <div>
          <Heading as="h4">Appearance</Heading>
          <StyledUl>
            <StyledLi>
              <div>Switch to {isDarkMode ? "Light mode" : "Dark Mode"}</div>
              <DarkModeToggle />
            </StyledLi>
          </StyledUl>
        </div>
      </StyledUl>
    </StledSettings>
  );
}

export default Settings;
