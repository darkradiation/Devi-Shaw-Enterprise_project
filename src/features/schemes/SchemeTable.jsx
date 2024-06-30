import Table from "../../ui/Table";
import { useSchemesFar } from "./useSchemesFar";
import { useSchemesNear } from "./useSchemesNear";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import { useSearchParams } from "react-router-dom";
import SchemeRow from "./SchemeRow";
import styled from "styled-components";
const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

function SchemeTable() {
  const { isLoadingSchemesFar, schemes_far } = useSchemesFar();
  const { isLoadingSchemesNear, schemes_near } = useSchemesNear();

  const [searchParams] = useSearchParams();
  if (isLoadingSchemesFar || isLoadingSchemesNear) return <Spinner />;

  const scheme_type = searchParams.get("scheme_type") || "schemes_near";
  const schemes = scheme_type === "schemes_near" ? schemes_near : schemes_far;
  if (schemes.length === 0) return null;

  const scheme_item_id = searchParams.get("scheme_item_id") || "1";
  const schemeIndex = schemes.findIndex(
    (scheme) => scheme.item_id === Number(scheme_item_id)
  );
  const scheme = schemes[schemeIndex];
  console.log(schemes);
  console.log(scheme_item_id, schemeIndex, scheme);
  // return null;
  const scheme_item_name = scheme?.stock.item_name;
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
        <Heading as="h2"> No scheme </Heading>
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
