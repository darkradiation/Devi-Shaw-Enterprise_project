import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersAfterDate } from "../../services/apiOrders";

export function useRecentOrders() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 1
    : Number(searchParams.get("last"));

  // console.log("searching for last" + numDays);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoadingRecentOrders, data: recentOrders } = useQuery({
    queryFn: () => getOrdersAfterDate(queryDate),
    queryKey: ["orders", `last-${numDays}`],
  });

  return { isLoadingRecentOrders, recentOrders, numDays };
}
