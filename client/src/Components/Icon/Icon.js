import pfp from './pfpicon.png'
import stylesheet from './Icon.css'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const IconNavBar = props => {
  const { setSettingsFocus } = props

  return (
    <>
    <div className='icon-container'>
      <ToggleButtonGroup
            type='radio'
            name='options'

          >
            <ToggleButton variant='sides' id='tbg-radio-1' value='SHORT'>
              short
            </ToggleButton>
            <ToggleButton variant='sides' id='tbg-radio-2' value='MEDIUM'>
              medium
            </ToggleButton>
            <ToggleButton variant='sides' id='tbg-radio-3' value='LONG'>
            <img
        className='icon'
        src={pfp}
        alt="profile"
        style={{ stylesheet }}
        onClick={() => setSettingsFocus(true)}
        />
            </ToggleButton>
          </ToggleButtonGroup>
  </div >
  </>
  )
}

export default IconNavBar

{/*  */}