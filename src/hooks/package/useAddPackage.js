import { useCallback, useState } from "react";
import { addPackage } from "../../services/packageService";

export function useAddPackage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldError] = useState({});

  const submit = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setFieldError({});
    try {
      return await addPackage(payload);
    } catch (err) {
      const apiError = err.response?.data?.error;
      if (apiError?.details?.length) {
        const map = {};
        apiError.details.forEach((d) => {
          map[d.field] = d.message;
        });
        setFieldError(map);
      }
      setError(apiError?.message ?? err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return { submit, loading, error, fieldErrors };
}
