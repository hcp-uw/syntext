import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './NavBar.css';

const NavBar = ({ setSettingsFocus }) => {
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
          <Icon setSettingsFocus={setSettingsFocus} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
