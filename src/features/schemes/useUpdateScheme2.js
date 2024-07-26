import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateScheme2 as update } from "../../services/apiSchemes";
import { useSchemes2 } from "./useSchemes2";

export function useUpdateScheme2() {
  const { isLoadingSchemes2, schemes_2 } = useSchemes2();

  const queryClient = useQueryClient();

  const { mutate: updateScheme2, isLoading: isUpdatingScheme2 } = useMutation({
    mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
      update({ item_id, new_scheme }),
    onSuccess: () => {
      toast.success("Scheme_2 successfully updated");
      queryClient.invalidateQueries({ queryKey: ["schemes_2"] });
      console.log("Scheme_2 successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoadingSchemes2) return;

  const handleUpdateScheme2 = ({
    schemeItemId,
    scheme_level,
    new_scheme = "",
  }) => {
    const old_scheme = schemes_2[schemeItemId - 1];
    delete old_scheme["stock"];
    const updatedScheme = {
      ...old_scheme[schemeItemId - 1],
      [`free_${scheme_level}pt`]: new_scheme,
    };

    updateScheme2({ schemeItemId, updatedScheme });
  };

  return { isUpdatingScheme2, handleUpdateScheme2 };
}

// export function useUpdateScheme2() {
//   const queryClient = useQueryClient();

//   const { mutate: updateScheme2, isLoading: isUpdatingScheme2 } =
//     useMutation({
//       mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
//         update({ item_id, new_scheme }),
//       onSuccess: () => {
//         toast.success("Scheme_2 successfully updated");
//         queryClient.invalidateQueries({ queryKey: ["schemes_2"] });
//         console.log("Scheme_2 successfully updated");
//       },
//       onError: (err) => toast.error(err.message),
//     });

//   return { isUpdatingScheme2, updateScheme2 };
// }
