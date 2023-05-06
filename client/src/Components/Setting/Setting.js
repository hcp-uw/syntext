import { useContext } from "react";
import "./Setting.css";
import { UserSettingsContext } from "../SettingsMenu/SettingsMenu.js";
import { Dropdown, Form } from 'react-bootstrap/'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.css'

const Setting = (props) => {
  // const setUserSettings = useContext(UserSettingsContext)
  const { settingName } = props;
  // setUserSettings('meow')
  return (

    <div className="setting">
      <h2>{ settingName }</h2>

      {/* <RangeExample/> */}
      <SwitchExample/>
      {/* <DropDownCreator settingTitle={"theme"} menuOptions={['white', 'green', 'pink', 'red']}/> */}
    </div>
  )
}

const DropDownCreator = (props) => {
  // settingTitle = string
  // menuOptions array of dropdown options
  const { settingTitle, menuOptions } = props;

  return (
    <Dropdown className="dropdown-option">
      <DropdownButton
        title={settingTitle}
        menuVariant="dark"
        variant='custom'
        onSelect={(option) => {console.log("you chose: ", option)}}
      >
        {menuOptions.map((option, i) => <Dropdown.Item key={i} eventKey={option}>{option}</Dropdown.Item>)}
      </DropdownButton>
    </Dropdown>
  )
}

function SwitchExample() {
  return (
    <Form className="switch-option">
      <Form.Check
        type="switch"
        // id="custom-switch"
        label=""
        onChange={(e) => console.log(e.target.checked)}
      />
    </Form>
  );
}

function RangeExample() {
  let currentVal = 0;
  console.log(currentVal)
  return (
    <Form className="range-option">
      <Form.Label className="range-label">0</Form.Label>
      <Form.Range
        onChange={function (e) {e.target.previousSibling.textContent = e.target.value}}/>
    </Form>
  );
}

export default Setting;