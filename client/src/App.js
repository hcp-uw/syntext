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
import MobilePage from './Pages/MobilePage'
import PopUpController from './Components/PopupController/PopUpController'
import { getCurrentUser, refreshCurrentSession } from './services/userService'

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((s) => s.userState.isLoggedIn)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    const token = window.localStorage.getItem('authToken')
    const userID = window.localStorage.getItem('userID')
    if (!token || !userID) return
    const fetchData = async () => {
      const u = await getCurrentUser(userID)
      if (u && u.success) {
        dispatch(setUserID(u.userID))
        dispatch(setLoggedIn(true))
      } else if (u && u.error === 'TokenExpired') {
        const refresh = await refreshCurrentSession(token, userID)
        if (refresh.success) {
          window.localStorage.setItem('authToken', refresh.token)
          dispatch(setUserID(refresh.userID))
          dispatch(setLoggedIn(true))
          setRefresh((refresh) => !refresh)
        } else {
          dispatch(setUserID(undefined))
          dispatch(setLoggedIn(false))
        }
      }
    }
    fetchData()

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, []) 

  const [settingsFocus, setSettingsFocus] = useState(false)
  const [refresh, setRefresh] = useState(false)

  return (
    <div className='app-container'>
      {isMobile ? null : <NavBar setSettingsFocus={setSettingsFocus} />}
      <Routes>
        <Route
          path='/'
          element={isMobile ? <MobilePage /> : <Main />}
        />
        <Route
          path='/account'
          element={isLoggedIn ? <AccountPage /> : <LoginPage />}
        />
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
