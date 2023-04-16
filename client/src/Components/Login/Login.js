import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let users = [
        {username: 'elijah', password: 'elijahiscool'},
        {username: 'bob', password: 'bobiscool'}
    ];

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
        alert('logged in as ' + user.username);
        } else {
        alert('Invalid username or password');
        }
        // authenticate with user service
    };

    const handleCreateAccount = (event) => {
        event.preventDefault();
        alert('Creating account for ' + username);
        users.push({username: username, password: password})
        // create account with user service
    };

    return (
        <form>
        <div>
            <label>Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" onClick={handleLogin}>Login</button>
        <button type="submit" onClick={handleCreateAccount}>Create Account</button>
        </form>
    );
};

export default Login;