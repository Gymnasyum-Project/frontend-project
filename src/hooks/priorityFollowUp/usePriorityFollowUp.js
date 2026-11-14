import { useCallback, useEffect, useState } from "react";
import { getPriorityFollowUp } from "../../services/priorityFollowUpService";

export default function usePriorityFollowUp() {
  const [dataFollowUp, setDataFollowUp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    return getPriorityFollowUp()
      .then((res) => {
        setDataFollowUp(res);
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
    fetchData();
  }, [fetchData]);
  return { dataFollowUp, loading, error, refetch };
}
