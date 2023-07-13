import React, { useState } from 'react';
import './styles/registration.css';
import axios from 'axios'

const LoginPage = () => {
    const [username_email, setUsername_email] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameEmailChange = (event) => {
        setUsername_email(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform registration logic here

        axios.post("http://localhost:8000/login/", {
            email: username_email,
            password: password
          })
          .then((response) => {
            console.log(response);
          });
    };

    const hasValue = (value) => {
        return value.trim().length > 0;
    };

    return (
        <div className="register-form">
            <div className="form-group">
                <div className="input-container">
                    <input
                        type="text"
                        id="username_email"
                        value={username_email}
                        onChange={handleUsernameEmailChange}
                        required
                    />
                    <label
                        htmlFor="username_email"
                        className={`input-label ${hasValue(username_email) ? 'filled' : ''}`}
                    >
                        Email
                    </label>
                </div>
            </div>
            <div className="form-group">
                <div className="input-container">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <label
                        htmlFor="password"
                        className={`input-label ${hasValue(password) ? 'filled' : ''}`}
                    >
                        Password
                    </label>
                </div>
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;
