import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Bottombar from "./Bottombar";
import MainNav from "./MainNav";
import Header from "./Header";

const StyledAppLayout = styled.div`
  /* max-width: 40rem;
  margin: 0 auto; */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 1rem 0.5rem;
  overflow: scroll;
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
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      <Bottombar>
        <MainNav />
      </Bottombar>
    </StyledAppLayout>
  );
}

export default AppLayout;
