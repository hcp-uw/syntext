import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setUserID } from './redux/user/userActions'
import NavBar from './Components/NavBar/NavBar'
import Main from './Pages/Main'
import AccountPage from './Pages/AccountPage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import LeaderboardPage from './Pages/LeaderboardPage'
import PopUpController from './Components/PopupController/PopUpController'
import { getCurrentUser } from './services/userService'


const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(s => s.userState.isLoggedIn);
  const [settingsFocus, setSettingsFocus] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'cherry'
  );

  useEffect(() => {
    console.log('testing meow');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `themes/${theme}.css`;
    const head = document.head  || document.getElementsByTagName('head')[0];
    const prevLink = head.querySelector('link[data-theme]');
    if (prevLink) {
      head.removeChild(prevLink);
    }
    link.setAttribute('data-theme', theme);
    head.appendChild(link);
    return () => {
      head.removeChild(link);
    };
  }, [theme])

  useEffect(() => {
    const token = window.localStorage.getItem('authToken');
    if (!token) return;
    getCurrentUser().then( u => {
      if (!u.success) return;
      dispatch(setUserID(u.userID))
      dispatch(setLoggedIn(true));
    });
  }, [])

  return (
    <div className='app-container'>
      <NavBar setSettingsFocus={setSettingsFocus} theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path='/' element={<Main theme={theme}/>} />
        <Route path='/account' element={isLoggedIn ? <AccountPage /> : <LoginPage/>} />
        <Route path='/join' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/leaderboard' element={<LeaderboardPage />} />
      </Routes>
      <PopUpController
        settingsFocus={settingsFocus}
        setSettingsFocus={setSettingsFocus}
      />
    </div>
  )
}

export default App;