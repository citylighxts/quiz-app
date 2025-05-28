import React from 'react';
import '../styles/Result.css';

export default function Result({ quizData, answers, onRestart, user }) {
  // Calculate score
  const score = quizData.reduce((acc, question, index) => {
    return acc + (answers[index] === question.correct ? 1 : 0);
  }, 0);
  
  const total = quizData.length;
  const percentage = Math.round((score / total) * 100);
  
  const handleLogout = () => {
    localStorage.removeItem('quizAppState');
    window.location.reload();
  };
  
  return (
    <div className="result-container">
      <div className="result-card">
        <h2>🎉 Hasil Kuis</h2>
        <div className="user-info">Selamat {user}!</div>
        
        <div className="score-summary">
          <div className="score-circle">
            <div className="percentage">{percentage}%</div>
            <div className="score-detail">{score}/{total}</div>
          </div>
        </div>
        
        <div className="result-details">
          <div className="result-item correct">
            <span>✅ Jawaban Benar</span>
            <span>{score}</span>
          </div>
          <div className="result-item wrong">
            <span>❌ Jawaban Salah</span>
            <span>{total - score}</span>
          </div>
        </div>
        
        <div className="result-actions">
          <button onClick={onRestart} className="restart-button">
            🔄 Main Lagi
          </button>
          <button onClick={handleLogout} className="logout-button">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}