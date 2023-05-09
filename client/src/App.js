import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import NavBar from './Components/NavBar/NavBar';
import Main from "./Pages/Main";
import AccountInfo from "./Pages/AccountInfo";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage"
import LeaderboardPage from "./Pages/LeaderboardPage";
import PopUpController from "./Components/PopupController/PopUpController";


const App = () => {
  
  const [settingsFocus, setSettingsFocus] = useState(false);
  return (
    <div className="app-container">
      <NavBar setSettingsFocus={setSettingsFocus}/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/join" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/leaderboard" element={<LeaderboardPage/>}/>
      </Routes>
      <PopUpController
        settingsFocus={settingsFocus}
        setSettingsFocus={setSettingsFocus}
      />
    </div>
  );
};

export default App;
