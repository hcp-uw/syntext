import { SET_USER_ID, SET_LOGGED_IN } from "./userStateTypes"

export const setUserID = (userID) => {
  return {
    type: SET_USER_ID,
    payload: userID 
  }
}

export const setLoggedIn = (isLoggedIn) => {
  return {
    type: SET_LOGGED_IN,
    payload: isLoggedIn
  }
}