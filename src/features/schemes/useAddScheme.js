import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addScheme2, addScheme1 } from "../../services/apiSchemes";

export function useAddScheme() {
  const queryClient = useQueryClient();

  const { mutate: addScheme, isLoading: isAddingScheme } = useMutation({
    mutationFn: ({ new_scheme }) => {
      addScheme2({ new_scheme });
      addScheme1({ new_scheme });
    },
    onSuccess: () => {
      toast.success("Scheme successfully created");
      queryClient.invalidateQueries({ queryKey: ["scheme_1"] });
      queryClient.invalidateQueries({ queryKey: ["scheme_2"] });
      console.log("Scheme successfully added");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addScheme, isAddingScheme };
}
