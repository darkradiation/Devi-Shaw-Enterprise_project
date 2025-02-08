import ButtonIcon from "./ButtonIcon"; // Your existing styled ButtonIcon
import toast from "react-hot-toast";
import { useUserLevel } from "../features/authentication/useUserLevel";

const ButtonIconWithPermission = ({
  children,
  onClick,
  level = 0,
  ...rest
}) => {
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
  };

  return (
    <ButtonIcon onClick={handleClick} {...rest}>
      {children}
    </ButtonIcon>
  );
};

export default ButtonIconWithPermission;
