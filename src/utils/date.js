import { add, format } from "date-fns";

export function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

// Dates saved inside JSON (e.g. payments) have no timezone suffix but are UTC.
export function parseDbDate(value) {
  if (!value) return null;
  const hasZone = /([zZ]|[+-]\d{2}:?\d{2})$/.test(value);
  return new Date(hasZone ? value : `${value}Z`);
}

// "Nov 04, 2026 · 11:07 PM" in local time; date only for old records that were
// saved at exactly midnight UTC (they never had a real time)
export function formatDateTime(value) {
  const date = parseDbDate(value);
  if (!date || isNaN(date)) return "";
  const isDateOnly =
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0;
  return format(date, isDateOnly ? "MMM dd, yyyy" : "MMM dd, yyyy · h:mm a");
}
