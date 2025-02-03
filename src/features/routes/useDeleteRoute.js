import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoute as deleteApi } from "../../services/apiRoutes";
import { toast } from "react-hot-toast";

export function useDeleteRoute() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingRoute, mutate: deleteRoute } = useMutation({
    mutationFn: ({ id }) => deleteApi({ id }),
    onSuccess: () => {
      toast.success("Route successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingRoute, deleteRoute };
}
