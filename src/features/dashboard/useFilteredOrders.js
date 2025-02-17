// useFilteredOrders.js
import { useQuery } from "@tanstack/react-query";
import {
  subDays,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfMonth,
  differenceInDays,
} from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersBetweenDates } from "../../services/apiOrders";

export function useFilteredOrders() {
  const [searchParams] = useSearchParams();
  const filterByThis = searchParams.get("filterByThis");
  const filterByMonth = searchParams.get("filterByMonth");

  let startDate, endDate, queryKey, queryFn;

  if (filterByThis) {
    // Use "filterByThis" option
    switch (filterByThis) {
      case "today":
        startDate = startOfDay(new Date());
        break;
      case "thisWeek":
        startDate = startOfWeek(new Date());
        break;
      case "thisMonth":
        startDate = startOfMonth(new Date());
        break;
      case "thisYear":
        startDate = startOfYear(new Date());
        break;
      default:
        // Fallback if an unrecognized value is provided
        startDate = subDays(new Date(), 1);
    }
    endDate = new Date();
    queryKey = ["orders", "filterByThis", filterByThis];
    queryFn = () =>
      getOrdersBetweenDates(startDate.toISOString(), endDate.toISOString());
  } else if (filterByMonth) {
    // Use "filterByMonth" filter (assume current year)
    const currentYear = new Date().getFullYear();
    const month = Number(filterByMonth); // month as 1-12
    startDate = new Date(currentYear, month - 1, 1);
    endDate = endOfMonth(startDate);
    queryKey = ["orders", "filterByMonth", filterByMonth];
    queryFn = () =>
      getOrdersBetweenDates(startDate.toISOString(), endDate.toISOString());
  } else {
    // Default: use today
    startDate = startOfDay(new Date());
    endDate = new Date();
    queryKey = ["orders", "filterByThis", "today"];
    queryFn = () =>
      getOrdersBetweenDates(startDate.toISOString(), endDate.toISOString());
  }

  const { isLoading, data: orders } = useQuery({
    queryKey,
    queryFn,
  });

  const numDays = differenceInDays(endDate, startDate) + 1;

  //   console.log(filterByThis, filterByMonth, startDate, endDate);

  return { isLoading, orders, startDate, endDate, numDays };
}
