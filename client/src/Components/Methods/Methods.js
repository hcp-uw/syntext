import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import style from "./Methods.css"
import 'bootstrap/dist/css/bootstrap.css';


const Methods = () => {
    return(
      <>
        
      <div className="methods-container">
        <ButtonGroup >
          <Dropdown>
            <DropdownButton 
                title="methods" 
                drop="up" 
                variant="custom"
                className="rounded-start"
              >methods</DropdownButton>
          </Dropdown>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="sides" id="tbg-radio-1" value={1}>short</ToggleButton>
            <ToggleButton variant="sides" id="tbg-radio-2" value={2}>medium</ToggleButton>
            <ToggleButton variant="sides" id="tbg-radio-3" value={3}>long</ToggleButton>
          </ToggleButtonGroup>
          
        </ButtonGroup>
      </div>
      </>
      
    )
  }

  export default Methods;