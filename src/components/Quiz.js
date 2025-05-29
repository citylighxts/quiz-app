import React from 'react';
import '../styles/Quiz.css';

export default function Quiz({ 
  question, 
  onAnswer, 
  current, 
  total, 
  currentIndex,
  timeLeft, 
  category,
  difficulty,
  answers, 
  goToQuestion,
  finishQuiz 
}) {
  const categoryMap = {
    "9": "General Knowledge",
    "18": "Science: Computers",
    "21": "Sports",
    "23": "History",
    "27": "Animals"
  };
  const difficultyMap = {
    "easy": "Easy",
    "medium": "Medium",
    "hard": "Hard"
  };

  return (
    <div className="quiz-layout">
      <div className="quiz-container">
        <div className="quiz-header">
          <div>
            <h3>Category: {categoryMap[category] || 'Unknown'}</h3>
            <h3>Difficulty: {difficultyMap[difficulty] || 'Unknown'}</h3>
          </div>
          <div className="quiz-info">
            <span className={`timer ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
              ⏰ {timeLeft} seconds
            </span>
          </div>
        </div>

        <div className='image-container'>
          <img src="/photos/3.jpg" alt='image-in-quiz'/>
        </div>
        
        <div className="question-section">
          <div className="question-number">Question {current}</div>
          <div className="question-text" dangerouslySetInnerHTML={{__html: question.question}} />
          <div className="choices-container">
            {question.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onAnswer(choice)}
                className={`choice-button ${
                  answers[currentIndex] === choice ? 'selected' : ''
                }`}
                dangerouslySetInnerHTML={{__html: choice}}
              />
            ))}
          </div>
          
          <div className="question-navigation">
            <button 
              className="nav-prev"
              onClick={() => goToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>
            <button 
              className="nav-next"
              onClick={() => goToQuestion(currentIndex + 1)}
              disabled={currentIndex === total - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Panel */}
      <div className="navigation-panel">
        <div className="nav-header">
          <h4>Quiz Navigation</h4>
          <div className="nav-subheader">Tap the number to hop to the question</div>
        </div>
        
        <div className="question-grid">
          {Array.from({ length: total }, (_, index) => (
            <button
              key={index}
              className={`nav-button ${
                index === currentIndex ? 'active' : ''
              } ${
                answers[index] !== null ? 'answered' : ''
              }`}
              onClick={() => goToQuestion(index)}
              title={`Soal ${index + 1} ${answers[index] ? '(Terjawab)' : '(Belum dijawab)'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-color answered"></div>
            <span>Answered</span>
          </div>
          <div className="legend-item">
            <div className="legend-color unanswered"></div>
            <span>Not Answered</span>
          </div>
        </div>

        <div className="nav-actions">
          <div className="progress-info">
            <div className="progress-text">
              Progress: {answers.filter(a => a !== null).length}/{total} soal
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${(answers.filter(a => a !== null).length / total) * 100}%`}}
              ></div>
            </div>
          </div>
          <button 
            className="finish-button"
            onClick={finishQuiz}
            disabled={answers.filter(a => a !== null).length === 0}
          >
            Finish Quiz
          </button>
        </div>
      </div>
    </div>
  );
}