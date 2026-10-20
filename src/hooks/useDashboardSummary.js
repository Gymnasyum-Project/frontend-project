import { useCallback, useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import { dashboardDummy } from "../services/dummyData/dashboardDummy";

const USE_DUMMY = true;

const loadSummary = () =>
  USE_DUMMY
    // ? new Promise((_,reject) => setTimeout(() => reject(new Error("Tidak Ada Jarigan")), 3000)) //test error 
    ? new Promise((resolve) => setTimeout(() => resolve(dashboardDummy), 3000))
    : getDashboardSummary();

export default function useDashboardSummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    return loadSummary()
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

  // Dipanggil dari tombol "Coba lagi" (di event handler, bukan di effect)
  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}