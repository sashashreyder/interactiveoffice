import React from "react";

interface ProgressTrackerProps {
  gameState: {
    level: number;
    experience: number;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
  };
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ gameState }) => {
  const experienceToNextLevel = 100;
  const currentLevelProgress = gameState.experience % experienceToNextLevel;
  const progressPercentage = (currentLevelProgress / experienceToNextLevel) * 100;
  const accuracy = gameState.totalQuestions > 0 ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) : 0;

  return (
    <div className="progress-tracker">
      <h3>Your Progress</h3>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="progress-stats">
        <div className="progress-stat">
          <span className="stat-value">{gameState.level}</span>
          <span className="stat-label">Level</span>
        </div>
        <div className="progress-stat">
          <span className="stat-value">{gameState.experience}</span>
          <span className="stat-label">XP</span>
        </div>
        <div className="progress-stat">
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="progress-stat">
          <span className="stat-value">{gameState.totalQuestions}</span>
          <span className="stat-label">Questions</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
