import axios from 'axios'
const baseURL = 'http://localhost:3001/api/user'



/*
    send POST request to server with provided username and password.
    returns promise that resolves to new user object if successful,
    reject with error message if request fails.
*/
const createUser = async (username, password) => {
  try {
    const res = await axios.post(`${baseURL}/create`, {
      username: username,
      password: password
    })

    return {
      success: res.data.success,
      userID: res.data.result,
      token: res.headers['authorization']
    }
  } catch (error) {
    console.error(error)
    if (error.response.status === 409)
      return { success: false, error: `user ${username} already exists` }
    return { success: false, error: 'Error creating account' }
  }
}

/*
    send POST request to server with provided username and password.
    returns promise that resolves to JWT token if successful,
    rejects with error message if the request fails.
*/
const authenticate = async (username, password) => {
  try {
    const res = await axios.post(`${baseURL}/login`, {
      username: username,
      password: password
    })

    return {
      success: res.data.success,
      userID: res.data.result,
      token: res.headers['authorization']
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

const refreshCurrentSession = async (token, userID) => {
  try {
    const res = await axios.post(`${baseURL}/refresh?userID=${userID}`, {
      headers: { Authorization: token }
    })

    return { 
      success: res.data.success, 
      token: res.headers['authorization'] 
    }

  } catch (error) {
    return { success: false }
  }
}

const getUserID = async username => {
  try {
    const res = await axios.get(`${baseURL}/id?username=${username}`)
    if (res.data.success) 
      return {
        success: res.data.success,
        userID: res.data.result
      }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: error
    }    
  }
}

/*
    send GET request to server with JWT token in auth header.
    returns promise that resolves to current user's info if successful,
    rejects with error message if request fails or if token is invalid.
*/
const getCurrentUser = async userID => {
  try {
    let authToken = window.localStorage.getItem('authToken')
    const res = await axios.get(`${baseURL}/account?userID=${userID}`, {
      headers: { Authorization: authToken }
    })
    
    if (res.data.success)
      return {
        success: true,
        user: res.data.result 
      }
  } catch (error) {
    console.error(error)
    
    if (error.response && error.response.data.error === 'TokenExpired')
      return { success: false, error: 'TokenExpired' }
    
    return { 
      success: false, 
      error: error 
    }
  }
}

// update current user's data
const updateCurrentUser = userData => {
  /*
    send PUT request to server with JWT token in auth header
    and provided user data in request body.
    returns promise that resolves to updated user object if request is successful,
    rejects with error message if request fails or if token is invalid.
  */
}

// delete the current user's account
const deleteCurrentUser = () => {
  /*
    send DELETE request to server with JWT token in auth header.
    returns promise that resolves to success message if request is successful,
    rejects with error message if request fails or if token is invalid.
  */
}

export {
  createUser,
  authenticate,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getUserID,
  refreshCurrentSession
}
