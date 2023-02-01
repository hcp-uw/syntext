import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.css';


const Methods = () => {
    return(
      <>
      <div class="Methods">
        <ButtonGroup aria-label="Basic example">
          <DropdownButton title="methods">methods</DropdownButton>
          <Button variant="secondary">short</Button>
          <Button variant="secondary">medium</Button>
          <Button variant="secondary">long</Button>
        </ButtonGroup>
      </div>
      </>
      
    )
  }

  export default Methods;