import { useState, useEffect } from "react";
import { getPackages } from "../services/packageService";

export function useGetPackage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPackages([]);
    let cancelled = false;
    setLoading(true);

    getPackages()
      .then((data) => {
        if (!cancelled) {
          setPackages(data);
        }
      })
      .catch(() => !cancelled && setPackages([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);
  return { packages, loading };
}
