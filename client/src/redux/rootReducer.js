import { combineReducers } from 'redux'
import userStateReducer from './user/userStateReducer'

const rootReducer = combineReducers({
  userState: userStateReducer
})

export default rootReducer
