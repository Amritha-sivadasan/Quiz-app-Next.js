"use client";

import React from "react";
import { useEffect, useState } from "react";
import StatCard from "./statCard";
import Confetti from "react-confetti";
interface QuizPorbs {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz = ({ questions, userId }: QuizPorbs) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [check, setCheck] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timmerRunning, setTimerRunning] = useState(false);
  const [celebrateCompletion, setCelebrateCompletion] = useState(false);

  const { question, answers, correctAnswer } = questions[activeQuestion];
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timmerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining == 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, timmerRunning]);

  const startTimer = () => {
    setTimerRunning(true);
  };
  const stopTimer = () => {
    setTimerRunning(false);
  };
  const resetTimer = () => {
    setTimeRemaining(25);
  };
  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion();
  };
  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);
  const onAnswerSelected = (answer: string, index: number) => {
    setCheck(true);
    setSelectedAnswerIndex(index);
    if (answer == correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResults((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      setCelebrateCompletion(true);
      stopTimer();
      fetch("/api/quizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network isn't working ");
          }
          return response.json();
        })
        .then((data) => {
          console.log("quiz results saved successfully", data);
        })
        .catch((err) => {
          console.log("error occur", err);
        });
      setTimeout(() => {
        setCelebrateCompletion(false);
      }, 8000);
    }
    setCheck(false);
    resetTimer();
    startTimer();
  };
  return (
    <div className="min-h-[500px] relative">
      {celebrateCompletion && <Confetti />} {/* Confetti animation */}
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="bg-primary text-white px-4 rounded-md py-1">
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{questions.length}</span>
                </h2>
              </div>
              <div className="bg-primary text-white px-4 rounded-md py-1">
                {timeRemaining} seconds to answer
              </div>
            </div>
            <div className="">
              <h3 className="mb-5 text-2xl font-bold">{question}</h3>
              <ul>
                {answers.map((answer, index) => (
                  <li
                    className={`cursor-pointer mb-5 py-3 border w-72 rounded-md px-3 hover:bg-primary hover:text-white ${
                      selectedAnswerIndex === index
                        ? "bg-blue-700 text-white"
                        : "bg-gray-300"
                    }`}
                    key={index}
                    onClick={() => onAnswerSelected(answer, index)}
                  >
                    <span>{String.fromCharCode(65 + index)}. </span>
                    {answer}
                  </li>
                ))}
              </ul>
              <button
                onClick={nextQuestion}
                disabled={!check}
                className="font-bold cursor-pointer border bg-gray-400 px-3"
              >
                {activeQuestion === questions.length - 1
                  ? "Finish ➔"
                  : "Next Question ➔"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10">Results</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard
                title="Percentage"
                value={`${((results.score / (questions.length * 5)) * 100).toFixed()}%`}
              />
              <StatCard title="Total Questions" value={questions.length} />
              <StatCard title="Total score" value={results.score} />
              <StatCard
                title="Total correct answers"
                value={results.correctAnswers}
              />
              <StatCard
                title="Total wrong answers"
                value={results.wrongAnswers}
              />
            </div>
            <button
              onClick={() => window.location.reload()} // Reload the page to restart quiz
              className="mt-10 font-bold uppercase border bg-gray-300 px-3 rounded hover:bg-slate-400"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
