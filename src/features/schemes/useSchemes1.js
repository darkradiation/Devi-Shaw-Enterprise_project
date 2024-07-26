import { useQuery } from "@tanstack/react-query";
import { getSchemes1 } from "../../services/apiSchemes";

export function useSchemes1() {
  const {
    isLoading: isLoadingSchemes1,
    data: schemes_1,
    error,
  } = useQuery({
    queryKey: ["schemes_1"],
    queryFn: getSchemes1,
  });

  return { isLoadingSchemes1, schemes_1, error };
}
