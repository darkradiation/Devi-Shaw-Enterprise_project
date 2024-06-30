import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { LuLayoutDashboard } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";
import { FaBoxesStacked } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { PiNotePencil } from "react-icons/pi";

const NavList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 0.6rem;
  list-style-type: none;
  margin: 0rem;
  border-top: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.3rem;
    color: var(--color-brand-600);
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem 0.5rem 0.2rem 0.5rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-brand-600);
    border-radius: var(--border-radius-sm);
    color: white;

    /* border: var(--color-grey-100); */
    /* box-shadow: var(--shadow-lg); */
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* color: var(--color-grey-500); */
    color: var(--color-brand-600);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: white;
    scale: 1.1;
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <LuLayoutDashboard />
            <p>dashboard</p>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/customers">
            <SlPeople />
            <p>customers</p>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/orders">
            <PiNotePencil />
            <p>orders</p>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/stock">
            <FaBoxesStacked />
            <p>stock</p>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/schemes">
            <BiSolidOffer />
            <p>schemes</p>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
          </StyledNavLink>
        </li> */}
      </NavList>
    </nav>
  );
}

export default MainNav;
