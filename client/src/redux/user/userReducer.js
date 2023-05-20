import { SET_USER_ID, SET_LOGGED_IN } from "./userTypes"

const initialState = {
  userID: "",
  isLoggedIn: false
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_ID: return {
      ...state,
      userID: action.payload
    }

    case SET_LOGGED_IN: return {
      ...state,
      isLoggedIn: action.payload
    }

    default: return state;
  }
  
}

export default userReducer;