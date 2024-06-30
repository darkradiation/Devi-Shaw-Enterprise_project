import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCustomer as update } from "../../services/apiCustomers";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  const { mutate: updateCustomer, isLoading: isUpdatingCustomer } = useMutation(
    {
      mutationFn: ({ id, updated_customer }) =>
        update({ id, updated_customer }),
      onSuccess: () => {
        toast.success("Customer successfully updated");
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        console.log("Customer successfully updated");
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { updateCustomer, isUpdatingCustomer };
}
