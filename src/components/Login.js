import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (isSignup) {
      if (users[name]) {
        alert('Username sudah terdaftar!');
      } else {
        users[name] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Pendaftaran berhasil! Silakan login.');
        setIsSignup(false);
      }
    } else {
      if (users[name] && users[name] === password) {
        onLogin(name);
      } else {
        alert('Username atau password salah!');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignup ? 'Sign Up' : 'Login'} Quiz App</h2>
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
          <p>
            {isSignup
              ? 'Sudah punya akun? '
              : 'Belum punya akun? '}
            <button onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Login di sini' : 'Daftar di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
