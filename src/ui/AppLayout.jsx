import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Bottombar from "./Bottombar";
import MainNav from "./MainNav";
import Header from "./Header";
import Logo from "./Logo";

const Background = styled.div`
  background: rgb(63, 94, 251);
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(0, 0, 0, 1) 40%
  );
  position: relative;
`;

const StyledAppLayout = styled.div`
  max-width: 40rem; // 36 if dashboard is clipping
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 1rem 0.5rem;
  overflow: scroll;
  scrollbar-width: none; // hides horizontal and vertical scrollbar
  position: relative;
`;

const Container = styled.div`
  /* max-width: 40rem; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* gap: 3.2rem; */
  /* background-color: cyan; */
  width: 100%;
  height: 100%;
  z-index: 0;
  position: relative;
`;
const StyledFooter = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: #374151;
`;

const Watermark = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 20%;
  z-index: 1;
  pointer-events: none;
`;

function AppLayout() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Background>
      <StyledAppLayout>
        <Header />

        <Main>
          <Container>
            <Outlet />
          </Container>
          <Watermark>
            <Logo size={230} />
          </Watermark>
        </Main>

        <Bottombar>
          <MainNav />
        </Bottombar>
      </StyledAppLayout>
      {screenWidth > 80 * 16 && (
        <StyledFooter>
          <h3>Switch to mobile, for best view</h3>
        </StyledFooter>
      )}
    </Background>
  );
}

export default AppLayout;
