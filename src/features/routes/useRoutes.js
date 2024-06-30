import { useQuery } from "@tanstack/react-query";
import { getRoutes } from "../../services/apiRoutes";

export function useRoutes() {
  const {
    isLoading: isLoadingRoutes,
    data: routes,
    error,
  } = useQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
  });

  return { isLoadingRoutes, error, routes };
}
