import { useState } from "react";
import { authenticate, getCurrentUser } from "../../services/userService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginResult = await authenticate(username, password);
    if (loginResult.success) {
      alert("logged in as " + username);
      setErrorMessage(null);
      window.localStorage.setItem("authToken", loginResult.token);
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      </form>
    </>
  );
};

export default Login;
