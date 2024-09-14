// src/components/Login.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedEmail = localStorage.getItem('userEmail')?.trim().toLowerCase();
    const savedPassword = localStorage.getItem('userPassword')?.trim();

    const emailLowerCase = email.trim().toLowerCase();

    if (emailLowerCase === savedEmail && password.trim() === savedPassword) {
      onLogin();
    } else {
      alert('Invalid credentials, please try again!');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              className="password-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
