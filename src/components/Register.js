// src/components/Register.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailLowerCase = email.trim().toLowerCase();
    const passwordTrimmed = password.trim();

    localStorage.setItem('userEmail', emailLowerCase);
    localStorage.setItem('userPassword', passwordTrimmed);

    onRegister();
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
