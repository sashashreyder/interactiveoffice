import React, { useState } from "react";

interface ClientMeetingProps {
  onAnswer: (isCorrect: boolean, points: number, questionType: string) => void;
  onBack: () => void;
}

interface ClientScenario {
  id: number;
  scenario: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

const ClientMeeting: React.FC<ClientMeetingProps> = ({ onAnswer, onBack }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [meetingComplete, setMeetingComplete] = useState(false);

  const scenarios: ClientScenario[] = [
    {
      id: 1,
      scenario: "A client says 'Hello'. What do you say?",
      options: ["Hello", "Goodbye", "Thank you", "Please"],
      correctAnswer: "Hello",
      explanation: "Say 'Hello' back when a client greets you.",
      points: 15
    },
    {
      id: 2,
      scenario: "A client asks 'How much does it cost?'. What do you say?",
      options: ["I don't know", "It costs $50", "Goodbye", "Please"],
      correctAnswer: "It costs $50",
      explanation: "Tell the client the price when they ask.",
      points: 15
    },
    {
      id: 3,
      scenario: "A client says 'Thank you'. What do you say?",
      options: ["Hello", "Goodbye", "You're welcome", "Please"],
      correctAnswer: "You're welcome",
      explanation: "Say 'You're welcome' when a client thanks you.",
      points: 15
    },
    {
      id: 4,
      scenario: "A client asks 'When can you deliver?'. What do you say?",
      options: ["Never", "Next week", "Goodbye", "Please"],
      correctAnswer: "Next week",
      explanation: "Tell the client when you can deliver.",
      points: 15
    },
    {
      id: 5,
      scenario: "A client says 'I'm not happy with this'. What do you say?",
      options: ["I don't care", "I'm sorry to hear that. How can I help?", "That's your problem", "Goodbye"],
      correctAnswer: "I'm sorry to hear that. How can I help?",
      explanation: "Show empathy and offer to help solve the problem.",
      points: 20
    },
    {
      id: 6,
      scenario: "A client asks 'Can you help me?'. What do you say?",
      options: ["No", "Yes, I can help you", "I don't know", "Maybe"],
      correctAnswer: "Yes, I can help you",
      explanation: "Always offer help to clients when possible.",
      points: 20
    },
    {
      id: 7,
      scenario: "A client says 'This is too expensive'. What do you say?",
      options: ["Too bad", "I understand. Let me show you other options", "That's the price", "Go somewhere else"],
      correctAnswer: "I understand. Let me show you other options",
      explanation: "Show understanding and offer alternatives.",
      points: 20
    },
    {
      id: 8,
      scenario: "A client asks 'Do you have this in blue?'. What do you say?",
      options: ["No", "Yes, we do", "I don't know", "Maybe"],
      correctAnswer: "Yes, we do",
      explanation: "Give clear, helpful answers to client questions.",
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
      setMeetingComplete(true);
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
    setMeetingComplete(false);
  };

  if (meetingComplete) {
    return (
      <div className="client-meeting">
        <div className="client-header">
          <div className="client-avatar">🤝</div>
          <div className="client-info">
            <h2>🎉 Meeting Complete!</h2>
            <p>Outstanding customer service skills!</p>
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
    <div className="client-meeting">
      <div className="client-header">
        <div className="client-avatar">🤝</div>
        <div className="client-info">
          <h2>Client Meeting</h2>
          <p>Customer Service - Scenario {currentScenarioIndex + 1} of {scenarios.length}</p>
        </div>
      </div>

      <div className="scenario-text">
        <h3>What would you say to your client?</h3>
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
          <h4>Customer Service Tip:</h4>
          <p>{currentScenario.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <div className="quiz-controls">
          <button onClick={handleNextScenario} className="quiz-btn">
            {isLastScenario ? 'Finish Meeting' : 'Next Scenario'}
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

export default ClientMeeting;
