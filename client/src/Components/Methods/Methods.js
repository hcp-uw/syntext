import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import style from "./Methods.css"
import 'bootstrap/dist/css/bootstrap.css';


const Methods = () => {
    return(
      <>
        <style type="text/css">
          {`
            .btn-custom {
              background-color: #BC8785;
              color: #E5CDCD;
            }
          `}
        </style>
      <div class="Methods">
        <ButtonGroup >
          <Dropdown>
            <DropdownButton 
                title="methods" 
                drop="up"
                variant="custom"
                className="rounded-start"
              >methods</DropdownButton>
          </Dropdown>
          
          <Button variant="custom">short</Button>
          <Button variant="custom">medium</Button>
          <Button variant="custom">long</Button>
        </ButtonGroup>
      </div>
      </>
      
    )
  }

  export default Methods;