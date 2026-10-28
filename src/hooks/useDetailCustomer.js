import { useCallback, useEffect, useState } from "react";
import { getCustomerById } from "../services/customerService";

export default function useDetailCustomer(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    return getCustomerById(id)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => setError(err.res?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchData();
  }, [fetchData]);
  return { data, loading, error, refetch };
}
