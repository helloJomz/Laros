import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set debouncedValue to the value after the specified delay
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on every render before setting a new timeout
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return { debouncedValue };
};
