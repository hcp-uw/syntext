import { useContext } from "react";
import stylesheet from "./Setting.css";
import { UserSettingsContext } from "../SettingsMenu/SettingsMenu.js";

const Setting = (props) => {
  const setUserSettings = useContext(UserSettingsContext)
  const {  } = props;
  setUserSettings('meow')
  return (
    <div className="setting">
    </div>
  )
}

export default Setting;