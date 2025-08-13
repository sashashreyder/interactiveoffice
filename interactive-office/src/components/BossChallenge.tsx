import React, { useState } from "react";

interface BossChallengeProps {
  onAnswer: (isCorrect: boolean, points: number, questionType: string) => void;
  onBack: () => void;
}

interface BossScenario {
  id: number;
  scenario: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

const BossChallenge: React.FC<BossChallengeProps> = ({ onAnswer, onBack }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [challengeComplete, setChallengeComplete] = useState(false);

  const scenarios: BossScenario[] = [
    {
      id: 1,
      scenario: "Your boss says 'Good morning'. What do you say?",
      options: ["Good morning", "Goodbye", "Thank you", "Please"],
      correctAnswer: "Good morning",
      explanation: "Say 'Good morning' back when your boss greets you.",
      points: 15
    },
    {
      id: 2,
      scenario: "Your boss asks 'How are you?'. What do you say?",
      options: ["I'm fine, thank you", "Goodbye", "Please", "Thank you"],
      correctAnswer: "I'm fine, thank you",
      explanation: "Say 'I'm fine, thank you' when someone asks how you are.",
      points: 15
    },
    {
      id: 3,
      scenario: "Your boss says 'Thank you'. What do you say?",
      options: ["Hello", "Goodbye", "You're welcome", "Please"],
      correctAnswer: "You're welcome",
      explanation: "Say 'You're welcome' when someone thanks you.",
      points: 15
    },
    {
      id: 4,
      scenario: "Your boss asks 'Can you help me?'. What do you say?",
      options: ["No", "Yes, I can", "Goodbye", "Please"],
      correctAnswer: "Yes, I can",
      explanation: "Say 'Yes, I can' when you can help someone.",
      points: 15
    },
    {
      id: 5,
      scenario: "Your boss asks 'When can you finish this work?'. What do you say?",
      options: ["I don't know", "Tomorrow", "Never", "Maybe"],
      correctAnswer: "Tomorrow",
      explanation: "Give a clear, realistic answer about when you can finish work.",
      points: 20
    },
    {
      id: 6,
      scenario: "Your boss says 'This is wrong'. What do you say?",
      options: ["It's not my fault", "I'm sorry, I'll fix it", "I don't care", "Blame someone else"],
      correctAnswer: "I'm sorry, I'll fix it",
      explanation: "Take responsibility and offer to fix mistakes.",
      points: 20
    },
    {
      id: 7,
      scenario: "Your boss asks 'Do you understand?'. What do you say if you don't understand?",
      options: ["Yes, I understand", "No, I don't understand. Can you explain?", "I don't know", "Maybe"],
      correctAnswer: "No, I don't understand. Can you explain?",
      explanation: "It's better to ask for clarification than to make mistakes.",
      points: 20
    },
    {
      id: 8,
      scenario: "Your boss asks 'Can you work overtime?'. What do you say?",
      options: ["No way", "Yes, I can", "I don't know", "Maybe later"],
      correctAnswer: "Yes, I can",
      explanation: "Show willingness to help when possible.",
      points: 20
    }
  ];

  const currentScenario = scenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scenarios.length - 1;

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentScenario.correctAnswer;
    onAnswer(isCorrect, currentScenario.points, "scenario");
    
    setShowExplanation(true);
  };

  const handleNextScenario = () => {
    if (isLastScenario) {
      setChallengeComplete(true);
    } else {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setChallengeComplete(false);
  };

  if (challengeComplete) {
    return (
      <div className="boss-challenge">
        <div className="boss-header">
          <div className="boss-avatar">👔</div>
          <div className="boss-info">
            <h2>🎉 Challenge Complete!</h2>
            <p>Excellent professional communication skills!</p>
          </div>
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
    <div className="boss-challenge">
      <div className="boss-header">
        <div className="boss-avatar">👔</div>
        <div className="boss-info">
          <h2>Boss Challenge</h2>
          <p>Professional Communication - Scenario {currentScenarioIndex + 1} of {scenarios.length}</p>
        </div>
      </div>

      <div className="scenario-text">
        <h3>What would you say to your boss?</h3>
        <p>{currentScenario.scenario}</p>
      </div>

      <div className="options-grid">
        {currentScenario.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`option-btn ${
              selectedAnswer === option
                ? option === currentScenario.correctAnswer
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
          <h4>Professional Tip:</h4>
          <p>{currentScenario.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <div className="quiz-controls">
          <button onClick={handleNextScenario} className="quiz-btn">
            {isLastScenario ? 'Finish Challenge' : 'Next Scenario'}
          </button>
        </div>
      )}

      <div className="quiz-controls">
        <button onClick={onBack} className="quiz-btn secondary">
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default BossChallenge;
