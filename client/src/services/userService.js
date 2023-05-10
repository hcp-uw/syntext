import axios from 'axios'
const baseURL = 'http://localhost:3001/api/user'

let authToken = window.localStorage.getItem('authToken')

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
    console.log('create POST response: ', res)

    return { ...res.data, token: res.headers['authorization'] }
  } catch (error) {
    //console.error(error);
    return { success: false }
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
    console.log('login POST response: ', res)

    return { ...res.data, token: res.headers['authorization'] }
  } catch (error) {
    //console.error(error);
    return { success: false }
  }
}

/*
    send GET request to server with JWT token in auth header.
    returns promise that resolves to current user's info if successful,
    rejects with error message if request fails or if token is invalid.
*/
const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/account`, {
      headers: { Authorization: authToken }
    })
    return res.data
  } catch (error) {
    console.log(error)
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
  deleteCurrentUser
}
