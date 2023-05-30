import pfp from './pfpicon.png'
import stylesheet from './Icon.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const IconNavBar = props => {
  const navigate = useNavigate();
  
  return (
    <img
      className='icon'
      src={pfp}
      alt="profile"
      style={{ stylesheet }}
      onClick={ () => (props.isLoggedIn) ? 
        navigate('/account') :
        navigate('/login') 
      }
    />
  )
}

export default IconNavBar
