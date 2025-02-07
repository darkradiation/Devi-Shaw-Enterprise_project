import { useUser } from "./useUser";

export function useHasEditPermission() {
  const { user } = useUser();
  const { email, email_verified } = user.user_metadata;

  const permittedUserEmails = [
    "sunny@dse.com",
    "test@dse.com",
    "admin@dse.com",
    // "guest@dse.com",
  ];

  const hasEditPermission =
    email_verified && permittedUserEmails.includes(email);

  return { hasEditPermission };
}
