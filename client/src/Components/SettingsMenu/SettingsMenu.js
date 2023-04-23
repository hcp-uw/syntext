import stylesheet from './SettingsMenu.css';

const SettingsMenu = (props) => {
  const { setSettingsFocus } = props;
  return (
    <>
      <div className='black-shade' onClick={() => setSettingsFocus(false)}></div>
      <div className='settings-container'>
        <h1>Settings</h1>
        <hr></hr>
      </div>
    </>
  )
}

export default SettingsMenu;