import { useState, useEffect, useCallback } from "react";
import { getUser, updateUser } from "../../services/SettingService";

export function useSetting() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // true di awal
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    return getUser()
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    return fetchData();
  }, [fetchData]);

  const updateSetting = useCallback(async (payload) => {
    const res = await updateUser(payload);
    setData((prev) => ({ ...prev, ...payload, ...(res ?? {}) }));
    return res;
  }, []);
  return { data, error, loading, refetch, updateSetting };
}
