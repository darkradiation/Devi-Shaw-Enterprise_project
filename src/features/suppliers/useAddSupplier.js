import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSupplier as add } from "../../services/apiSuppliers";
import toast from "react-hot-toast";

export function useAddSupplier() {
  const queryClient = useQueryClient();

  const { mutate: addSupplier, isLoading: isAddingSupplier } = useMutation({
    mutationFn: ({ newSupplier }) => add({ newSupplier }),
    onSuccess: () => {
      toast.success("Supplier successfully added");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addSupplier, isAddingSupplier };
}
