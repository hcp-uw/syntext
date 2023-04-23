import { useEffect } from "react";
import SettingsMenu from "../SettingsMenu/SettingsMenu"

const PopUpController = (props) => {
  const { settingsFocus, setSettingsFocus } = props;
  useEffect(() => {}, [settingsFocus])

  if (settingsFocus) {
    return <SettingsMenu setSettingsFocus={setSettingsFocus}/>
  }
  // if (loginFocus) {
  //   return <LoginPopup/>
  // }
}

export default PopUpController;