import React, { useState, useEffect } from "react";
import { questions } from "../Data/Question"; 
import "./QuizIntro.css";

function QuizIntro() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [skipped, setSkipped] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [showResult, setShowResult] = useState(false);
  const [attempted, setAttempted] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);

  // Timer
  useEffect(() => {
    if (!startQuiz) return;

    if (timeLeft <= 0) {
      setIsTimeout(true); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [startQuiz, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const finishQuiz = () => {
    if (selected !== null) setAttempted(prev => prev + 1);
    if (selected !== null && selected === questions[currentQ].answer) {
      setScore(prev => prev + 10);
    }
    setTimeSpent(600 - timeLeft);
    setShowResult(true);
    setStartQuiz(false);
  };

  const handleNext = () => {
    if (selected !== null) setAttempted(prev => prev + 1);
    if (selected !== null && selected === questions[currentQ].answer) {
      setScore(prev => prev + 10);
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else if (skipped.length > 0) {
      setCurrentQ(skipped[0]);
      setSkipped(skipped.slice(1));
      setSelected(null);
    } else {
      finishQuiz();
    }
  };

  const handleSkip = () => {
    setSkipped([...skipped, currentQ]);
    handleNext();
  };

  const restartQuiz = () => {
    setStartQuiz(false);
    setCurrentQ(0);
    setSelected(null);
    setSkipped([]);
    setTimeLeft(600);
    setShowResult(false);
    setScore(0);
    setAttempted(0);
    setTimeSpent(0);
    setIsTimeout(false);
  };

  return (
    <>
      {/* Intro Page */}
      {!startQuiz && !showResult && (
        <div className="intro-wrapper">
          <div className="card">
            <div className="logo">
              <div className="box">XQ</div>
              <h2 className="logo-text">Xeven Quiz</h2>
            </div>

            <h1 className="title">XEVEN QUIZ</h1>

            <div className="details">
              <p>Selected Quiz Topic: <span>React</span></p>
              <p>Total questions: <span>{questions.length}</span></p>
              <p>Total time: <span>10 minutes</span></p>
            </div>

            <p className="info">
              You can skip questions. Skipped questions will appear at the end.
            </p>

            <button className="start-btn" onClick={() => setStartQuiz(true)}>
              ▶ Start
            </button>
          </div>
        </div>
      )}

      {/* Result Page */}
      {showResult && (
        <div className="intro-wrapper">
          <div className="card">
            <h1 className="title">Quiz Result</h1>
            <div className="details">
              <p>You attempted: <span>{attempted} / {questions.length}</span></p>
              <p>Score: <span>{score} / {questions.length * 10}</span></p>
              <p>Time Spent: <span>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span></p>
              <p>Status: <span>{score >= 50 ? "Passed" : "Failed"}</span></p>
            </div>
            <button className="start-btn" onClick={restartQuiz}>Restart Quiz</button>
          </div>
        </div>
      )}

      {/* Quiz Page */}
      {startQuiz && !showResult && (
        <div className="quiz-container">
          <div className="logo">
            <div className="box">XQ</div>
            <h2>Xeven Quiz</h2>
          </div>

          <div className="quiz-card">
            {!isTimeout ? (
              <>
                <div className="question-header">
                  <h3>
                    <span className="question-number">{String(currentQ + 1).padStart(2, "0")}</span>/
                    <span className="total">{questions.length}</span>
                    <br />
                    {questions[currentQ].question}
                  </h3>
                  <div className="timer">⏱ {formatTime()}</div>
                </div>

                <div className="options">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(i)}
                      className={selected === i ? "active" : ""}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                </div>

                <div className="actions">
                  <button className="skip" onClick={handleSkip}>Skip</button>
                  <button className="next" onClick={handleNext}>Next ➜</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <h2 style={{ color: "red" }}>⏰ Time Out!</h2>
                <button className="show-result-btn" onClick={finishQuiz}>Show Result</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default QuizIntro;