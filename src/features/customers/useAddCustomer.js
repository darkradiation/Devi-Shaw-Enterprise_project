import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addCustomer as add } from "../../services/apiCustomers";

export function useAddCustomer() {
  const queryClient = useQueryClient();

  const { mutate: addCustomer, isLoading: isAddingCustomer } = useMutation({
    mutationFn: ({ new_customer }) => add({ new_customer }),
    onSuccess: () => {
      toast.success("Customer successfully added");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Customer successfully added");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addCustomer, isAddingCustomer };
}
