import { createContext, useEffect, useState } from 'react'
import './SettingsMenu.css'
import Setting from '../Setting/Setting'

export const UserSettingsContext = createContext();

const SettingsMenu = props => {
  const { setSettingsFocus } = props

  const [userSettings, setUserSettings] = useState({
    theme: "default",
    "cursor-smoothness": "1"
  })

  useEffect(() => {
    console.log(userSettings)
    console.log('changed user settings!')
  }, [userSettings])

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
          <Setting/>
        </UserSettingsContext.Provider>
      </div>
    </>
  )
}

export default SettingsMenu;