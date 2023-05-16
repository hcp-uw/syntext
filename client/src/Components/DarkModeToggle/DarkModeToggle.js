import React, { useState } from 'react';

const DarkModeToggle = ({ theme, setTheme }) => {

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme}>
      {theme ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;