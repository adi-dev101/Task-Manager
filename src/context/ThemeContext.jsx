import React, { createContext, useContext } from 'react';
import useLocalStorage from '../Custom hooks/useLocalStorage'; // Check this path too!

// 1. Create the Context object
const ThemeContext = createContext();

// 2. Custom hook for consuming the context (MUST be exported!)
export const useTheme = () => { // <-- The 'export' keyword here is crucial
  return useContext(ThemeContext);
};

// 3. Theme Provider Component (MUST be exported!)
export const ThemeProvider = ({ children }) => { // <-- The 'export' keyword here is crucial
  const [theme, setTheme] = useLocalStorage('taskManagerTheme', 'dark');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};