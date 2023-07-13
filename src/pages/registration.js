import React, { useState } from 'react';
import './styles/registration.css';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirm_password(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform registration logic here
  //   {
  //     "username": "",
  //     "first_name": "",
  //     "last_name": "",
  //     "email": "",
  //     "password": "",
  //     "confirm_password": ""
  // }
    axios.post("http://localhost:8000/signup/", {
    headers: {
      'Content-Type': 'application/json',
    },
      username:username,
      first_name:first_name,
      last_name:last_name,
      email: email,
      password: password,
      confirm_password: confirm_password
    })
    .then((response) => {
      console.log(response);
    });
    // axios.get("http://localhost:8000/").then(res=>{
    //   console.log(res);
    // })
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
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label
            htmlFor="username"
            className={`input-label ${hasValue(username) ? 'filled' : ''}`}
          >
            Username
          </label>
        </div>
        <div className="form-group">
        <div className="input-container">
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={handleFirstnameChange}
            required
          />
          <label
            htmlFor="first_name"
            className={`input-label ${hasValue(first_name) ? 'filled' : ''}`}
          >
            First Name
          </label>
        </div>
        </div>
        <div className="form-group">
        <div className="input-container">
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={handleLastnameChange}
            required
          />
          <label
            htmlFor="last_name"
            className={`input-label ${hasValue(last_name) ? 'filled' : ''}`}
          >
            Last Name
          </label>
        </div>
        </div>
      </div>
      <div className="form-group">
        <div className="input-container">
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          <label
            htmlFor="phone"
            className={`input-label ${hasValue(phone) ? 'filled' : ''}`}
          >
            Phone
          </label>
        </div>
      </div>
      <div className="form-group">
        <div className="input-container">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label
            htmlFor="email"
            className={`input-label ${hasValue(email) ? 'filled' : ''}`}
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
      <div className="form-group">
        <div className="input-container">
          <input
            type="confirm_password"
            id="confirm_password"
            value={confirm_password}
            onChange={handleConfirmPasswordChange}
            required
          />
          <label
            htmlFor="confirm_password"
            className={`input-label ${hasValue(password) ? 'filled' : ''}`}
          >
            Confirm Password
          </label>
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
