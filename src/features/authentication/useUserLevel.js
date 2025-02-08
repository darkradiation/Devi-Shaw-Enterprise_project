import { useUser } from "./useUser";

export function useUserLevel() {
  const { user } = useUser();
  const { email_verified, level } = user.user_metadata;

  // server-side verification
  const isLevel0User = email_verified && Number(level) === 0;
  const isLevel1User = email_verified && Number(level) === 1;
  const isLevel2User = email_verified && Number(level) === 2;
  const isLevel3User = email_verified && Number(level) === 3;

  return { isLevel0User, isLevel1User, isLevel2User, isLevel3User };
}

// level-0 -> can view everything
// level-1 -> can add orders,update orders(mark delivered,make payments),cancel orders
// level-2 -> can (add,update) customers,routes,orders,stock,suppliers,schemes
// level-3 -> all delete access

// client-side verification (not secure)
// const level0UserEmails = ["guest@dse.com"];
// const level1UserEmails = ["delivery@dse.com"];
// const level2UserEmails = ["sunny@dse.com"];
// const level3UserEmails = ["admin@dse.com"];

// const isLevel0User = email_verified && level0UserEmails.includes(email);
// const isLevel1User = email_verified && level1UserEmails.includes(email);
// const isLevel2User = email_verified && level2UserEmails.includes(email);
// const isLevel3User = email_verified && level3UserEmails.includes(email);
