import { useContext } from "react";
import "./Setting.css";
import { UserSettingsContext } from "../SettingsMenu/SettingsMenu.js";
import { Dropdown, Form } from 'react-bootstrap/'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.css'

const Setting = (props) => {
  const userSettingController = useContext(UserSettingsContext)
  const userSettings = userSettingController[0];
  const setUserSettings = userSettingController[1];
  const { settingName, menuType, menuOptions } = props;
  // setUserSettings('meow')

  const settingPicker = () => {
    if (menuType === 'dropdown') {
      return (<DropDownCreator settingName={settingName} menuOptions={menuOptions} userSettings={userSettings} setUserSettings={setUserSettings}/>)
    } else if (menuType === 'switch') {
      return <SwitchCreator settingName={settingName} userSettings={userSettings} setUserSettings={setUserSettings}/>
    } else {
      return <RangeCreator settingName={settingName} userSettings={userSettings} setUserSettings={setUserSettings}/>
    }
  }

  return (
    <div className="setting">
      <h2>{settingName}</h2>
      {settingPicker()}
    </div>
  )
}



const DropDownCreator = (props) => {
  // settingTitle = string
  // menuOptions array of dropdown options
  const { settingName, menuOptions, userSettings, setUserSettings } = props;

  return (
    <Dropdown className="dropdown-option">
      <DropdownButton
        title={userSettings[settingName]}
        menuVariant="dark"
        variant='custom'
        onSelect={(option) => {
          setUserSettings({
            ...userSettings,
            [settingName]: option
          })
        }}
      >
        {menuOptions.map((option, i) => <Dropdown.Item key={i} eventKey={option}>{option}</Dropdown.Item>)}
      </DropdownButton>
    </Dropdown>
  )
}

function SwitchCreator(props) {
  const { settingName, userSettings, setUserSettings } = props;

  return (
    <Form className="switch-option">
      <Form.Check
        type="switch"
        // id="custom-switch"
        label=""
        onChange={(e) => {
          setUserSettings({
            ...userSettings,
            [settingName]: e.target.checked
          })
        }}
      />
    </Form>
  );
}

function RangeCreator(props) {
  const { settingName, userSettings, setUserSettings } = props;
  return (
    <Form className="range-option">
      <Form.Label className="range-label">{userSettings[settingName]}</Form.Label>
      <Form.Range
        value={(parseFloat(userSettings[settingName]) * 100).toFixed(0)}
        onChange={(e) => {
          e.target.previousSibling.textContent = (e.target.value/100).toFixed(2);
          setUserSettings({
            ...userSettings,
            [settingName]: (e.target.value/100).toFixed(2)
          })
          }}/>
    </Form>
  );
}

export default Setting;