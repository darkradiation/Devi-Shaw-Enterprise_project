import styled from "styled-components";
import { TbPasswordUser } from "react-icons/tb";
import { BiLogOut, BiUserPlus } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

import Menus from "../ui/Menus";
import Modal from "../ui/Modal";
import UserAvatar from "../features/authentication/UserAvatar";
import SignupForm from "../features/authentication/SignupForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import { useIsAdmin } from "../features/authentication/useIsAdmin";
const StyledName = styled.div`
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: 700;
  text-align: right;
  color: var(--color-brand-500);
  border-bottom: 1px solid var(--color-grey-100);
`;

function Account() {
  const { user } = useUser();
  const { fullName } = user.user_metadata;
  const { logout, isLoading } = useLogout();
  const { isAdmin } = useIsAdmin();

  return (
    <Menus>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id="account" icon={<UserAvatar />} />
          <Menus.List id="account">
            <div></div>
            <StyledName>{fullName}</StyledName>
            <Modal.Open opens="update_user_data">
              <Menus.Button icon={<FaUserEdit />}>
                Update user data
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="update_password">
              <Menus.Button icon={<TbPasswordUser />}>
                Update password
              </Menus.Button>
            </Modal.Open>

            {isAdmin && (
              <Modal.Open opens="sign_up">
                <Menus.Button icon={<BiUserPlus />} level={3}>
                  SignUp new user
                </Menus.Button>
              </Modal.Open>
            )}
            <Menus.Button
              icon={<BiLogOut />}
              onClick={() => logout()}
              disabled={isLoading}
            >
              Logout
            </Menus.Button>
          </Menus.List>
          {/* -------------------- */}
          <Modal.Window name="update_user_data">
            <UpdateUserDataForm />
          </Modal.Window>
          <Modal.Window name="update_password">
            <UpdatePasswordForm />
          </Modal.Window>
          <Modal.Window name="sign_up">
            <SignupForm />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Menus>
  );
}

export default Account;
