import { createContext, useState, useContext } from 'react'
import './SettingsMenu.css'
import Setting from '../Setting/Setting'
import { Dropdown } from 'bootstrap';

export const UserSettingsContext = createContext();

const SettingsMenu = props => {
  const { setSettingsFocus } = props

  const [userSettings, setUserSettings] = useState({
    theme: "default",
    "cursor-smoothness": "1"
  })

  return (
    <>
      <div
        className='black-shade'
        onClick={() => setSettingsFocus(false)}
      ></div>
      <div className='settings-container'>
        <UserSettingsContext.Provider value={setUserSettings}>
          <h1>Settings</h1>
          <hr></hr>
          <Setting/>
        </UserSettingsContext.Provider>
      </div>
    </>
  )
}

export default SettingsMenu;