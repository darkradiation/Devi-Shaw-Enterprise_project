// Searchbar.jsx
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: 0.5rem 1.2rem;
  gap: 1.6rem;
  &:hover,
  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
`;

const Input = styled.input`
  font-size: 1.3rem;
  border: none;
  outline: none;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  width: 100%;
  &:focus {
    outline: none;
  }
`;

function Searchbar({ placeholder = "Search by name" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // setSearchParams({ search: e.target.value });
    searchParams.set("search", e.target.value);
    // a new search starts from the first page (page 2 may not exist any more)
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <StyledSearchContainer>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
      />
      <div>
        <FaSearch />
      </div>
    </StyledSearchContainer>
  );
}

export default Searchbar;
