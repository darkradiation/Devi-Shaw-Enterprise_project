import { useSearchParams } from "react-router-dom";
import { useUpdateSchemeNear } from "./useUpdateSchemeNear";
import { useUpdateSchemeFar } from "./useUpdateSchemeFar";

function useDeleteScheme({ schemeItemId, scheme_level }) {
  const [searchParams] = useSearchParams();
  const scheme_type = searchParams.get("scheme_type") || "schemes_near";

  const { isUpdatingSchemeNear, handleUpdateSchemeNear } =
    useUpdateSchemeNear();
  const { isUpdatingSchemeFar, handleUpdateSchemeFar } = useUpdateSchemeFar();
  const isDeleting = isUpdatingSchemeNear || isUpdatingSchemeFar;

  function handleDelete() {
    if (scheme_type === "schemes_near") {
      handleUpdateSchemeNear({
        schemeItemId,
        scheme_level,
      });
    } else {
      handleUpdateSchemeFar({
        schemeItemId,
        scheme_level,
      });
    }
  }
  return { isDeleting, handleDelete };
}

export default useDeleteScheme;
