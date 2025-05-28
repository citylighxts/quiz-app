import React from 'react';
import '../styles/QuizSettings.css';

export default function QuizSettings({
  user,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  fetchQuiz,
  loading,
}) {
  const images = ['1.jpg', '2.jpg', '3.jpg'];

  const renderImages = (offset) =>
    Array(4).fill(images).flat().map((img, idx) => (
      <img
        key={`${offset}-${idx}`}
        src={`/photos/${img}`}
        alt={`history-${offset}-${idx}`}
        className="history-image"
      />
    ));

  return (
    <div className="quiz-settings-container">
      {/* TOP SLIDER */}
      <div className="slider-top gradient">
        <div className="slider slider-left">
          {renderImages(1)}
        </div>
      </div>

      {/* SETTINGS CARD */}
      <div className="settings-full">
        <div className="settings-card">
          <h2>Welcome, {user}!</h2>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Choose a Category</option>
              <option value="9">General Knowledge</option>
              <option value="18">Science: Computers</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
              <option value="27">Animals</option>
            </select>
          </label>
          <label>
            Difficulty:
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
              <option value="">Choose a Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button onClick={fetchQuiz} disabled={loading}>
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>
        </div>
      </div>

      {/* BOTTOM SLIDER */}
      <div className="slider-bottom gradient">
        <div className="slider slider-right">
          {renderImages(2)}
        </div>
      </div>
    </div>
  );
}
