import React, { useEffect } from 'react';

const DarkModeToggle = ({ theme, setTheme }) => {
  useEffect(() => {}, [theme]);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

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
  );
};

export default DarkModeToggle;