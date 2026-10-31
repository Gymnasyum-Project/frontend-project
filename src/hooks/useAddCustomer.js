import { useCallback, useState } from "react";
import { addCustomer } from "../services/customerService";

export function useAddCustomer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await addCustomer(payload);
      return res;
    } catch (err) {
      setError(err.res?.data?.message ?? err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return { submit, loading, error };
}
