import { useUser } from "./useUser";

export function useIsAdmin() {
  const { user } = useUser();
  const { email, email_verified, sub } = user.user_metadata;

  const isAdmin =
    email_verified &&
    email === "admin@dse.com" &&
    (sub === "33c2061f-a9ad-46be-bdad-13672071207c" ||
      sub === "6739aac3-bd09-432d-8362-017ea4936118");

  return { isAdmin };
}
