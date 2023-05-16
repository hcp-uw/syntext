import React, { useEffect } from 'react';

const DarkModeToggle = ({ theme, setTheme }) => {
  useEffect(() => {}, [theme]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <button onClick={toggleTheme}>
      {theme ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;