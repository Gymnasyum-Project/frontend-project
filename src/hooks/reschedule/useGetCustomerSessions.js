import { useState, useEffect } from "react";
import { getCustomerSessions } from "../../services/attendanceService";

export function useGetCustomerSessions(customerId) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSessions([]);
    setError(null);

    if (!customerId) return;

    let cancelled = false;
    setLoading(true);

    getCustomerSessions(customerId)
      .then((data) => {
        if (!cancelled) setSessions(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // dijalankan saat customerId berubah atau komponen ditutup
    return () => {
      cancelled = true;
    };
  }, [customerId]);

  return { sessions, loading, error };
}
