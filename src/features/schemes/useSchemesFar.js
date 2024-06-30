import { useQuery } from "@tanstack/react-query";
import { getSchemesFar } from "../../services/apiSchemes";

export function useSchemesFar() {
  const {
    isLoading: isLoadingSchemesFar,
    data: schemes_far,
    error,
  } = useQuery({
    queryKey: ["schemes_far"],
    queryFn: getSchemesFar,
  });

  if (error) {
    console.log(error);
  }

  return { isLoadingSchemesFar, error, schemes_far };
}
