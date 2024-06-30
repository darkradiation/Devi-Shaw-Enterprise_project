import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addSchemeFar, addSchemeNear } from "../../services/apiSchemes";

export function useAddScheme() {
  const queryClient = useQueryClient();

  const { mutate: addScheme, isLoading: isAddingScheme } = useMutation({
    mutationFn: ({ new_scheme }) => {
      addSchemeFar({ new_scheme });
      addSchemeNear({ new_scheme });
    },
    onSuccess: () => {
      toast.success("Scheme successfully created");
      queryClient.invalidateQueries({ queryKey: ["scheme_near"] });
      queryClient.invalidateQueries({ queryKey: ["scheme_far"] });
      console.log("Scheme successfully added");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addScheme, isAddingScheme };
}
