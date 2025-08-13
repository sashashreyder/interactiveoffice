import React from "react";

interface AchievementProps {
  achievements: string[];
  onBack: () => void;
}

interface AchievementData {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  points: number;
  category: "beginner" | "intermediate" | "advanced" | "special";
}

const Achievement: React.FC<AchievementProps> = ({ achievements, onBack }) => {
  const allAchievements: AchievementData[] = [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Score your first 100 points",
      icon: "👣",
      requirement: "Reach 100 total score",
      points: 10,
      category: "beginner"
    },
    {
      id: "rising-star",
      title: "Rising Star",
      description: "Reach level 5",
      icon: "🚀",
      requirement: "Reach level 5",
      points: 25,
      category: "intermediate"
    },
    {
      id: "hot-streak",
      title: "Hot Streak",
      description: "Answer 5 questions correctly in a row",
      icon: "🔥",
      requirement: "Get a 5+ question streak",
      points: 20,
      category: "intermediate"
    },
    {
      id: "knowledge-seeker",
      title: "Knowledge Seeker",
      description: "Answer 20 questions correctly",
      icon: "📚",
      requirement: "Answer 20 questions correctly",
      points: 30,
      category: "intermediate"
    },
    {
      id: "senior-professional",
      title: "Senior Professional",
      description: "Reach level 10",
      icon: "⭐",
      requirement: "Reach level 10",
      points: 50,
      category: "advanced"
    },
    {
      id: "executive-master",
      title: "Executive Master",
      description: "Reach level 15",
      icon: "👑",
      requirement: "Reach level 15",
      points: 75,
      category: "advanced"
    },
    {
      id: "business-legend",
      title: "Business Legend",
      description: "Reach level 20",
      icon: "🏆",
      requirement: "Reach level 20",
      points: 100,
      category: "special"
    },
    {
      id: "perfect-score",
      title: "Perfect Score",
      description: "Complete a quiz with 100% accuracy",
      icon: "💯",
      requirement: "Get 100% on any quiz",
      points: 40,
      category: "advanced"
    },
    {
      id: "speed-demon",
      title: "Speed Demon",
      description: "Answer 3 questions in under 10 seconds each",
      icon: "⚡",
      requirement: "Answer 3 questions in under 10 seconds",
      points: 35,
      category: "advanced"
    },
    {
      id: "boss-master",
      title: "Boss Master",
      description: "Complete all boss challenges",
      icon: "👔",
      requirement: "Complete all boss scenarios",
      points: 45,
      category: "intermediate"
    },
    {
      id: "client-expert",
      title: "Client Expert",
      description: "Complete all client meeting scenarios",
      icon: "🤝",
      requirement: "Complete all client scenarios",
      points: 45,
      category: "intermediate"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginner": return "#27ae60";
      case "intermediate": return "#f39c12";
      case "advanced": return "#e74c3c";
      case "special": return "#9b59b6";
      default: return "#667eea";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "beginner": return "Beginner";
      case "intermediate": return "Intermediate";
      case "advanced": return "Advanced";
      case "special": return "Special";
      default: return "Unknown";
    }
  };

  const unlockedAchievements = allAchievements.filter(achievement => 
    achievements.includes(achievement.title)
  );

  const lockedAchievements = allAchievements.filter(achievement => 
    !achievements.includes(achievement.title)
  );

  const totalPoints = unlockedAchievements.reduce((sum, achievement) => sum + achievement.points, 0);

  return (
    <div className="achievement-section">
      <div className="achievement-header">
        <button onClick={onBack} className="back-btn">← Back to Menu</button>
        <div className="achievement-info">
          <h2>🏆 Achievements</h2>
          <p>Track your progress and unlock new achievements!</p>
        </div>
        <div className="achievement-stats">
          <div className="stat">
            <span className="stat-label">Unlocked</span>
            <span className="stat-value">{achievements.length}/{allAchievements.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Points</span>
            <span className="stat-value">{totalPoints}</span>
          </div>
        </div>
      </div>

      <div className="achievement-content">
        <div className="achievement-summary">
          <div className="progress-circle">
            <div className="progress-number">
              {Math.round((achievements.length / allAchievements.length) * 100)}%
            </div>
            <div className="progress-label">Complete</div>
          </div>
          <div className="summary-text">
            <h3>Great Progress!</h3>
            <p>You've unlocked {achievements.length} out of {allAchievements.length} achievements.</p>
            {achievements.length === allAchievements.length && (
              <p className="completion-message">🎉 Congratulations! You've unlocked all achievements!</p>
            )}
          </div>
        </div>

        <div className="achievements-container">
          <div className="unlocked-achievements">
            <h3>✅ Unlocked Achievements</h3>
            {unlockedAchievements.length > 0 ? (
              <div className="achievement-grid">
                {unlockedAchievements.map((achievement) => (
                  <div key={achievement.id} className="achievement-card unlocked">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                      <div className="achievement-meta">
                        <span className="category" style={{ backgroundColor: getCategoryColor(achievement.category) }}>
                          {getCategoryLabel(achievement.category)}
                        </span>
                        <span className="points">+{achievement.points} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-achievements">No achievements unlocked yet. Keep playing to earn your first one!</p>
            )}
          </div>

          <div className="locked-achievements">
            <h3>🔒 Locked Achievements</h3>
            <div className="achievement-grid">
              {lockedAchievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card locked">
                  <div className="achievement-icon">🔒</div>
                  <div className="achievement-content">
                    <h4>???</h4>
                    <p className="requirement">{achievement.requirement}</p>
                    <div className="achievement-meta">
                      <span className="category" style={{ backgroundColor: getCategoryColor(achievement.category) }}>
                        {getCategoryLabel(achievement.category)}
                      </span>
                      <span className="points">+{achievement.points} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;

