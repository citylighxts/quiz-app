import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.trim()) onLogin(name.trim());
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Quiz App Login</h2>
        <div className="login-form">
          <input
            type="text"
            placeholder="Masukkan username"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
          />
          <button onClick={handleSubmit} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}