// useFilteredOrders.js
import { useQuery } from "@tanstack/react-query";
import {
  subDays,
  subMonths,
  addDays,
  startOfDay,
  startOfMonth,
  endOfDay,
  endOfMonth,
  parse,
  differenceInDays,
} from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersBetweenDates } from "../../services/apiOrders";

// current period and the period before it, for the given filter params
export function getPeriods(range, from, to) {
  let startDate = startOfDay(new Date());
  let endDate = new Date();
  let prevStart = startOfDay(subDays(startDate, 1));
  let prevEnd = endOfDay(prevStart);
  let compareLabel = "yesterday";

  if (range === "7days") {
    startDate = startOfDay(subDays(new Date(), 6));
    prevStart = subDays(startDate, 7);
    prevEnd = endOfDay(subDays(startDate, 1));
    compareLabel = "previous 7 days";
  } else if (range === "thisMonth") {
    startDate = startOfMonth(new Date());
    endDate = endOfMonth(startDate);
    // compare with the same number of days (so far) from the start of last month
    prevStart = subMonths(startDate, 1);
    prevEnd = endOfDay(
      new Date(
        Math.min(
          addDays(prevStart, differenceInDays(new Date(), startDate)),
          endOfMonth(prevStart),
        ),
      ),
    );
    compareLabel = "last month";
  } else if (range === "custom" && from && to) {
    // inputs are yyyy-MM-dd; parse as local dates
    startDate = startOfDay(parse(from, "yyyy-MM-dd", new Date()));
    endDate = endOfDay(parse(to, "yyyy-MM-dd", new Date()));
    const span = differenceInDays(endDate, startDate) + 1;
    prevStart = subDays(startDate, span);
    prevEnd = endOfDay(subDays(startDate, 1));
    compareLabel = "previous period";
  }

  // the period right after this one, never reaching past today
  const span = differenceInDays(endDate, startDate) + 1;
  const nextStart = startOfDay(addDays(startDate, span));
  const nextEnd = endOfDay(
    new Date(Math.min(addDays(nextStart, span - 1), new Date())),
  );

  return {
    startDate,
    endDate,
    prevStart,
    prevEnd,
    nextStart,
    nextEnd,
    compareLabel,
  };
}

export function useFilteredOrders() {
  const [searchParams] = useSearchParams();
  const range = searchParams.get("range");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { startDate, endDate, prevStart, prevEnd, compareLabel } = getPeriods(
    range,
    from,
    to,
  );

  const queryKey = ["orders", "range", range, from, to];
  const queryFn = () =>
    getOrdersBetweenDates(startDate.toISOString(), endDate.toISOString());

  const { isLoading, data: orders } = useQuery({
    queryKey,
    queryFn,
  });

  // previous period, used for the change indicators; never blocks the page
  const { data: prevOrders } = useQuery({
    queryKey: ["orders", "prev", range, from, to],
    queryFn: () =>
      getOrdersBetweenDates(prevStart.toISOString(), prevEnd.toISOString()),
  });

  const numDays = differenceInDays(endDate, startDate) + 1;

  return {
    isLoading,
    orders,
    prevOrders,
    compareLabel,
    startDate,
    endDate,
    numDays,
  };
}
