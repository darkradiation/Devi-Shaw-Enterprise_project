import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCustomer as deleteApi } from "../../services/apiCustomers";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingCustomer, mutate: deleteCustomer } = useMutation(
    {
      mutationFn: ({ id }) => deleteApi({ id }),
      onSuccess: () => {
        toast.success("Customer successfully deleted");

        queryClient.invalidateQueries({
          queryKey: ["customers"],
        });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isDeletingCustomer, deleteCustomer };
}
