"use client";

import React from "react";
import { useEffect, useState } from "react";
import StatCard from "./statCard";
interface QuizPorbs {
  questions: {
    question: string;
    answers: string[];
    correctAnswers: string;
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

  const { question, answers, correctAnswers } = questions[activeQuestion];
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

  const startTime = () => {
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
    nextQuestions();
  };

  const onAnswerSelcted = (answer: string, index: number) => {
    setCheck(true);
    setSelectedAnswerIndex(index);
    if (answer == correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };
  const nextQuestions = () => {
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
      stopTimer();
      fetch("/api/quizResults", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network isn't working ");
        }
        return response.json();
      });
    }
    setCheck(false);
    resetTimer();
  };
  return (
    <div className="min-h-[500px]">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col"></div>
    </div>

    // <div className="bg-primary text-white px-4 rounded-md py-1">
    //   {timeRemaining} seconds to answer
    // </div>
  );
};

export default Quiz;
