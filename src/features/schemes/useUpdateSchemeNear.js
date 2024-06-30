import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSchemeNear as update } from "../../services/apiSchemes";
import { useSchemesNear } from "./useSchemesNear";

export function useUpdateSchemeNear() {
  const { isLoadingSchemesNear, schemes_near } = useSchemesNear();

  const queryClient = useQueryClient();

  const { mutate: updateSchemeNear, isLoading: isUpdatingSchemeNear } =
    useMutation({
      mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
        update({ item_id, new_scheme }),
      onSuccess: () => {
        toast.success("Scheme_near successfully updated");
        queryClient.invalidateQueries({ queryKey: ["schemes_near"] });
        console.log("Scheme_near successfully updated");
      },
      onError: (err) => toast.error(err.message),
    });

  // return { isUpdatingSchemeNear, updateSchemeNear };
  if (isLoadingSchemesNear) return;

  const handleUpdateSchemeNear = ({
    schemeItemId,
    scheme_level,
    new_scheme = null,
  }) => {
    const old_scheme = schemes_near[schemeItemId - 1];
    delete old_scheme["stock"];
    const updatedScheme = {
      ...old_scheme[schemeItemId - 1],
      [`free_${scheme_level}pt`]: new_scheme,
    };

    updateSchemeNear({ schemeItemId, updatedScheme });
  };

  return { isUpdatingSchemeNear, handleUpdateSchemeNear };
}

// export function useUpdateSchemeNear() {
//   const queryClient = useQueryClient();

//   const { mutate: updateSchemeNear, isLoading: isUpdatingSchemeNear } =
//     useMutation({
//       mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
//         update({ item_id, new_scheme }),
//       onSuccess: () => {
//         toast.success("Scheme_near successfully updated");
//         queryClient.invalidateQueries({ queryKey: ["schemes_near"] });
//         console.log("Scheme_near successfully updated");
//       },
//       onError: (err) => toast.error(err.message),
//     });

//   return { isUpdatingSchemeNear, updateSchemeNear };
// }
