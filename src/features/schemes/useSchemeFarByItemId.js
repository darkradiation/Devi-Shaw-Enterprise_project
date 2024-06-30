import { useQuery } from "@tanstack/react-query";
import { getSchemeFarByItemId } from "../../services/apiSchemes";

export function useSchemeFarByItemId(item_id) {
  const {
    isLoading: isLoadingSchemeFar,
    data: scheme_far,
    error,
  } = useQuery({
    queryKey: ["scheme_far", item_id],
    queryFn: () => getSchemeFarByItemId({ item_id }),
  });

  return { isLoadingSchemeFar, scheme_far, error };
}
