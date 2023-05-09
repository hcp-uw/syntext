import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon'
import './NavBar.css'
import { useSelector } from 'react-redux'
const NavBar = ({ setSettingsFocus }) => {
  const isLoggedIn = useSelector(s => s.userState.isLoggedIn)
  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <Link className='logo' to='/'>
          Synte&gt;&lt;t
        </Link>
        <div className='button-container'>
          <Link to='/leaderboard'>leaderboard</Link>
          <Link to='/'>game</Link>
          <Link to='/account'>account</Link>
          {!isLoggedIn && <Link to='/login'>login</Link>}
          {!isLoggedIn && <Link to='/join'>join</Link>}
          <Icon setSettingsFocus={setSettingsFocus} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
