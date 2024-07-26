import { useQuery } from "@tanstack/react-query";
import { getScheme2ByItemId } from "../../services/apiSchemes";

export function useScheme2ByItemId(item_id) {
  const {
    isLoading: isLoadingScheme2,
    data: scheme_2,
    error,
  } = useQuery({
    queryKey: ["scheme_2", item_id],
    queryFn: () => getScheme2ByItemId({ item_id }),
  });

  return { isLoadingScheme2, scheme_2, error };
}
