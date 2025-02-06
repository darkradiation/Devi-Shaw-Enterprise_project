import { useUser } from "./useUser";

export function useIsAdmin() {
  const { user } = useUser();
  const { email, email_verified, sub } = user.user_metadata;

  const isAdmin =
    email_verified &&
    email === "admin@dse.com" &&
    sub === "b2f468c7-33bc-44a1-86b2-217f76b398b6";

  return { isAdmin };
}
