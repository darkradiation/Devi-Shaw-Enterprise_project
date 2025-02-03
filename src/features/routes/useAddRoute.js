import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoute as add } from "../../services/apiRoutes";
import toast from "react-hot-toast";

export function useAddRoute() {
  const queryClient = useQueryClient();

  const { mutate: addRoute, isLoading: isAddingRoute } = useMutation({
    mutationFn: ({ newRoute }) => add({ newRoute }),
    onSuccess: () => {
      toast.success("Route successfully added");
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addRoute, isAddingRoute };
}
