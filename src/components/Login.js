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
      switch (true) {
        case !name && !password:
          alert('Mohon masukkan username dan password!');
          break;
        case !name:
          alert('Mohon masukkan username!');
          break;
        case !users[name]:
          alert('Username tidak ditemukan!');
          break;
        case !password:
          alert('Mohon masukkan password!');
          break;
        case users[name] === password:
          onLogin(name);
          break;
        default:
          alert('Password salah!');
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
          <div className="auth-redirect">
            {isSignup
              ? 'Sudah punya akun?'
              : 'Belum punya akun?'}
            <div className='redirect' onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Login di sini' : 'Daftar di sini'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
