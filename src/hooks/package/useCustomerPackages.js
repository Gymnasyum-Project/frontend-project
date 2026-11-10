import { useState, useEffect } from "react";
import { getCustomerPackages } from "../../services/customerService";

export function useCustomerPackages(customerId) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPackages([]);
    if (!customerId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getCustomerPackages(customerId)
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
  }, [customerId]);
  return { packages, loading };
}
