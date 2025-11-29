import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state that persists in localStorage.
 * * @param {string} key The key under which the data is stored in localStorage.
 * @param {any} initialValue The default value if nothing is found in localStorage.
 * @returns {[any, function]} The state value and the setter function.
 */
function useLocalStorage(key, initialValue) {
  // 1. Initialize State with data from Local Storage (or initial value)
  const [value, setValue] = useState(() => {
    try {
      // Get stored value by key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return initialValue if null/undefined
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error occurs (e.g., localStorage not available), return initial value
      console.error("Error reading localStorage key “" + key + "”:", error);
      return initialValue;
    }
  });

  // 2. Use useEffect to save the state to Local Storage whenever it changes
  useEffect(() => {
    try {
      // Convert the state value to a string
      const serializedValue = JSON.stringify(value);
      // Store the string under the given key
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage key “" + key + "”:", error);
    }
  }, [key, value]); // Dependency array: runs every time 'key' or 'value' changes

  return [value, setValue];
}

export default useLocalStorage;