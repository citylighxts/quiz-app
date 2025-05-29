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
    // Note: localStorage is being used here but may not work in all environments
    localStorage.removeItem('quizAppState');
    window.location.reload();
  };

  const images = ['1.jpg', '2.jpg', '3.jpg'];
  
  const renderImages = (offset) =>
    Array(4).fill(images).flat().map((img, idx) => (
      <img
        key={`${offset}-${idx}`}
        src={`/photos/${img}`}
        alt={`history-${offset}-${idx}`}
        className="result-slider-image"
      />
    ));

  return (
    <div className="result-page-container">
      {/* LEFT SLIDER */}
      <div className="result-slider-side result-slider-left">
        <div className="result-slider result-slider-vertical-up">
          {renderImages(1)}
        </div>
      </div>

      {/* RESULT CONTENT */}
      <div className="result-content">
        <div className="result-wrapper">
          <div className="result-card">
            <h2>Quiz Result</h2>
            <div className="result-user-info">Here is the result for {user}:</div>
            
            <div className="result-score-summary">
              <div className="result-score-circle">
                <div className="result-percentage">{percentage}%</div>
              </div>
                <div className="result-score-detail">{score}/{total}</div>
            </div>

            <div className="result-details">
              <div className="result-item result-item-correct">
                <span>Answered Right</span>
                <span>{score}</span>
              </div>
              <div className="result-item result-item-wrong">
                <span>Answered Wrong</span>
                <span>{total - score}</span>
              </div>
            </div>

            <div className="result-actions">
              <button onClick={onRestart} className="result-restart-button">
                Redo Quiz
              </button>
              <button onClick={handleLogout} className="result-logout-button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SLIDER */}
      <div className="result-slider-side result-slider-right">
        <div className="result-slider result-slider-vertical-down">
          {renderImages(2)}
        </div>
      </div>
    </div>
  );
}