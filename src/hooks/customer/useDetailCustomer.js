import { useCallback, useEffect, useState } from "react";
import { getCustomerById } from "../../services/customerService";

export function useDetailCustomer(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    (isBackground = false) => {
      if (!isBackground) {
        setLoading(true);
      }
      return getCustomerById(id)
        .then((res) => {
          setData(res);
          setError(null);
        })
        .catch((err) => setError(err.res?.data?.message || err.message))
        .finally(() => {
          if (!isBackground) {
            setLoading(false);
          }
        });
    },
    [id],
  );

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  // Refetch berjalan di latar belakang tanpa memicu layar loading penuh
  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  return { data, loading, error, refetch };
}
