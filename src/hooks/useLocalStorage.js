import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (!key) return initialValue;
    const item = localStorage.getItem(key);
    if (item === null) return initialValue;
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  });
  useEffect(() => {
    if (!key) return;
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      );
    }
  }, [key, value]);
  return { value, setValue };
}
