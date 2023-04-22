import { Link } from 'react-router-dom';
import stylesheet from './SettingsMenu.css';

const SettingsMenu = () => {
  return (
    <>
      <Link to="/"><div className='black-shade'></div></Link>
      <div className='settings-container'>
        <h1>Settings</h1>
        <hr></hr>
      </div>
    </>
  )
}

export default SettingsMenu;