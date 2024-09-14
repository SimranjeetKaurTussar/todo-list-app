// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedEmail = localStorage.getItem('userEmail')?.trim();
    const savedPassword = localStorage.getItem('userPassword')?.trim();

    console.log('Saved Email:', savedEmail);
    console.log('Saved Password:', savedPassword);
    console.log('Input Email:', email.trim());
    console.log('Input Password:', password.trim());

    if (email.trim() === savedEmail && password.trim() === savedPassword) {
      onLogin(); // Call the login handler from App.js
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
