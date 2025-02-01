import Table from "../../ui/Table";
import StockRow from "./StockRow";
import { useStock } from "./useStock";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const StyledDiv = styled.div`
  font-size: 1.2rem;
`;

function StockTable() {
  const { isLoadingStock, stock } = useStock();
  if (isLoadingStock) return <Spinner />;
  return (
    <>
      <Table columns="2fr 5fr 3fr 1fr">
        <Table.Header>
          <div>Item</div>
          <div>Price</div>
          <div>quantity</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={stock}
          render={(item) => <StockRow item={item} key={item.id} />}
        />
      </Table>
      <StyledDiv>* denotes there is hold stock</StyledDiv>
    </>
  );
}

export default StockTable;
