import { useUser } from "./useUser";

export function useHasPermission() {
  const { user } = useUser();
  const { email, email_verified } = user.user_metadata;

  const AddPermittedUserEmails = [
    "sunny@dse.com",
    "test@dse.com",
    "admin@dse.com",
    // "guest@dse.com",
  ];
  const UpdatePermittedUserEmails = [
    "sunny@dse.com",
    "test@dse.com",
    "admin@dse.com",
  ];
  const DeletePermittedUserEmails = ["admin@dse.com"];

  const hasAddPermission =
    email_verified && AddPermittedUserEmails.includes(email);
  const hasUpdatePermission =
    email_verified && UpdatePermittedUserEmails.includes(email);
  const hasDeletePermission =
    email_verified && DeletePermittedUserEmails.includes(email);

  return { hasAddPermission, hasUpdatePermission, hasDeletePermission };
}
