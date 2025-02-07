import ButtonIcon from "./ButtonIcon"; // Your existing styled ButtonIcon
import { useHasEditPermission } from "../features/authentication/useHasEditPermission";
import toast from "react-hot-toast";

const ButtonIconWithPermission = ({
  children,
  onClick,
  checkAccess = false,
  ...rest
}) => {
  const { hasEditPermission } = useHasEditPermission();

  const handleClick = (e) => {
    if (checkAccess && !hasEditPermission) {
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
