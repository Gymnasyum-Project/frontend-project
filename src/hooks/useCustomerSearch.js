import { useState, useEffect } from "react";
import { getCustomer } from "../services/customerService";
import useDebounce from "./useDebounce";

export function useCustomerSearch() {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);
  const debounced = useDebounce(searchText, 400);

  useEffect(() => {
    let cancelled = false;
    getCustomer({ search: debounced, limit: 10 })
      .then((res) => {
        if (!cancelled)
          setOptions(
            res.data.map((c) => ({ value: c.id, label: c.full_name })),
          );
      })
      .catch(() => {
        if (!cancelled) setOptions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  return { options, setSearchText };
}
