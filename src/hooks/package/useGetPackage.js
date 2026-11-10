import { useState, useEffect, useCallback } from "react";
import { getPackages } from "../../services/packageService";

export function useGetPackage(status) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getPackages({ status });
        if (!ignore) setPackages(data);
      } catch (err) {
        if (!ignore) setError(err.message ?? "Gagal memuat paket");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [status, reloadKey]);

  return { packages, loading, error, refetch };
}
