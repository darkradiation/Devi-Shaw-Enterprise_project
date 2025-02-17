import styled from "styled-components";
import FilterBy from "../../ui/FilterBy";

const StyledFilterMenu = styled.div`
  display: flex;
  gap: 0.7rem;
`;

function DashboardFilter() {
  return (
    <StyledFilterMenu>
      <FilterBy
        filterField="filterByThis"
        removeField="filterByMonth"
        options={[
          { value: "0", label: "null" },
          { value: "today", label: "today" },
          { value: "thisWeek", label: "this week" },
          { value: "thisMonth", label: "this month" },
          { value: "thisYear", label: "this year" },
        ]}
      />
      <FilterBy
        filterField="filterByMonth"
        removeField="filterByThis"
        options={[
          { value: "0", label: "null" },
          { value: "1", label: "jan" },
          { value: "2", label: "feb" },
          { value: "3", label: "mar" },
          { value: "4", label: "apr" },
          { value: "5", label: "may" },
          { value: "6", label: "jun" },
          { value: "7", label: "jul" },
          { value: "8", label: "aug" },
          { value: "9", label: "sep" },
          { value: "10", label: "oct" },
          { value: "11", label: "nov" },
          { value: "12", label: "dec" },
        ]}
      />
    </StyledFilterMenu>
  );
}

export default DashboardFilter;
