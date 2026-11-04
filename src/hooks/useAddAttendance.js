import { useState, useCallback } from "react";
import { addAttendance } from "../services/attendanceService";

export function useAddAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const submit = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      return await addAttendance(payload);
    } catch (err) {
      const apiError = err.response?.data?.error;
      if (apiError?.details?.length) {
        const map = {};
        apiError.details.forEach((d) => {
          map[d.field] = d.message;
        });
        setFieldErrors(map);
      }
      setError(apiError?.message ?? err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return { submit, error, loading, fieldErrors };
}
