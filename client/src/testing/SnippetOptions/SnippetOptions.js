import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import style from "./SnippetOptions.css"
import 'bootstrap/dist/css/bootstrap.css';

const SnippetOptions = ({ selectedType, setSelectedType, selectedLength, setSelectedLength }) => {
  

  const handleLengthChange = (value) => {
    setSelectedLength(value);
  }

  const handleTypeChange = (value) => {
    setSelectedType(value);
  }

  const displayedType = (() => {
    switch (selectedType) {
      case 'METHOD':
        return 'methods';
      case 'FOR_LOOP':
        return 'for loop';
      case 'WHILE_LOOP':
        return 'while loop';
      case 'CONDITIONAL':
        return 'conditional'
      default:
        return 'snippet type';
    }
  })();

  console.log(selectedLength, selectedType)

  return(
    <>
      <div className="snippet-options-container">
        <ButtonGroup>
          <Dropdown>
            <DropdownButton 
              title={displayedType} 
              drop="up" 
              variant="custom"
              className="rounded-start"
              onSelect={handleTypeChange}
            >
              <Dropdown.Item eventKey="METHOD">methods</Dropdown.Item>
              <Dropdown.Item eventKey="FOR_LOOP">for loop</Dropdown.Item>
              <Dropdown.Item eventKey="WHILE_LOOP">while loop</Dropdown.Item>
              <Dropdown.Item eventKey="CONDITIONAL">conditional</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
          <ToggleButtonGroup 
            type="radio" 
            name="options" 
            value={selectedLength} 
            onChange={handleLengthChange}
          >
            <ToggleButton variant="sides" id="tbg-radio-1" value="SHORT">short</ToggleButton>
            <ToggleButton variant="sides" id="tbg-radio-2" value="MEDIUM">medium</ToggleButton>
            <ToggleButton variant="sides" id="tbg-radio-3" value="LONG">long</ToggleButton>
          </ToggleButtonGroup>
        </ButtonGroup>
      </div>
    </>
  )
}

export default SnippetOptions;
