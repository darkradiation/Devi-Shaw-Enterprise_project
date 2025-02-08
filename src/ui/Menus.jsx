import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import toast from "react-hot-toast";
import { useUserLevel } from "../features/authentication/useUserLevel";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 500;
`;
const StyledHList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 500;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.4rem;
  gap: 0.4rem;
`;
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, icon }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation(); // prevent clicking on the toggle from closing the menu
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      {icon ? icon : <HiEllipsisVertical />}
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function HList({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledHList position={position} ref={ref}>
      {children}
    </StyledHList>,
    document.body
  );
}

// function Button({ children, icon, onClick, disabled }) {
//   const { close } = useContext(MenusContext);

//   function handleClick() {
//     onClick?.();
//     close();
//   }
function Button({ children, icon, onClick, disabled, level = 0 }) {
  const { close } = useContext(MenusContext);
  const { isLevel0User, isLevel1User, isLevel2User, isLevel3User } =
    useUserLevel();

  const hasPermission = () => {
    // If a level is provided, check membership in any of the allowed levels.
    if (typeof level === "number") {
      switch (level) {
        case 0:
          return isLevel0User || isLevel1User || isLevel2User || isLevel3User;
        case 1:
          return isLevel1User || isLevel2User || isLevel3User;
        case 2:
          return isLevel2User || isLevel3User;
        case 3:
          return isLevel3User;
        default:
          return false;
      }
    }
    // If no level prop is provided, default to allow.
    return true;
  };

  const handleClick = (e) => {
    if (!hasPermission()) {
      toast.error("User does not have permission to perform this action.");
      e.stopPropagation();
      return;
    }
    onClick?.(e);
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.HList = HList;
Menus.Button = Button;

export default Menus;
