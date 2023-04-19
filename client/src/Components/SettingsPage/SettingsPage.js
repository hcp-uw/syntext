import { Link } from 'react-router-dom';
import stylesheet from './SettingsPage.css';

const SettingsPage = () => {
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

export default SettingsPage;