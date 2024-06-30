import { useQuery } from "@tanstack/react-query";
import { getSchemesNear } from "../../services/apiSchemes";

export function useSchemesNear() {
  const {
    isLoading: isLoadingSchemesNear,
    data: schemes_near,
    error,
  } = useQuery({
    queryKey: ["schemes_near"],
    queryFn: getSchemesNear,
  });

  return { isLoadingSchemesNear, schemes_near, error };
}
