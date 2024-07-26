import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateScheme3 as update } from "../../services/apiSchemes";
import { useSchemes3 } from "./useSchemes3";

export function useUpdateScheme3() {
  const { isLoadingSchemes3, schemes_3 } = useSchemes3();

  const queryClient = useQueryClient();

  const { mutate: updateScheme3, isLoading: isUpdatingScheme3 } = useMutation({
    mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
      update({ item_id, new_scheme }),
    onSuccess: () => {
      toast.success("Scheme_3 successfully updated");
      queryClient.invalidateQueries({ queryKey: ["schemes_3"] });
      console.log("Scheme_3 successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  // return { isUpdatingScheme3, updateScheme3 };
  if (isLoadingSchemes3) return;

  const handleUpdateScheme3 = ({
    schemeItemId,
    scheme_level,
    new_scheme = null,
  }) => {
    const old_scheme = schemes_3[schemeItemId - 1];
    delete old_scheme["stock"];
    const updatedScheme = {
      ...old_scheme[schemeItemId - 3],
      [`free_${scheme_level}pt`]: new_scheme,
    };

    updateScheme3({ schemeItemId, updatedScheme });
  };

  return { isUpdatingScheme3, handleUpdateScheme3 };
}
