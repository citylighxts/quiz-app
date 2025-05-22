import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './styles/App.css';

const QUIZ_TIME = 60; // detik
const STORAGE_KEY = 'quizAppState';

export default function App() {
  // States
  const [user, setUser] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if(state.user) setUser(state.user);
        if(state.quizData) setQuizData(state.quizData);
        if(state.currentIndex !== undefined) setCurrentIndex(state.currentIndex);
        if(state.answers) setAnswers(state.answers);
        if(state.timeLeft !== undefined) setTimeLeft(state.timeLeft);
        if(state.quizFinished !== undefined) setQuizFinished(state.quizFinished);
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);
  
  // Save to localStorage
  useEffect(() => {
    if(user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        user, quizData, currentIndex, answers, timeLeft, quizFinished
      }));
    }
  }, [user, quizData, currentIndex, answers, timeLeft, quizFinished]);
  
  // Fetch quiz from API
  async function fetchQuiz() {
    setLoading(true);
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
      const data = await res.json();
      
      const formatted = data.results.map(q => {
        const choices = [...q.incorrect_answers, q.correct_answer];
        // Shuffle choices
        for(let i = choices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [choices[i], choices[j]] = [choices[j], choices[i]];
        }
        return {
          question: q.question,
          choices,
          correct: q.correct_answer,
        };
      });
      
      setQuizData(formatted);
      setCurrentIndex(0);
      setAnswers([]);
      setTimeLeft(QUIZ_TIME);
      setQuizFinished(false);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Gagal memuat soal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }
  
  // Handle login
  function onLogin(name) {
    setUser(name);
    fetchQuiz();
  }
  
  // Handle answer
  function onAnswer(answer) {
    setAnswers(prev => [...prev, answer]);
    if(currentIndex + 1 >= quizData.length) {
      setQuizFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }
  
  // Timer effect
  useEffect(() => {
    if(quizFinished || !user || !quizData) return;
    
    if(timeLeft <= 0) {
      setQuizFinished(true);
      return;
    }
    
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizFinished, user, quizData]);
  
  // Reset quiz
  function resetQuiz() {
    fetchQuiz();
  }
  
  // Render components
  if(!user) {
    return <Login onLogin={onLogin} />;
  }
  
  if(quizFinished && quizData) {
    return (
      <Result
        quizData={quizData}
        answers={answers}
        onRestart={resetQuiz}
        user={user}
      />
    );
  }
  
  if(loading || !quizData) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading quiz...</div>
      </div>
    );
  }
  
  return (
    <Quiz
      question={quizData[currentIndex]}
      onAnswer={onAnswer}
      current={currentIndex + 1}
      total={quizData.length}
      timeLeft={timeLeft}
      user={user}
    />
  );
}