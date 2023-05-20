import { UPDATE_USER_SETTINGS } from "./settingsTypes";

export const updateUserSettings = (settings) => {
  return {
    type: UPDATE_USER_SETTINGS,
    payload: settings,
  };
};
