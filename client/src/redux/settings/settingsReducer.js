import { UPDATE_USER_SETTINGS } from "./settingsTypes";

const initialState = {
  theme: 'light',
  font: 'cambria',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
