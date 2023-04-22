import SettingsMenu from "../SettingsMenu/SettingsMenu"

export default PopUpController = (props) => {
  const { settingsFocus } = props;
  if (settingsFocus) {
    return <SettingsMenu/>
  }
  // if (loginFocus) {
  //   return <LoginPopup/>
  // }
}