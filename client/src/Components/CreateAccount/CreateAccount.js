import { useState } from 'react'
import { createUser } from '../../services/userService'
import './CreateAccount.css'
import { useDispatch } from 'react-redux'

import { setLoggedIn, setUserID } from './../../redux/user/userStateActions';

const CreateAccount = () => {
  const dispatch = useDispatch(); 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = event => setUsername(event.target.value)

  const handlePasswordChange = event => setPassword(event.target.value)

  const handleLogin = async event => {
    event.preventDefault()
    const createResult = await createUser(username, password)
    if (createResult.success) {
      alert('logged in as ' + username)
      setErrorMessage(null)
      window.localStorage.setItem('authToken', createResult.token)
      dispatch(setLoggedIn(true))
    } else {
      setErrorMessage('Invalid username or password')
    }
  }

  return (
    <div className="create-container" style={{margin: "auto"}}>
      <h2 className="create-title" style={{fontSize: "2em", color: "#7D615F"}}>create account</h2>

      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            className="input-textbox"
            type='text'
            id='username'
            placeholder='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input-container">
          <input
            className="input-textbox"
            type='password'
            id='password'
            placeholder='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='button-container'>
          <button className="submit-button" type='submit' onClick={handleLogin}>
            create
          </button>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '12px' }}>
          {errorMessage && <span 
              style={{ whiteSpace: "pre-line", 
                       color: 'red' }}>{errorMessage}</span>}
        </div>
      </form>
    </div>
  )
}

export default CreateAccount;

