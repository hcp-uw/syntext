import { useEffect } from 'react'
import SettingsMenu from '../SettingsMenu/SettingsMenu'
import GithubSearchPopup from '../GithubSearchPopup/GithubSearchPopup'

const PopUpController = props => {
  const {
    defaultSnippet,
    setDefaultSnippet,
    settingsFocus,
    setSettingsFocus,
    githubFocus,
    setGithubFocus
  } = props

  useEffect(() => {}, [settingsFocus])

  if (settingsFocus) {
    return <SettingsMenu setSettingsFocus={setSettingsFocus} />
  }

  if (githubFocus) {
    return <GithubSearchPopup
      setDefaultSnippet={setDefaultSnippet}
      setGithubFocus={setGithubFocus}
      defaultSnippet={defaultSnippet}
    />
  }
  // if (loginFocus) {
  //   return <LoginPopup/>
  // }
}

export default PopUpController
