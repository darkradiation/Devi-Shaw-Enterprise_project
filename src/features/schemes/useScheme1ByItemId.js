import { useQuery } from "@tanstack/react-query";
import { getScheme1ByItemId } from "../../services/apiSchemes";

export function useScheme1ByItemId(item_id) {
  const {
    isLoading: isLoadingScheme1,
    data: scheme_1,
    error,
  } = useQuery({
    queryKey: ["scheme_1", item_id],
    queryFn: () => getScheme1ByItemId({ item_id }),
  });

  return { isLoadingScheme1, scheme_1, error };
}
