import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state with the initial value first
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // On mount (client-side), update the state with the localStorage value if it exists
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Update local storage whenever the stored value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
