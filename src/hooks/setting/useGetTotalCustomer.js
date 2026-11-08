import { getCustomer } from "../../services/customerService";
import { useState, useEffect } from "react";

export const useGetTotalCustomer = () => {
  const [totalCustomer, setData] = useState();
  const [loadingCustomer, setLoading] = useState(true);
  const [errorCustomer, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchTotalCustomer = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getCustomer();
        const total = result.meta.total;
        if (!ignore) setData(total ?? null);
      } catch (error) {
        if (!ignore) setError(error.message || "Gagal Memuat Data");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchTotalCustomer();
    return () => {
      ignore = true;
    };
  }, []);
  return { totalCustomer, loadingCustomer, errorCustomer };
};
