// App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';
import QuizSettings from './components/QuizSettings';
import Result from './components/Result';
import './styles/App.css';

const QUIZ_TIME = 300;
const STORAGE_KEY = 'quizAppState';

export default function App() {
  const [user, setUser] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizReady, setQuizReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.user) setUser(state.user);
        if (state.quizData) {
          setQuizData(state.quizData);
          setQuizReady(true);
        }
        if (state.category) setCategory(state.category);
        if (state.difficulty) setDifficulty(state.difficulty);
        if (state.currentIndex !== undefined) setCurrentIndex(state.currentIndex);
        if (state.answers) setAnswers(state.answers);
        if (state.quizFinished !== undefined) setQuizFinished(state.quizFinished);

        // ⏱ Hitung waktu tersisa berdasarkan waktu terakhir disimpan
        if (state.timeLeft !== undefined && state.lastSaved) {
          const now = Date.now();
          const elapsed = Math.floor((now - state.lastSaved) / 1000);
          const updatedTimeLeft = Math.max(0, state.timeLeft - elapsed);
          setTimeLeft(updatedTimeLeft);
        } else if (state.timeLeft !== undefined) {
          setTimeLeft(state.timeLeft);
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        user,
        quizData,
        currentIndex,
        answers,
        timeLeft,
        quizFinished,
        category,
        difficulty,
        lastSaved: Date.now()
      }));
    }
  }, [user, quizData, currentIndex, answers, timeLeft, quizFinished, category, difficulty]);

  async function fetchQuiz() {
    if (!category || !difficulty) {
      alert('Please choose category and difficulty first.');
      return;
    }

    setLoading(true);
    try {
      const amount = 20;
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
      const data = await res.json();

      const formatted = data.results.map((q, index) => {
        const choices = [...q.incorrect_answers, q.correct_answer];
        for (let i = choices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [choices[i], choices[j]] = [choices[j], choices[i]];
        }
        return {
          id: index + 1,
          question: q.question,
          choices,
          correct: q.correct_answer,
        };
      });

      setQuizData(formatted);
      setCurrentIndex(0);
      setAnswers(new Array(20).fill(null));
      setTimeLeft(QUIZ_TIME);
      setQuizFinished(false);
      setQuizReady(true);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Error fetching quiz. Try again later.');
    } finally {
      setLoading(false);
    }
  }

  function onLogin(name) {
    setUser(name);
  }

  function onAnswer(answer) {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = answer;
      return newAnswers;
    });
  }

  function goToQuestion(index) {
    if (index >= 0 && index < 20) {
      setCurrentIndex(index);
    }
  }

  function finishQuiz() {
    setQuizFinished(true);
  }

  useEffect(() => {
    if (quizFinished || !user || !quizData) return;
    if (timeLeft <= 0) {
      setQuizFinished(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizFinished, user, quizData]);

  function resetQuiz() {
    setQuizReady(false);
    setQuizData(null);
    setCategory('');
    setDifficulty('');
    localStorage.removeItem(STORAGE_KEY);
  }

  // RENDERING

  if (!user) {
    return <Login onLogin={onLogin} />;
  }

  if (!quizReady) {
    return (
      <QuizSettings
        user={user}
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        fetchQuiz={fetchQuiz}
        loading={loading}
      />
    );
  }

  if (quizFinished && quizData) {
    return (
      <Result
        quizData={quizData}
        answers={answers}
        onRestart={resetQuiz}
        user={user}
      />
    );
  }

  if (loading || !quizData) {
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
      currentIndex={currentIndex}
      timeLeft={timeLeft}
      category={category}
      difficulty={difficulty}
      answers={answers}
      goToQuestion={goToQuestion}
      finishQuiz={finishQuiz}
    />
  );
}
