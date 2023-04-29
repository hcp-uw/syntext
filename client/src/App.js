import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import AccountInfo from "./Pages/AccountInfo";
import Login from "./Pages/Login";

const App = () => {
  return (
    // Any other pages we plan to add will go here
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/account" element={<AccountInfo />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
