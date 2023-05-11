import { useSelector } from "react-redux"
import AccountManager from "../Components/AccountManager/AccountManager"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import AccountInfo from './AccountPage';


const AccountPage = () => {
  const navigate = useNavigate();
  let isLoggedIn = useSelector(s => s.userState.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [])
  return (
    <div className='account-info-container'>
      <AccountManager/>
    </div>
  )
}

export default AccountPage
