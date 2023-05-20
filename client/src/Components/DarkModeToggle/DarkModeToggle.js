import React, { useEffect } from 'react';
import Toggle from "react-toggle";

const DarkModeToggle = ({ theme, setTheme }) => {

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('cherry');
    } else {
      setTheme('light');
    }
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'cherry' ? 'Cherry Blossom' : 'Light Mode'}
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