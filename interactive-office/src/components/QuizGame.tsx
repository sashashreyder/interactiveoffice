import React, { useState } from "react";

interface Question {
  id: number;
  type: "vocabulary" | "grammar" | "scenario" | "critical_thinking";
  difficulty: "beginner" | "intermediate";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationRu: string;
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
  const [showRussian, setShowRussian] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    setShowRussian(false);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    onAnswer(isCorrect, currentQuestion.points, currentQuestion.type);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Quiz completed
      return;
    }
    
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowRussian(false);
  };

  const handleFinishQuiz = () => {
    onBack();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vocabulary": return "📚";
      case "grammar": return "✏️";
      case "critical_thinking": return "🧠";
      default: return "❓";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vocabulary": return "#3498db";
      case "grammar": return "#e74c3c";
      case "critical_thinking": return "#9b59b6";
      default: return "#95a5a6";
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "vocabulary": return "Лексика";
      case "grammar": return "Грамматика";
      case "critical_thinking": return "Критическое Мышление";
      default: return "Вопрос";
    }
  };

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "Office Items": "Офисные предметы",
      "People": "Люди",
      "Workplace Actions": "Рабочие действия",
      "Present Simple": "Настоящее время",
      "Articles": "Артикли",
      "Demonstratives": "Указательные местоимения",
      "There is/There are": "There is/There are",
      "Modal Verbs": "Модальные глаголы",
      "Future Tense": "Будущее время",
      "Present Continuous": "Настоящее продолженное",
      "Would like to": "Would like to",
      "Countable/Uncountable": "Исчисляемые/Неисчисляемые",
      "Possessive Pronouns": "Притяжательные местоимения",
      "Customer Service": "Обслуживание клиентов",
      "Communication": "Общение",
      "Professional Behavior": "Профессиональное поведение",
      "Teamwork": "Командная работа"
    };
    
    return categoryMap[category] || category;
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="quiz-game">
        <div className="quiz-header">
          <h2>🎉 Викторина завершена!</h2>
          <p>Отличная работа! Вы ответили на все вопросы.</p>
        </div>
        
        <div className="quiz-controls">
          <button onClick={handleFinishQuiz} className="quiz-btn">
            Вернуться в главное меню
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-game">
      <div className="quiz-header">
        <h2>Вопрос {currentQuestionIndex + 1} из {questions.length}</h2>
        <p>Выберите правильный ответ</p>
        
        <div className="question-type-badge" style={{ backgroundColor: getTypeColor(currentQuestion.type) }}>
          {getTypeIcon(currentQuestion.type)} {getTypeName(currentQuestion.type)}
        </div>
        
        <div className="question-category">
          Категория: {getCategoryName(currentQuestion.category)}
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
              disabled={showExplanation}
              className={`option-btn ${
                showExplanation
                  ? option === currentQuestion.correctAnswer
                    ? "correct"
                    : option === selectedAnswer
                    ? "incorrect"
                    : ""
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="explanation">
          <h4>
            {selectedAnswer === currentQuestion.correctAnswer ? "✅ Правильно!" : "❌ Неправильно"}
          </h4>
          
          <div className="explanation-content">
            <div className="explanation-english">
              <strong>Объяснение:</strong>
              <p>{currentQuestion.explanation}</p>
            </div>
            
            <div className="explanation-russian">
              <button 
                onClick={() => setShowRussian(!showRussian)} 
                className="russian-toggle-btn"
              >
                {showRussian ? "Скрыть перевод" : "Показать перевод на русский"}
              </button>
              
              {showRussian && (
                <div className="russian-text">
                  <strong>Перевод:</strong>
                  <p>{currentQuestion.explanationRu}</p>
                </div>
              )}
            </div>
            
            <div className="points-info">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <span className="points-earned">
                  +{currentQuestion.points} очков опыта
                </span>
              ) : (
                <span className="points-lost">
                  0 очков (неправильный ответ)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="quiz-controls">
        <button onClick={onBack} className="quiz-btn secondary">
          Назад в меню
        </button>
        
        {showExplanation && (
          <button onClick={handleNextQuestion} className="quiz-btn">
            {isLastQuestion ? "Завершить викторину" : "Следующий вопрос"}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
