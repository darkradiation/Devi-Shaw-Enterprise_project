import Filter from "../../ui/Filter";
import Row from "../../ui/Row";
import { useStock } from "../stock/useStock";

import styled from "styled-components";

const StyledDiv = styled.div`
  /* margin: 0; */
`;

function SchemeTableOperations() {
  const { isLoadingStock, stock } = useStock();
  if (isLoadingStock) return;
  return (
    <StyledDiv>
      {/* <Row type="horizontal">
        <Filter
          filterField="scheme_type"
          options={[
            { value: "schemes_1", label: "1" },
            { value: "schemes_2", label: "2" },
            { value: "schemes_3", label: "3" },
          ]}
        />
      </Row> */}

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
