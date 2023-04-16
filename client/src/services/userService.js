import axios from 'axios';

const baseURL = 'http://localhost:3001';

// create new user
const createUser = (username, password) => {
  /*
    send POST request to server with provided username and password.
    returns promise that resolves to new user object if successful,
    reject with error message if request fails.
  */
}

// authenticate user and get JWT token
const authenticate = (username, password) => {
  /*
    send POST request to server with provided username and password.
    returns promise that resolves to JWT token if successful,
    rejects with error message if the request fails.
  */
}

// get the current user's data
const getCurrentUser = () => {
  /*
    send GET request to server with JWT token in auth header.
    returns promise that resolves to current user's info if successful,
    rejects with error message if request fails or if token is invalid.
  */
}

// update current user's data
const updateCurrentUser = (userData) => {
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
};
