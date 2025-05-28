import React from 'react';
import '../styles/Quiz.css';

export default function Quiz({ question, onAnswer, current, total, timeLeft, user }) {
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>Halo, {user}!</h3>
        <div className="quiz-info">
          <span className="question-counter">Soal {current} dari {total}</span>
          <span className={`timer ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
            ⏰ {timeLeft} detik
          </span>
        </div>
      </div>
      
      <div className="question-section">
        <div className="question-text" dangerouslySetInnerHTML={{__html: question.question}} />
        
        <div className="choices-container">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onAnswer(choice)}
              className="choice-button"
              dangerouslySetInnerHTML={{__html: choice}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}