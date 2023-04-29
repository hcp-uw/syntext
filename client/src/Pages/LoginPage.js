import Login from "../Components/Login/Login";
import CreateAccount from "../Components/CreateAccount/CreateAccount";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <hr></hr>
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
