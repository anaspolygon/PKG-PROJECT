/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export function useLocalStorage(key: string) {
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue) {
        const parsed = JSON.parse(storedValue);
        setValue(parsed);
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
  }, [key]);

  return value;
}
