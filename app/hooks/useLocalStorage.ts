import { useState, useEffect } from "react";

const isBrowser = typeof window !== "undefined";

function useLocalStorage<T>(key: string, initialValue: T) {
  // Always initialize with the initialValue first
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Once the component mounts, hydrate the state from localStorage
  useEffect(() => {
    if (isBrowser) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    if (!isBrowser) {
      console.warn(`Tried to set localStorage key "${key}" during SSR`);
      return;
    }

    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in other tabs/windows
  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}
export default useLocalStorage;
