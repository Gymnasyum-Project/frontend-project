import { useCallback, useState } from "react";
import { getDraftFollowUp } from "../../services/priorityFollowUpService";

export default function useGetDraft() {
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDraft = useCallback((customerId) => {
    setLoading(true);
    setError(null);
    return getDraftFollowUp(customerId)
      .then((res) => {
        setDraft(res);
        return res;
      })
      .catch((err) => {
        setError(err.message);
        return null;
      })
      .finally(() => setLoading(false));
  }, []);

  return { draft, loading, error, fetchDraft };
}
