import React, { useState } from 'react'
import './AccountManager.css'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setUserID } from '../../redux/user/userStateActions'
import { useNavigate } from 'react-router-dom'

const AccountManager = (props) => {
  const dispatch = useDispatch()
  //   const [username, setUsername] = useState(user.username);
  //   const [profilePic, setProfilePic] = useState(user.profilePic);
  //   const [isPrivate, setIsPrivate] = useState(user.isPrivate);
  //   const [resetHistory, setResetHistory] = useState(false);

  const navivate = useNavigate()
  const handleUsernameChange = event => {}

  const handleProfilePicChange = event => {}

  const handlePrivateChange = event => {}

  const handleResetHistoryChange = event => {}

  const handleSave = () => {}

  const handleLogout = () => {
    window.localStorage.removeItem(`authToken`)
    dispatch(setUserID(undefined))
    dispatch(setLoggedIn(false))
    navivate('/')
  }

  return (
    <div className='account-manager'>
      <h2>Account Manager</h2>
      <div className='input-wrapper'>
        <label htmlFor='username-input'>Username:</label>
        <input
          id='username-input'
          type='text'
          value=''
          onChange={handleUsernameChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='profile-pic-input'>Profile Picture:</label>
        <input
          id='profile-pic-input'
          type='text'
          value=''
          onChange={handleProfilePicChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='private-checkbox'>Private Account:</label>
        <input
          id='private-checkbox'
          type='checkbox'
          checked={false}
          onChange={handlePrivateChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='reset-history-checkbox'>Reset Account History:</label>
        <input
          id='reset-history-checkbox'
          type='checkbox'
          checked={false}
          onChange={handleResetHistoryChange}
        />
      </div>
      <button className='save-button' onClick={handleSave}>
        Save Changes
      </button>
      <button
        className='logout-button'
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  )
}

export default AccountManager
