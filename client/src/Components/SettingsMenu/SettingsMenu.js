import { createContext, useEffect, useState } from 'react'
import './SettingsMenu.css'
import Setting from '../Setting/Setting'

export const UserSettingsContext = createContext();

const SettingsMenu = props => {
  const { setSettingsFocus } = props

  const testing = {
    'theme': {
      'menuType': 'dropdown',
      'menuOptions': ["red", "green", "blue"]
    },
    'cursor-smoothness': {
      'menuType': 'range',
      'menuOptions': [0, 100]
    }
  }

  // This state is useless for now, maybe we use later.
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
          <Setting settingName={'test'}/>
          <SettingMapper instructions={testing}/>
        </UserSettingsContext.Provider>
      </div>
    </>
  )
}

// Goal of this Component is to map all settings based off of a given set of instructions.
// Inside of the Setting component, we would then use a ternary operation to check if we return a dropdown, range, or switch based off the menuType.
const SettingMapper = (props) => {
  const { instructions } = props

  for (let settingElement in instructions) {
    console.log(settingElement)
    console.log(instructions)
  }

  return (
    <>
    </>
  )
}

export default SettingsMenu;