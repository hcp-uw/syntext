import { useState } from 'react'
import { authenticate, getCurrentUser } from '../../services/userService'
import './Login.css'
import { useDispatch } from 'react-redux'

import { setLoggedIn, setUserID } from './../../redux/user/userStateActions'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = event => setUsername(event.target.value)

  const handlePasswordChange = event => setPassword(event.target.value)

  const handleLogin = async event => {
    event.preventDefault()
    const loginResult = await authenticate(username, password)
    if (loginResult.success) {
      setErrorMessage(null)
      window.localStorage.setItem('authToken', loginResult.token)
      const { userID, success } = await getCurrentUser();
      if (!success) return;
      dispatch(setUserID(userID))
      dispatch(setLoggedIn(true));
      navigate('/');
    } else {
      setErrorMessage('invalid username or password')
    }
  }

  return (
    <div className='login-container' style={{ margin: 'auto' }}>
      <h2 style={{ fontSize: '2em', color: '#7D615F' }}>log in</h2>
      <p style={{ fontSize: '1em', color: '#7D615F', textAlign: 'right' }}>
        forgot password?
      </p>
      <form onSubmit={handleLogin}>
        <div className='input-container'>
          <input
            className='input-textbox'
            type='text'
            id='username'
            placeholder='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='input-container'>
          <input
            className='input-textbox'
            type='password'
            id='password'
            placeholder='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='button-container'>
          <button className='submit-button' type='submit' onClick={handleLogin}>
            login
          </button>
        </div>
        <div>
        <p style={{ fontSize: '1em', color: '#7D615F', textAlign: 'center' }}>
              - OR -
          </p>
        </div>
        <div style={{width: "100%", textAlign: 'center'}}>
          <Link className='create-account-button' type='submit' to={"/join"}>
            don't have an account? sign up!
          </Link>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '12px' }}>
          {errorMessage && (
            <span style={{ whiteSpace: 'pre-line', color: 'red' }}>
              {errorMessage}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
