import React from 'react';
// The import MUST use curly braces {} because it's a named export
import { useTheme } from '../context/ThemeContext'; 

const ThemeToggle = () => {
  // Consume the context values
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {/* Icon changes based on current theme */}
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;