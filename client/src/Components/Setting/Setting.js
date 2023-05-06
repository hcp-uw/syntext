import { useContext } from "react";
import "./Setting.css";
import { UserSettingsContext } from "../SettingsMenu/SettingsMenu.js";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.css'

const Setting = (props) => {
  // const setUserSettings = useContext(UserSettingsContext)
  const {  } = props;
  // setUserSettings('meow')
  return (
    <div className="setting">
      <h2>Setting name</h2>
      <Dropdown className="menu-option">
            <DropdownButton
              title="theme"
              menuVariant="dark"
              variant='custom'
              onSelect={() => {return}}
            >
              <Dropdown.Item eventKey='METHOD'>white</Dropdown.Item>
              <Dropdown.Item eventKey='FOR'>black</Dropdown.Item>
              <Dropdown.Item eventKey='WHILE'>green</Dropdown.Item>
              <Dropdown.Item eventKey='COLLECTIONS'>pink</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
    </div>
  )
}

export default Setting;