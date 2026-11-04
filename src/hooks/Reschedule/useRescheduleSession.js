import { useState, useCallback } from "react";
import { rescheduleSession } from "../../services/attendanceService";

export function useRescheduleSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // return true kalau berhasil, false kalau gagal
  const submit = useCallback(async (attendanceId, payload) => {
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      await rescheduleSession(attendanceId, payload);
      return true;
    } catch (err) {
      const apiError = err.response?.data?.error;
      if (apiError?.details?.length) {
        setFieldErrors(
          apiError.details.reduce((acc, detail) => {
            acc[detail.field] = detail.message;
            return acc;
          }, {}),
        );
      } else {
        setError(apiError?.message || "Gagal menyimpan reschedule.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error, fieldErrors };
}
