import { useQuery } from "@tanstack/react-query";
import { getSchemes3 } from "../../services/apiSchemes";

export function useSchemes3() {
  const {
    isLoading: isLoadingSchemes3,
    data: schemes_3,
    error,
  } = useQuery({
    queryKey: ["schemes_3"],
    queryFn: getSchemes3,
  });

  return { isLoadingSchemes3, schemes_3, error };
}
