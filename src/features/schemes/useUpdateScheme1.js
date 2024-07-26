import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateScheme1 as update } from "../../services/apiSchemes";
import { useSchemes1 } from "./useSchemes1";

export function useUpdateScheme1() {
  const { isLoadingSchemes1, schemes_1 } = useSchemes1();

  const queryClient = useQueryClient();

  const { mutate: updateScheme1, isLoading: isUpdatingScheme1 } = useMutation({
    mutationFn: ({ schemeItemId: item_id, updatedScheme: new_scheme }) =>
      update({ item_id, new_scheme }),
    onSuccess: () => {
      toast.success("Scheme_1 successfully updated");
      queryClient.invalidateQueries({ queryKey: ["schemes_1"] });
      console.log("Scheme_1 successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  // return { isUpdatingScheme1, updateScheme1 };
  if (isLoadingSchemes1) return;

  const handleUpdateScheme1 = ({
    schemeItemId,
    scheme_level,
    new_scheme = null,
  }) => {
    const old_scheme = schemes_1[schemeItemId - 1];
    delete old_scheme["stock"];
    const updatedScheme = {
      ...old_scheme[schemeItemId - 1],
      [`free_${scheme_level}pt`]: new_scheme,
    };

    updateScheme1({ schemeItemId, updatedScheme });
  };

  return { isUpdatingScheme1, handleUpdateScheme1 };
}
