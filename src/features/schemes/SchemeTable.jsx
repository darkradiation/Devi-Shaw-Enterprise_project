import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import SchemeRow from "./SchemeRow";

import { useSchemes2 } from "./useSchemes2";
import { useSchemes1 } from "./useSchemes1";
import { useSchemes3 } from "./useSchemes3";

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

function SchemeTable() {
  const { isLoadingSchemes1, schemes_1 } = useSchemes1();
  const { isLoadingSchemes2, schemes_2 } = useSchemes2();
  const { isLoadingSchemes3, schemes_3 } = useSchemes3();

  const [searchParams] = useSearchParams();
  if (isLoadingSchemes2 || isLoadingSchemes1 || isLoadingSchemes3)
    return <Spinner />;

  const scheme_type = searchParams.get("scheme_type") || "schemes_1";
  const schemes =
    scheme_type === "schemes_1"
      ? schemes_1
      : scheme_type === "schemes_2"
      ? schemes_2
      : schemes_3;

  const scheme_item_id = searchParams.get("scheme_item_id") || "1";
  const schemeIndex = schemes.findIndex(
    (scheme) => scheme.item_id === Number(scheme_item_id)
  );
  // console.log(schemeIndex);
  if (schemeIndex === -1) return <Heading as="h3"> No schemes found</Heading>;
  const scheme = schemes[schemeIndex];
  const scheme_item_name = scheme.stock.item_name;
  // console.log(schemes);

  return (
    <div>
      {!scheme.free_1pt &&
      !scheme.free_2pt &&
      !scheme.free_3pt &&
      !scheme.free_4pt &&
      !scheme.free_5pt &&
      !scheme.free_6pt &&
      !scheme.free_10pt &&
      !scheme.free_12pt ? (
        <Heading as="h3"> No schemes found</Heading>
      ) : (
        <Table columns="1fr 4fr 5fr 1fr  ">
          <Table.Header>
            <div>level</div>
            <div>free </div>
            <div>cost</div>
            <div></div>
          </Table.Header>
          <StyledBody>
            {scheme.free_1pt && (
              <SchemeRow
                scheme={scheme.free_1pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
            {scheme.free_2pt && (
              <SchemeRow
                scheme={scheme.free_2pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
            {scheme.free_3pt && (
              <SchemeRow
                scheme={scheme.free_3pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
            {scheme.free_4pt && (
              <SchemeRow
                scheme={scheme.free_4pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
            {scheme.free_5pt && (
              <SchemeRow
                scheme={scheme.free_5pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
            {scheme.free_6pt && (
              <SchemeRow
                scheme={scheme.free_6pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
            {scheme.free_10pt && (
              <SchemeRow
                scheme={scheme.free_10pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
            {scheme.free_12pt && (
              <SchemeRow
                scheme={scheme.free_12pt}
                scheme_item_id={scheme_item_id}
                scheme_item_name={scheme_item_name}
              />
            )}
          </StyledBody>
        </Table>
      )}
    </div>
  );
}

export default SchemeTable;
