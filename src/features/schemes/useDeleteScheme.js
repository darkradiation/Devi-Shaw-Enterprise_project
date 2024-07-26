import { useSearchParams } from "react-router-dom";
import { useUpdateScheme1 } from "./useUpdateScheme1";
import { useUpdateScheme2 } from "./useUpdateScheme2";
import { useUpdateScheme3 } from "./useUpdateScheme3";

function useDeleteScheme({ schemeItemId, scheme_level }) {
  const [searchParams] = useSearchParams();
  const scheme_type = searchParams.get("scheme_type") || "schemes_1";

  const { isUpdatingScheme1, handleUpdateScheme1 } = useUpdateScheme1();
  const { isUpdatingScheme2, handleUpdateScheme2 } = useUpdateScheme2();
  const { isUpdatingScheme3, handleUpdateScheme3 } = useUpdateScheme3();
  const isDeleting =
    isUpdatingScheme1 || isUpdatingScheme2 || isUpdatingScheme3;

  function handleDelete() {
    if (scheme_type === "schemes_1") {
      handleUpdateScheme1({
        schemeItemId,
        scheme_level,
      });
    } else if (scheme_type === "schemes_2") {
      handleUpdateScheme2({
        schemeItemId,
        scheme_level,
      });
    } else {
      handleUpdateScheme3({
        schemeItemId,
        scheme_level,
      });
    }
  }
  return { isDeleting, handleDelete };
}

export default useDeleteScheme;
