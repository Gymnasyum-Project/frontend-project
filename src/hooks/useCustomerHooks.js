import { useState, useCallback, useEffect } from "react";
import { CustomerDummy } from "../services/dummyData/dashboardDummy";
import { getCustomer } from "../services/customerService";

const USE_DUMMY = false;

const loadCustomer = (params) =>
  USE_DUMMY
    ? new Promise((resolve) => setTimeout(() => resolve(CustomerDummy), 300))
    : getCustomer(params);

export default function useCustomerHooks(page = 1, limit = 20, search = "") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    let cancelled = false;

    loadCustomer({ page, limit, search })
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [page, limit, search]);

  useEffect(() => {
    const cancel = fetchData();
    return cancel;
  }, [fetchData]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}