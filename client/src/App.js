import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setUserID } from './redux/user/userStateActions'
import NavBar from './Components/NavBar/NavBar'
import Main from './Pages/Main'
import AccountPage from './Pages/AccountPage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import LeaderboardPage from './Pages/LeaderboardPage'
import PopUpController from './Components/PopupController/PopUpController'
import { getCurrentUser, refreshCurrentSession } from './services/userService'


const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(s => s.userState.isLoggedIn);
  const [settingsFocus, setSettingsFocus] = useState(false);
  const [refresh, setRefresh] = useState(false); //just a dummy variable...will fix later 
  console.log('above ', isLoggedIn)
  
  // TODO:
  // need to figure out a way to refresh better
  useEffect(() => {
    const token = window.localStorage.getItem('authToken');
    const userID = window.localStorage.getItem('userID');
    console.log(userID, token)
    if (!token || !userID) return;
    getCurrentUser(userID).then( async u => {
      if (u && u.success) {
        dispatch(setUserID(u.userID))
        dispatch(setLoggedIn(true));
      } else {
        const refresh = await refreshCurrentSession(token, userID);
        if (refresh.success) {
          window.localStorage.setItem('authToken', refresh.token);
          dispatch(setUserID(u.userID))
          dispatch(setLoggedIn(true));
          setRefresh(refresh => !refresh);
        } else {
          dispatch(setUserID(undefined))
          dispatch(setLoggedIn(false));
        }
      }
    });
  }, [])
  console.log('below ', isLoggedIn)

  return (
    <div className='app-container'>
      <NavBar setSettingsFocus={setSettingsFocus} />
      <Routes>
        <Route path='/' element={<Main />} />
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

export default App
