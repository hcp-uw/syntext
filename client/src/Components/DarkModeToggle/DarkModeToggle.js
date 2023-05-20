import React, { useEffect } from 'react';
import Toggle from "react-toggle";

const DarkModeToggle = ({ theme, setTheme }) => {

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
    </button>
      // <Toggle
      //   checked={ theme === 'light' }
      //   onChange={({ target }) => setTheme(target.checked)}
      //   icons={{ checked: "🌙", unchecked: "🔆" }}
      //   aria-label="Dark mode toggle"
      // />
    
  );
};

export default DarkModeToggle;