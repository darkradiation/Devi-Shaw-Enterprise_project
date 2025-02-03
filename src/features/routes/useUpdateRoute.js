import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoute as updateRouteApi } from "../../services/apiRoutes";
import toast from "react-hot-toast";

export function useUpdateRoute() {
  const queryClient = useQueryClient();

  const { mutate: updateRoute, isLoading: isUpdatingRoute } = useMutation({
    mutationFn: ({ id, updated_route }) =>
      updateRouteApi({ id, updated_route }),
    onSuccess: () => {
      toast.success("Route successfully updated");
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateRoute, isUpdatingRoute };
}
