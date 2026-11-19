import { useState } from "react";
import { getReminders, updateReminder } from "../../services/reminderService";
import { useCallback } from "react";
import { useEffect } from "react";

export function useUpdateReminder() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    return getReminders()
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
  const updateReminderCustomer = useCallback(async (payload) => {
    const res = await updateReminder(payload);
    setData((prev) => ({ ...prev, ...payload, ...(res ?? {}) }));
    return res;
  }, []);
  return { data, error, loading, refetch, updateReminderCustomer };
}
