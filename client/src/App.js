import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setUserID } from './redux/user/userStateActions'
import NavBar from './Components/NavBar/NavBar'
import Main from './Pages/Main'
import AccountPage from './Pages/AccountPage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import LeaderboardPage from './Pages/LeaderboardPage'
import PopUpController from './Components/PopupController/PopUpController'
import { getCurrentUser } from './services/userService'

const App = () => {
  const [settingsFocus, setSettingsFocus] = useState(false)
  const dispatch = useDispatch(); 
  useEffect(() => {
    const token = window.localStorage.getItem('authToken');
    if (!token) return;
    getCurrentUser().then( u => {
      if (u.success) return;
      dispatch(setUserID(u.userID))
      dispatch(setLoggedIn(true));
    });
  }, [])

  return (
    <div className='app-container'>
      <NavBar setSettingsFocus={setSettingsFocus} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/account' element={<AccountPage />} />
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

export default App
