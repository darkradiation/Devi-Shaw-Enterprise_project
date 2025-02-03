import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSupplier as updateSupplierApi } from "../../services/apiSuppliers";
import toast from "react-hot-toast";

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  const { mutate: updateSupplier, isLoading: isUpdatingSupplier } = useMutation(
    {
      mutationFn: ({ id, updated_supplier }) =>
        updateSupplierApi({ id, updated_supplier }),
      onSuccess: () => {
        toast.success("Supplier successfully updated");
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { updateSupplier, isUpdatingSupplier };
}
