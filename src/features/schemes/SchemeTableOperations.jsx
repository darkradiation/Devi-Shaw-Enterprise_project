import Filter from "../../ui/Filter";
import Row from "../../ui/Row";
import { useStock } from "../stock/useStock";

import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  gap: -2rem;
`;

function SchemeTableOperations() {
  const { isLoadingStock, stock } = useStock();
  if (isLoadingStock) return;
  return (
    <StyledDiv>
      <Row type="horizontal">
        <Filter
          filterField="scheme_type"
          options={[
            { value: "schemes_near", label: "Near" },
            { value: "schemes_far", label: "Far" },
          ]}
        />
      </Row>

      <Row type="horizontal">
        <Filter
          filterField="scheme_item_id"
          options={stock.map((item) => ({
            value: item.id,
            label: item.item_name,
          }))}
        />
      </Row>
    </StyledDiv>
  );
}

export default SchemeTableOperations;
