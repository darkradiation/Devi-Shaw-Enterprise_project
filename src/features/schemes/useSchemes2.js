import { useQuery } from "@tanstack/react-query";
import { getSchemes2 } from "../../services/apiSchemes";

export function useSchemes2() {
  const {
    isLoading: isLoadingSchemes2,
    data: schemes_2,
    error,
  } = useQuery({
    queryKey: ["schemes_2"],
    queryFn: getSchemes2,
  });

  if (error) {
    console.log(error);
  }

  return { isLoadingSchemes2, error, schemes_2 };
}
