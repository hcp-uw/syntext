import { useState } from 'react'
import { createUser } from '../../services/userService'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = event => setUsername(event.target.value)

  const handlePasswordChange = event => setPassword(event.target.value)

  const handleCreate = async event => {
    event.preventDefault()
    const createResult = await createUser(username, password)
    if (createResult.success) {
      alert('created user ' + username)
      setErrorMessage(null)
      window.localStorage.setItem('authToken', createResult.token)
    } else {
      setErrorMessage('Username not available')
    }
  }

  return (
    <>
      <h2>Create new account</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit' onClick={handleCreate}>
          Create
        </button>
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </form>
    </>
  )
}

export default Login
