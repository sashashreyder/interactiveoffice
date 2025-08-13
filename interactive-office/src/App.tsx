import React, { useState } from "react";
import "./App.css";
import QuizGame from "./components/QuizGame.tsx";
import BossChallenge from "./components/BossChallenge.tsx";
import ClientMeeting from "./components/ClientMeeting.tsx";
import ProgressTracker from "./components/ProgressTracker.tsx";

interface GameState {
  currentMode: string;
  score: number;
  level: number;
  experience: number;
  totalQuestions: number;
  correctAnswers: number;
}

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

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentMode: "main",
    score: 0,
    level: 1,
    experience: 0,
    totalQuestions: 0,
    correctAnswers: 0
  });

  const [showHelp, setShowHelp] = useState(false);

  // Vocabulary Questions - A1 Level Business English
  const vocabularyQuestions: Question[] = [
    // Office Items
    {
      id: 1,
      type: "vocabulary",
      difficulty: "beginner",
      question: "What do you sit on at work?",
      options: ["a desk", "a chair", "a computer", "a phone"],
      correctAnswer: "a chair",
      explanation: "You sit on a chair at work.",
      points: 10,
      category: "Office Items"
    },
    {
      id: 2,
      type: "vocabulary",
      difficulty: "beginner",
      question: "Where do you put your papers?",
      options: ["on a desk", "on a chair", "on a computer", "on a phone"],
      correctAnswer: "on a desk",
      explanation: "You put papers on a desk.",
      points: 10,
      category: "Office Items"
    },
    {
      id: 3,
      type: "vocabulary",
      difficulty: "beginner",
      question: "What do you use to call people?",
      options: ["a desk", "a chair", "a computer", "a phone"],
      correctAnswer: "a phone",
      explanation: "You use a phone to call people.",
      points: 10,
      category: "Office Items"
    },
    {
      id: 4,
      type: "vocabulary",
      difficulty: "beginner",
      question: "What do you use to write?",
      options: ["a pen", "a computer", "a phone", "a desk"],
      correctAnswer: "a pen",
      explanation: "You use a pen to write.",
      points: 10,
      category: "Office Items"
    },
    {
      id: 5,
      type: "vocabulary",
      difficulty: "beginner",
      question: "What do you use to type?",
      options: ["a pen", "a computer", "a phone", "a desk"],
      correctAnswer: "a computer",
      explanation: "You use a computer to type.",
      points: 10,
      category: "Office Items"
    },
    
    // People at Work
    {
      id: 6,
      type: "vocabulary",
      difficulty: "beginner",
      question: "Who works in an office?",
      options: ["a doctor", "a teacher", "an employee", "a driver"],
      correctAnswer: "an employee",
      explanation: "An employee works in an office.",
      points: 10,
      category: "People"
    },
    {
      id: 7,
      type: "vocabulary",
      difficulty: "beginner",
      question: "Who is the boss?",
      options: ["a manager", "a student", "a teacher", "a driver"],
      correctAnswer: "a manager",
      explanation: "A manager is the boss.",
      points: 10,
      category: "People"
    },
    {
      id: 8,
      type: "vocabulary",
      difficulty: "beginner",
      question: "Who helps customers?",
      options: ["a secretary", "a customer service representative", "a driver", "a teacher"],
      correctAnswer: "a customer service representative",
      explanation: "A customer service representative helps customers.",
      points: 10,
      category: "People"
    },
    {
      id: 9,
      type: "vocabulary",
      difficulty: "beginner",
      question: "Who answers the phone?",
      options: ["a receptionist", "a manager", "a driver", "a teacher"],
      correctAnswer: "a receptionist",
      explanation: "A receptionist answers the phone.",
      points: 10,
      category: "People"
    },
    
    // Workplace Actions
    {
      id: 10,
      type: "vocabulary",
      difficulty: "beginner",
      question: "What do you do in a meeting?",
      options: ["sleep", "talk about work", "eat lunch", "go home"],
      correctAnswer: "talk about work",
      explanation: "In a meeting, you talk about work.",
      points: 10,
      category: "Workplace Actions"
    },
    {
      id: 11,
      type: "vocabulary",
      difficulty: "beginner",
      question: "What do you do when you arrive at work?",
      options: ["say hello", "go home", "sleep", "eat lunch"],
      correctAnswer: "say hello",
      explanation: "When you arrive at work, you say hello.",
      points: 10,
      category: "Workplace Actions"
    },
    {
      id: 12,
      type: "vocabulary",
      difficulty: "beginner",
      question: "What do you do when you leave work?",
      options: ["say hello", "say goodbye", "eat lunch", "sleep"],
      correctAnswer: "say goodbye",
      explanation: "When you leave work, you say goodbye.",
      points: 10,
      category: "Workplace Actions"
    }
  ];

  // Grammar Questions - A1 Level Business English
  const grammarQuestions: Question[] = [
    // Present Simple
    {
      id: 13,
      type: "grammar",
      difficulty: "beginner",
      question: "I _____ a student.",
      options: ["am", "is", "are", "be"],
      correctAnswer: "am",
      explanation: "Use 'am' with 'I' in present simple.",
      points: 15,
      category: "Present Simple"
    },
    {
      id: 14,
      type: "grammar",
      difficulty: "beginner",
      question: "She _____ in the office.",
      options: ["work", "works", "working", "worked"],
      correctAnswer: "works",
      explanation: "Use 'works' with 'she' in present simple.",
      points: 15,
      category: "Present Simple"
    },
    {
      id: 15,
      type: "grammar",
      difficulty: "beginner",
      question: "They _____ employees.",
      options: ["am", "is", "are", "be"],
      correctAnswer: "are",
      explanation: "Use 'are' with 'they' in present simple.",
      points: 15,
      category: "Present Simple"
    },
    {
      id: 16,
      type: "grammar",
      difficulty: "beginner",
      question: "He _____ a manager.",
      options: ["am", "is", "are", "be"],
      correctAnswer: "is",
      explanation: "Use 'is' with 'he' in present simple.",
      points: 15,
      category: "Present Simple"
    },
    
    // Articles
    {
      id: 17,
      type: "grammar",
      difficulty: "beginner",
      question: "This is _____ office.",
      options: ["a", "an", "the", "my"],
      correctAnswer: "an",
      explanation: "Use 'an' before words starting with vowels (o).",
      points: 15,
      category: "Articles"
    },
    {
      id: 18,
      type: "grammar",
      difficulty: "beginner",
      question: "I have _____ meeting.",
      options: ["a", "an", "the", "my"],
      correctAnswer: "a",
      explanation: "Use 'a' before words starting with consonants (m).",
      points: 15,
      category: "Articles"
    },
    {
      id: 19,
      type: "grammar",
      difficulty: "beginner",
      question: "This is _____ computer.",
      options: ["a", "an", "the", "my"],
      correctAnswer: "a",
      explanation: "Use 'a' before words starting with consonants (c).",
      points: 15,
      category: "Articles"
    },
    
    // Demonstratives
    {
      id: 20,
      type: "grammar",
      difficulty: "beginner",
      question: "_____ is my desk.",
      options: ["This", "These", "That", "Those"],
      correctAnswer: "This",
      explanation: "Use 'This' for things near you (singular).",
      points: 15,
      category: "Demonstratives"
    },
    {
      id: 21,
      type: "grammar",
      difficulty: "beginner",
      question: "_____ are my colleagues.",
      options: ["This", "These", "That", "Those"],
      correctAnswer: "These",
      explanation: "Use 'These' for things near you (plural).",
      points: 15,
      category: "Demonstratives"
    },
    {
      id: 22,
      type: "grammar",
      difficulty: "beginner",
      question: "_____ is the meeting room.",
      options: ["This", "These", "That", "Those"],
      correctAnswer: "That",
      explanation: "Use 'That' for things far from you (singular).",
      points: 15,
      category: "Demonstratives"
    },
    
    // There is/There are
    {
      id: 23,
      type: "grammar",
      difficulty: "beginner",
      question: "_____ a computer on the desk.",
      options: ["There is", "There are", "Is there", "Are there"],
      correctAnswer: "There is",
      explanation: "Use 'There is' with singular nouns.",
      points: 15,
      category: "There is/There are"
    },
    {
      id: 24,
      type: "grammar",
      difficulty: "beginner",
      question: "_____ many people in the office.",
      options: ["There is", "There are", "Is there", "Are there"],
      correctAnswer: "There are",
      explanation: "Use 'There are' with plural nouns.",
      points: 15,
      category: "There is/There are"
    },
    
    // Modal Verbs
    {
      id: 25,
      type: "grammar",
      difficulty: "beginner",
      question: "You _____ be on time for work.",
      options: ["can", "must", "should", "will"],
      correctAnswer: "must",
      explanation: "Use 'must' for strong obligation.",
      points: 15,
      category: "Modal Verbs"
    },
    {
      id: 26,
      type: "grammar",
      difficulty: "beginner",
      question: "I _____ help you with that.",
      options: ["can", "must", "should", "will"],
      correctAnswer: "can",
      explanation: "Use 'can' to show ability or possibility.",
      points: 15,
      category: "Modal Verbs"
    },
    {
      id: 27,
      type: "grammar",
      difficulty: "beginner",
      question: "You _____ ask questions if you don't understand.",
      options: ["can", "must", "should", "will"],
      correctAnswer: "should",
      explanation: "Use 'should' for advice and recommendations.",
      points: 15,
      category: "Modal Verbs"
    },
    
    // Future with 'will'
    {
      id: 28,
      type: "grammar",
      difficulty: "beginner",
      question: "I _____ attend the meeting tomorrow.",
      options: ["will", "am", "do", "have"],
      correctAnswer: "will",
      explanation: "Use 'will + infinitive' for future plans.",
      points: 15,
      category: "Future Tense"
    },
    
    // Present Continuous
    {
      id: 29,
      type: "grammar",
      difficulty: "beginner",
      question: "She _____ working now.",
      options: ["is", "will", "does", "has"],
      correctAnswer: "is",
      explanation: "Use 'is + verb-ing' for actions happening now.",
      points: 15,
      category: "Present Continuous"
    },
    
    // Would like to
    {
      id: 30,
      type: "grammar",
      difficulty: "beginner",
      question: "I _____ to speak with the manager.",
      options: ["would like", "am like", "do like", "have like"],
      correctAnswer: "would like",
      explanation: "Use 'would like to' for polite requests.",
      points: 15,
      category: "Would like to"
    },
    
    // Countable/Uncountable
    {
      id: 31,
      type: "grammar",
      difficulty: "beginner",
      question: "How _____ coffee do you need?",
      options: ["many", "much", "some", "any"],
      correctAnswer: "much",
      explanation: "Use 'much' with uncountable nouns like coffee.",
      points: 15,
      category: "Countable/Uncountable"
    },
    
    // Possessive Pronouns
    {
      id: 32,
      type: "grammar",
      difficulty: "beginner",
      question: "This is _____ office.",
      options: ["my", "me", "I", "mine"],
      correctAnswer: "my",
      explanation: "Use 'my' before nouns to show possession.",
      points: 15,
      category: "Possessive Pronouns"
    }
  ];

  // Critical Thinking Questions - A1 Level Business Scenarios
  const criticalThinkingQuestions: Question[] = [
    // Customer Service
    {
      id: 33,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "A client is waiting. What should you do first?",
      options: ["Ignore them", "Say hello and ask how you can help", "Tell them to wait", "Call your boss"],
      correctAnswer: "Say hello and ask how you can help",
      explanation: "Always greet clients politely and offer help first.",
      points: 25,
      category: "Customer Service"
    },
    {
      id: 34,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "You don't understand something. What should you do?",
      options: ["Pretend you understand", "Ask questions", "Stay quiet", "Leave the room"],
      correctAnswer: "Ask questions",
      explanation: "It's better to ask questions than to make mistakes.",
      points: 25,
      category: "Communication"
    },
    {
      id: 35,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "You make a mistake at work. What should you do?",
      options: ["Hide the mistake", "Tell your boss immediately", "Blame someone else", "Ignore it"],
      correctAnswer: "Tell your boss immediately",
      explanation: "Always be honest about mistakes and fix them quickly.",
      points: 25,
      category: "Professional Behavior"
    },
    {
      id: 36,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "A colleague needs help. What should you do?",
      options: ["Ignore them", "Help if you can", "Tell them to ask someone else", "Complain about it"],
      correctAnswer: "Help if you can",
      explanation: "Help colleagues when possible - teamwork is important.",
      points: 25,
      category: "Teamwork"
    },
    {
      id: 37,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "You're late for a meeting. What should you do?",
      options: ["Don't go to the meeting", "Go quietly and apologize", "Make noise when you arrive", "Blame traffic"],
      correctAnswer: "Go quietly and apologize",
      explanation: "If you're late, enter quietly and apologize for being late.",
      points: 25,
      category: "Professional Behavior"
    },
    {
      id: 38,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "A client says 'I'm not happy'. What should you do?",
      options: ["Tell them to leave", "Listen and try to help", "Ignore them", "Call security"],
      correctAnswer: "Listen and try to help",
      explanation: "Always listen to client concerns and try to solve problems.",
      points: 25,
      category: "Customer Service"
    },
    {
      id: 39,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "Your boss asks you to do something difficult. What should you do?",
      options: ["Say 'No way'", "Say 'I'll try my best'", "Ignore the request", "Complain about it"],
      correctAnswer: "Say 'I'll try my best'",
      explanation: "Show willingness to work and learn new things.",
      points: 25,
      category: "Professional Behavior"
    },
    {
      id: 40,
      type: "critical_thinking",
      difficulty: "beginner",
      question: "A client asks for a discount. What should you do?",
      options: ["Give them everything for free", "Say 'No' immediately", "Check if you can offer alternatives", "Tell them to leave"],
      correctAnswer: "Check if you can offer alternatives",
      explanation: "Try to find solutions that work for both you and the client.",
      points: 25,
      category: "Customer Service"
    }
  ];

  const handleAnswer = (isCorrect: boolean, points: number, questionType: string) => {
    const totalPoints = isCorrect ? points : 0;
    const newExperience = gameState.experience + totalPoints;
    const newLevel = Math.floor(newExperience / 100) + 1;
    const newScore = gameState.score + totalPoints;
    const newTotalQuestions = gameState.totalQuestions + 1;
    const newCorrectAnswers = gameState.correctAnswers + (isCorrect ? 1 : 0);

    setGameState(prev => ({
      ...prev,
      score: newScore,
      level: newLevel,
      experience: newExperience,
      totalQuestions: newTotalQuestions,
      correctAnswers: newCorrectAnswers
    }));
  };

  const resetGame = () => {
    setGameState({
      currentMode: "main",
      score: 0,
      level: 1,
      experience: 0,
      totalQuestions: 0,
      correctAnswers: 0
    });
  };

  const renderHelpSection = () => (
    <div className="help-section">
      <div className="help-header">
        <h2>📚 How to Use Interactive Office</h2>
        <button onClick={() => setShowHelp(false)} className="close-btn">×</button>
      </div>
      
      <div className="help-content">
        <div className="help-card">
          <h3>🎯 Vocabulary Practice</h3>
          <p>Learn essential business words for office items, people, and actions. Each correct answer gives you 10 XP points.</p>
          <ul>
            <li>Office Items: desk, chair, computer, phone, pen</li>
            <li>People: employee, manager, receptionist, customer service</li>
            <li>Actions: say hello, talk about work, say goodbye</li>
          </ul>
        </div>
        
        <div className="help-card">
          <h3>✏️ Grammar Practice</h3>
          <p>Master basic English grammar rules for business communication. Each correct answer gives you 15 XP points.</p>
          <ul>
            <li>Present Simple: I am, she works, they are</li>
            <li>Articles: a, an, the</li>
            <li>Modal Verbs: can, must, should</li>
            <li>Future: will + infinitive</li>
          </ul>
        </div>
        
        <div className="help-card">
          <h3>🧠 Critical Thinking</h3>
          <p>Solve real business scenarios and make professional decisions. Each correct answer gives you 25 XP points.</p>
          <ul>
            <li>Customer Service: How to help clients</li>
            <li>Professional Behavior: What to do in difficult situations</li>
            <li>Teamwork: How to work with colleagues</li>
          </ul>
        </div>
        
        <div className="help-card">
          <h3>💬 Communication Skills</h3>
          <p>Practice talking with your boss and clients in realistic scenarios.</p>
          <ul>
            <li>Boss Challenge: Professional communication</li>
            <li>Client Meeting: Customer service skills</li>
          </ul>
        </div>
        
        <div className="help-card">
          <h3>🏆 Progress System</h3>
          <p>Track your learning progress and level up as you improve your English skills.</p>
          <ul>
            <li>Earn XP for correct answers</li>
            <li>Level up every 100 XP</li>
            <li>Track accuracy and total questions</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderMainMenu = () => (
    <div className="main-menu">
      <div className="header-section">
        <h1>🏢 Interactive Office</h1>
        <p>Master Business English - A1 Level</p>
        <p>Vocabulary • Grammar • Critical Thinking • Communication</p>
        <ProgressTracker gameState={gameState} />
      </div>
      
      <div className="menu-grid">
        <button onClick={() => setGameState(prev => ({ ...prev, currentMode: "vocabulary" }))} className="menu-card vocabulary-card">
          <div className="card-icon">📚</div>
          <h3>Vocabulary Practice</h3>
          <p>12 questions: Office Items, People & Actions</p>
        </button>
        
        <button onClick={() => setGameState(prev => ({ ...prev, currentMode: "grammar" }))} className="menu-card grammar-card">
          <div className="card-icon">✏️</div>
          <h3>Grammar Practice</h3>
          <p>20 questions: Present Simple, Articles, Modals & More</p>
        </button>
        
        <button onClick={() => setGameState(prev => ({ ...prev, currentMode: "critical_thinking" }))} className="menu-card thinking-card">
          <div className="card-icon">🧠</div>
          <h3>Critical Thinking</h3>
          <p>8 scenarios: Problem Solving & Decision Making</p>
        </button>
        
        <button onClick={() => setGameState(prev => ({ ...prev, currentMode: "communication" }))} className="menu-card communication-card">
          <div className="card-icon">💬</div>
          <h3>Communication Skills</h3>
          <p>Boss & Client Scenarios</p>
        </button>
        
        <button onClick={() => setShowHelp(true)} className="menu-card help-card">
          <div className="card-icon">❓</div>
          <h3>Help & Rules</h3>
          <p>Learn how to use the app</p>
        </button>
        
        <button onClick={resetGame} className="menu-card reset-card">
          <div className="card-icon">🔄</div>
          <h3>Reset Progress</h3>
          <p>Start over with fresh progress</p>
        </button>
      </div>
    </div>
  );

  const renderCommunicationMenu = () => (
    <div className="communication-menu">
      <div className="header-section">
        <h1>💬 Communication Skills</h1>
        <p>Practice with Boss & Client Scenarios</p>
        <button onClick={() => setGameState(prev => ({ ...prev, currentMode: "main" }))} className="back-btn">
          ← Back to Main Menu
        </button>
      </div>
      
      <div className="communication-grid">
        <button onClick={() => setGameState(prev => ({ ...prev, currentMode: "boss" }))} className="communication-card boss-card">
          <div className="card-image">
            <img src="/boss.png" alt="Boss" />
          </div>
          <h3>Boss Challenge</h3>
          <p>8 professional communication scenarios</p>
        </button>
        
        <button onClick={() => setGameState(prev => ({ ...prev, currentMode: "client" }))} className="communication-card client-card">
          <div className="card-image">
            <img src="/client.png" alt="Client" />
          </div>
          <h3>Client Meeting</h3>
          <p>8 customer service scenarios</p>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (showHelp) {
      return renderHelpSection();
    }
    
    switch (gameState.currentMode) {
      case "vocabulary":
        return <QuizGame questions={vocabularyQuestions} onAnswer={handleAnswer} onBack={() => setGameState(prev => ({ ...prev, currentMode: "main" }))} />;
      case "grammar":
        return <QuizGame questions={grammarQuestions} onAnswer={handleAnswer} onBack={() => setGameState(prev => ({ ...prev, currentMode: "main" }))} />;
      case "critical_thinking":
        return <QuizGame questions={criticalThinkingQuestions} onAnswer={handleAnswer} onBack={() => setGameState(prev => ({ ...prev, currentMode: "main" }))} />;
      case "communication":
        return renderCommunicationMenu();
      case "boss":
        return <BossChallenge onAnswer={handleAnswer} onBack={() => setGameState(prev => ({ ...prev, currentMode: "communication" }))} />;
      case "client":
        return <ClientMeeting onAnswer={handleAnswer} onBack={() => setGameState(prev => ({ ...prev, currentMode: "communication" }))} />;
      default:
        return renderMainMenu();
    }
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
};

export default App;



