import { useQuery } from "@tanstack/react-query";
import { getScheme3ByItemId } from "../../services/apiSchemes";

export function useScheme3ByItemId(item_id) {
  const {
    isLoading: isLoadingScheme3,
    data: scheme_3,
    error,
  } = useQuery({
    queryKey: ["scheme_3", item_id],
    queryFn: () => getScheme3ByItemId({ item_id }),
  });

  return { isLoadingScheme3, scheme_3, error };
}
