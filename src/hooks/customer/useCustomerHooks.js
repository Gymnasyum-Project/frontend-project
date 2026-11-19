import { useState, useCallback, useEffect } from "react";
import { CustomerDummy } from "../../services/dummyData/dashboardDummy";
import { getCustomer } from "../../services/customerService";

const USE_DUMMY = false;

const RISK_PARAM_MAP = {
  Semua: undefined,
  "At Risk": "at_risk",
  "Need Attention": "need_attention",
  Active: "active",
};

const loadCustomer = (params) =>
  USE_DUMMY
    ? new Promise((resolve) => setTimeout(() => resolve(CustomerDummy), 300))
    : getCustomer(params);

export default function useCustomerHooks(
  page = 1,
  limit = 20,
  search = "",
  activeLabel = "Semua",
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    let cancelled = false;
    const isLoadMore = page > 1;

    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    const params = {
      page,
      limit,
      sort: "priority",
      ...(search && { search }),
      ...(RISK_PARAM_MAP[activeLabel] && { risk: RISK_PARAM_MAP[activeLabel] }),
    };

    loadCustomer(params)
      .then((res) => {
        if (cancelled) return;

        setData((prev) => {
          if (isLoadMore && prev?.data) {
            return {
              ...res,
              data: [...prev.data, ...(res.data ?? [])],
            };
          }
          return res;
        });
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page, limit, search, activeLabel]);

  useEffect(() => {
    const cancel = fetchData();
    return cancel;
  }, [fetchData]);

  const refetch = useCallback(() => {
    setError(null);
    fetchData();
  }, [fetchData]);

  return { data, loading, loadingMore, error, refetch };
}
