import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSchemeFar as update } from "../../services/apiSchemes";
import { useSchemesFar } from "./useSchemesFar";

export function useUpdateSchemeFar() {
  const { isLoadingSchemesFar, schemes_far } = useSchemesFar();

  const queryClient = useQueryClient();

  const { mutate: updateSchemeFar, isLoading: isUpdatingSchemeFar } =
    useMutation({
      mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
        update({ item_id, new_scheme }),
      onSuccess: () => {
        toast.success("Scheme_far successfully updated");
        queryClient.invalidateQueries({ queryKey: ["schemes_far"] });
        console.log("Scheme_far successfully updated");
      },
      onError: (err) => toast.error(err.message),
    });

  if (isLoadingSchemesFar) return;

  const handleUpdateSchemeFar = ({
    schemeItemId,
    scheme_level,
    new_scheme = "",
  }) => {
    const old_scheme = schemes_far[schemeItemId - 1];
    delete old_scheme["stock"];
    const updatedScheme = {
      ...old_scheme[schemeItemId - 1],
      [`free_${scheme_level}pt`]: new_scheme,
    };

    updateSchemeFar({ schemeItemId, updatedScheme });
  };

  return { isUpdatingSchemeFar, handleUpdateSchemeFar };
}

// export function useUpdateSchemeFar() {
//   const queryClient = useQueryClient();

//   const { mutate: updateSchemeFar, isLoading: isUpdatingSchemeFar } =
//     useMutation({
//       mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
//         update({ item_id, new_scheme }),
//       onSuccess: () => {
//         toast.success("Scheme_far successfully updated");
//         queryClient.invalidateQueries({ queryKey: ["schemes_far"] });
//         console.log("Scheme_far successfully updated");
//       },
//       onError: (err) => toast.error(err.message),
//     });

//   return { isUpdatingSchemeFar, updateSchemeFar };
// }
