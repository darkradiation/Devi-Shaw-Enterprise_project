import { useQuery } from "@tanstack/react-query";
import { getSchemeNearByItemId } from "../../services/apiSchemes";

export function useSchemeNearByItemId(item_id) {
  const {
    isLoading: isLoadingSchemeNear,
    data: scheme_near,
    error,
  } = useQuery({
    queryKey: ["scheme_near", item_id],
    queryFn: () => getSchemeNearByItemId({ item_id }),
  });

  return { isLoadingSchemeNear, scheme_near, error };
}
