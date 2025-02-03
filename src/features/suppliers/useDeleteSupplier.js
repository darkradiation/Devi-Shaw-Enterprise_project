import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSupplier as deleteApi } from "../../services/apiSuppliers";

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingSupplier, mutate: deleteSupplier } = useMutation(
    {
      mutationFn: ({ id }) => deleteApi({ id }),
      onSuccess: () => {
        toast.success("Supplier successfully deleted");

        queryClient.invalidateQueries({
          queryKey: ["suppliers"],
        });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isDeletingSupplier, deleteSupplier };
}
