import {
  format,
  subDays,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  parseISO,
} from "date-fns";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getPeriods } from "./useFilteredOrders";

const RANGES = [
  { value: "today", label: "Today" },
  { value: "7days", label: "7 days" },
  { value: "thisMonth", label: "This month" },
  { value: "custom", label: "Custom" },
];

const DATE_FORMAT = "yyyy-MM-dd";

const StyledFilterMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Segments = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.3rem;
  gap: 0.3rem;
  border: 1px solid var(--color-grey-100);
  border-radius: 100px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
`;

const Segment = styled.button`
  font-size: 1.3rem;
  font-weight: 500;
  padding: 1rem 0.4rem;
  border-radius: 100px;
  border: none;
  background-color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "transparent"};
  color: ${(props) => (props.$active ? "#fff" : "var(--color-grey-700)")};
  transition:
    background-color 0.2s,
    color 0.2s;
`;

const Dates = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  & label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 1.1rem;
    color: var(--color-grey-500);
  }

  & input {
    font-size: 1.3rem;
    padding: 0.8rem;
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
  }

  .dark-mode & input {
    color-scheme: dark;
  }
`;

const ChipRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const PeriodButton = styled.button`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  border-radius: 100px;
  border: 1px solid var(--color-brand-600);
  background-color: transparent;
  color: var(--color-brand-600);

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Chip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  padding: 0.5rem 1.2rem;
  border-radius: 100px;
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function chipLabel(range, from, to) {
  const today = new Date();
  let start = today;
  let end = today;
  if (range === "7days") start = subDays(today, 6);
  else if (range === "thisMonth") {
    start = startOfMonth(today);
    end = endOfMonth(today);
  } else if (range === "custom" && from && to) {
    start = parseISO(from);
    end = parseISO(to);
  }
  const days = differenceInDays(end, start) + 1;
  const fmt = (d) => format(d, "d MMM");
  const dates =
    days === 1 ? format(start, "EEE, d MMM") : `${fmt(start)} – ${fmt(end)}`;
  return `${dates} · ${days} ${days === 1 ? "day" : "days"}`;
}

function DashboardFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const range = searchParams.get("range") || "today";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  function update(changes) {
    Object.entries(changes).forEach(([key, value]) =>
      value ? searchParams.set(key, value) : searchParams.delete(key),
    );
    setSearchParams(searchParams);
  }

  const periods = getPeriods(range, from, to);
  const hasNext = periods.nextStart <= new Date();

  // jump to the period just before / after the one on screen (as a custom range)
  function goToPeriod(start, end) {
    update({
      range: "custom",
      from: format(start, DATE_FORMAT),
      to: format(end, DATE_FORMAT),
    });
  }

  function selectRange(value) {
    if (value === "custom") {
      // start from the last 7 days so the chart is never blank
      const today = new Date();
      update({
        range: value,
        from: from || format(subDays(today, 6), DATE_FORMAT),
        to: to || format(today, DATE_FORMAT),
      });
    } else update({ range: value, from: "", to: "" });
  }

  return (
    <StyledFilterMenu>
      <Segments>
        {RANGES.map((r) => (
          <Segment
            key={r.value}
            $active={range === r.value}
            onClick={() => selectRange(r.value)}
          >
            {r.label}
          </Segment>
        ))}
      </Segments>
      {range === "custom" && (
        <Dates>
          <label>
            From
            <input
              type="date"
              value={from}
              max={to || undefined}
              onChange={(e) => update({ from: e.target.value })}
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={to}
              min={from || undefined}
              onChange={(e) => update({ to: e.target.value })}
            />
          </label>
        </Dates>
      )}
      <ChipRow>
        <Chip>
          <HiOutlineCalendarDays />
          {chipLabel(range, from, to)}
        </Chip>
        <PeriodButton
          onClick={() =>
            goToPeriod(
              periods.prevStart,
              // from "This month", step to the whole of last month
              range === "thisMonth"
                ? endOfMonth(periods.prevStart)
                : periods.prevEnd,
            )
          }
        >
          ‹ Previous
        </PeriodButton>
        <PeriodButton
          disabled={!hasNext}
          onClick={() => goToPeriod(periods.nextStart, periods.nextEnd)}
        >
          Next ›
        </PeriodButton>
      </ChipRow>
    </StyledFilterMenu>
  );
}

export default DashboardFilter;
