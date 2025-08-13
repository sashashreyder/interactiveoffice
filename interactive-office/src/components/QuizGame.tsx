import React, { useState } from "react";

interface Question {
  id: number;
  type: "vocabulary" | "grammar" | "scenario" | "critical_thinking";
  difficulty: "beginner" | "intermediate";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  category: string;
}

interface QuizGameProps {
  questions: Question[];
  onAnswer: (isCorrect: boolean, points: number, questionType: string) => void;
  onBack: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ questions, onAnswer, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vocabulary": return "📚";
      case "grammar": return "✏️";
      case "scenario": return "🎭";
      case "critical_thinking": return "🧠";
      default: return "❓";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vocabulary": return "#3498db";
      case "grammar": return "#e74c3c";
      case "scenario": return "#f39c12";
      case "critical_thinking": return "#9b59b6";
      default: return "#95a5a6";
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Already answered
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    onAnswer(isCorrect, currentQuestion.points, currentQuestion.type);
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <div className="quiz-game">
        <div className="quiz-header">
          <h2>🎉 Quiz Complete!</h2>
          <p>Excellent work! You've completed all 34 questions.</p>
          <p>You've mastered vocabulary, grammar, and critical thinking!</p>
        </div>
        
        <div className="quiz-controls">
          <button onClick={handleRestart} className="quiz-btn">
            Try Again
          </button>
          <button onClick={onBack} className="quiz-btn secondary">
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-game">
      <div className="quiz-header">
        <h2>🎯 Quiz Challenge</h2>
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
        <div className="question-type-badge" style={{ backgroundColor: getTypeColor(currentQuestion.type) }}>
          {getTypeIcon(currentQuestion.type)} {currentQuestion.type.replace('_', ' ').toUpperCase()}
        </div>
        <div className="question-category">
          Category: {currentQuestion.category}
        </div>
      </div>

      <div className="question-container">
        <div className="question">
          {currentQuestion.question}
        </div>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`option-btn ${
                selectedAnswer === option
                  ? option === currentQuestion.correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="explanation">
            <h4>Explanation:</h4>
            <p>{currentQuestion.explanation}</p>
            <div className="points-info">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <span className="points-earned">✅ Correct! +{currentQuestion.points} points</span>
              ) : (
                <span className="points-lost">❌ Incorrect. The correct answer was: {currentQuestion.correctAnswer}</span>
              )}
            </div>
          </div>
        )}

        {showExplanation && (
          <div className="quiz-controls">
            <button onClick={handleNextQuestion} className="quiz-btn">
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>

      <div className="quiz-controls">
        <button onClick={onBack} className="quiz-btn secondary">
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default QuizGame;
