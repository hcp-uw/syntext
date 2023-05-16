import React, { useEffect } from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getSnippet } from '../../services/snippetService'
import style from './SnippetOptions.css'
import 'bootstrap/dist/css/bootstrap.css'

const SnippetOptions = props => {
  const {
    selectedType,
    setSelectedType,
    selectedLength,
    setSelectedLength,
    setCurrSnippets
  } = props

  useEffect(() => {
    if (selectedLength && selectedType) {
      loadNewSnippets(selectedLength, selectedType)
    }
  }, [selectedLength, selectedType])

  const loadNewSnippets = (len, type) => {

    getSnippet(len, type).then(snippets => {
      setCurrSnippets(snippets)
    })
  }

  const handleLengthChange = value => {
    if (value === selectedLength) return
    setSelectedLength(value)
    //loadNewSnippets(selectedLength, selectedType);
  }

  const handleTypeChange = value => {
    if (value === selectedType) return
    setSelectedType(value)
    //loadNewSnippets(selectedLength, selectedType);
  }

  const displayedType = (() => {
    switch (selectedType) {
      case 'METHOD':
        return 'methods'
      case 'FOR':
        return 'for loop'
      case 'WHILE':
        return 'while loop'
      case 'COLLECTIONS':
        return 'collections'
      default:
        return 'snippet type'
    }
  })()

  return (
    <>
      <div className='snippet-options-container'>
        <ButtonGroup>
          <Dropdown>
            <DropdownButton
              title={displayedType}
              drop='up'
              variant='custom'
              className='rounded-start'
              onSelect={handleTypeChange}
            >
              <Dropdown.Item eventKey='METHOD'>methods</Dropdown.Item>
              <Dropdown.Item eventKey='FOR'>for loop</Dropdown.Item>
              <Dropdown.Item eventKey='WHILE'>while loop</Dropdown.Item>
              <Dropdown.Item eventKey='COLLECTIONS'>collections</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
          <ToggleButtonGroup
            type='radio'
            name='options'
            value={selectedLength}
            onChange={handleLengthChange}
          >
            <ToggleButton variant='sides' id='tbg-radio-1' value='SHORT'>
              short
            </ToggleButton>
            <ToggleButton variant='sides' id='tbg-radio-2' value='MEDIUM'>
              medium
            </ToggleButton>
            <ToggleButton variant='sides' id='tbg-radio-3' value='LONG'>
              long
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonGroup>
      </div>
    </>
  )
}

export default SnippetOptions
