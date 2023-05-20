import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import settingsReducer from './settings/settingsReducer'

const rootReducer = combineReducers({
  settingsState: settingsReducer,
  userState: userReducer
})

export default rootReducer
