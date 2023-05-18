import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon'
import './NavBar.css'
import { useSelector } from 'react-redux'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'
import React, { useEffect } from "react";

const NavBar = ({ setSettingsFocus, theme, setTheme }) => {
  const isLoggedIn = useSelector(s => s.userState.isLoggedIn);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      let div = document.querySelector('#butt');
      div.className = 'dark';
    } else {
      let div = document.querySelector('#butt');
      div.className = 'light';
    }
  }, [theme]);

  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <Link className='logo' to='/'>
          Synte&gt;&lt;t
        </Link>
        <DarkModeToggle theme={theme} setTheme={setTheme} />
        <div id='butt' className='button-container'>
          <Link to='/leaderboard'>leaderboard</Link>
          <Link to='/'>game</Link>
          <Link onClick={() => setSettingsFocus(true)}>settings</Link>
          {!isLoggedIn && <Link to='/login'>login</Link>}
          {!isLoggedIn && <Link to='/join'>join</Link>}
          <Icon isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
