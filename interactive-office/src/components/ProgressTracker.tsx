import React from "react";

interface ProgressTrackerProps {
  gameState: {
    level: number;
    experience: number;
    totalQuestions: number;
    correctAnswers: number;
  };
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ gameState }) => {
  const accuracy = gameState.totalQuestions > 0 
    ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) 
    : 0;
  
  const progressToNextLevel = gameState.experience % 100;
  const progressPercentage = progressToNextLevel;

  return (
    <div className="progress-tracker">
      <h3>📊 Ваш Прогресс</h3>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="progress-stats">
        <div className="progress-stat">
          <span className="stat-value">{gameState.level}</span>
          <span className="stat-label">Уровень</span>
        </div>
        
        <div className="progress-stat">
          <span className="stat-value">{gameState.experience}</span>
          <span className="stat-label">Опыт</span>
        </div>
        
        <div className="progress-stat">
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Точность</span>
        </div>
        
        <div className="progress-stat">
          <span className="stat-value">{gameState.totalQuestions}</span>
          <span className="stat-label">Вопросов</span>
        </div>
      </div>
      
      <div className="progress-info">
        <p>До следующего уровня: {100 - progressToNextLevel} очков опыта</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
