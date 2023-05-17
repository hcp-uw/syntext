import { createContext, useEffect, useState } from 'react'
import './SettingsMenu.css'
import Setting from '../Setting/Setting'

export const UserSettingsContext = createContext();

const SettingsMenu = props => {
  const { setSettingsFocus } = props

  const instructions = {
    'theme': {
      'menuType': 'dropdown',
      'menuOptions': ["red", "green", "blue"]
    },
    'cursor-smoothness': {
      'menuType': 'range'
    },
    'tab-indicators': {
      'menuType': 'switch'
    }
  }

  // This state is useless for now, maybe we use later.
  const [userSettings, setUserSettings] = useState({
    "theme": "default",
    "cursor-smoothness": "0.5"
  })

  useEffect(() => {
    console.log('user settings: ')
    console.log(userSettings)
    // console.log('changed user settings!')
  }, [userSettings])

  const settingMapper = () => {
    let returnArr = []

    for (let settingElement in instructions) {
      let menuType = instructions[settingElement].menuType;
      let menuOptions = instructions[settingElement].menuOptions;
      returnArr.push(<Setting key={settingElement} settingName={settingElement} menuType={menuType} menuOptions={menuOptions}/>);
    }

    return returnArr;
  }

  return (
    <>
      <div
        className='black-shade'
        onClick={() => setSettingsFocus(false)}
      ></div>
      <div className='settings-container'>
        <UserSettingsContext.Provider value={[userSettings, setUserSettings]}>
          <h1>Settings</h1>
          <hr></hr>
          {settingMapper()}
          {/* {settingMapper} */}
        </UserSettingsContext.Provider>
      </div>
    </>
  )
}

export default SettingsMenu;