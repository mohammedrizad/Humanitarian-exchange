import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ onClose }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Perform authentication (for simplicity, no actual authentication is done here)
    // In a real-world scenario, you would call an authentication API endpoint

    // If authentication is successful, close the modal
    onClose();
  };

  return (
    <div className="signin-container">
      <span className="close-button" onClick={() => onClose()}>
        &times;
      </span>
      <h2>Sign In</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
