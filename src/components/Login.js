import React, { useState, useEffect } from 'react';
import '../styles/Login.css';

const photos = ['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg'];

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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
      <div className="slider-container">
        <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {photos.map((photo, index) => (
            <div className="slide" key={index}>
              <img src={photo} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>

        <button className="nav-button left" onClick={handlePrev}>‹</button>
        <button className="nav-button right" onClick={handleNext}>›</button>
      </div>
    </div>
  );
}
