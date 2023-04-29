import React, { useState } from 'react'

import Game from '../Components/Game/Game'
import MainNavBar from '../Components/MainNavBar/MainNavBar'
import Login from '../Components/Login/Login'
import CreateAccount from '../Components/CreateAccount/CreateAccount'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import '../index.css'
import MainPopupController from '../Components/MainPopupController/MainPopupController'

const Main = () => {
  const [settingsFocus, setSettingsFocus] = useState(false)
  /*
  const someData = [
    'int j = 20;',
    'for (int i = 0; i < 10; i++) {',
    '	System.out.print(j + " - " + i);',
    'if (i > j)',
    '		System.out.println(" < 0");',
    '	else',
    '		System.out.println(" > 0");',
    '	j -= 1;',
    '}'
  ]
*/
  const defaultSnippet = {
    id: 1,
    SnippetType: 'FOR_LOOP',
    length: 'LONG',
    data: ['meow', '\ti like dogs']
    //  data: someData
  }

  return (
    <div className='app-container'>
      <MainNavBar setSettingsFocus={setSettingsFocus} />
      <Game defaultSnippet={defaultSnippet.data} />
      <MainPopupController
        settingsFocus={settingsFocus}
        setSettingsFocus={setSettingsFocus}
      />
    </div>
  )
}

export default Main
