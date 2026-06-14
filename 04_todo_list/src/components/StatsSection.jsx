import React from 'react'

const StatsSection = ({totalTasks, completedTasks, remainingTasks}) => {
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <>
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon-wrapper total">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          </div>
          <div className="stat-info">
            <h2>{totalTasks}</h2>
            <p>Total Tasks</p>
          </div>
        </div>

          <div className="stat-card">
          <div className="stat-icon-wrapper completed">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="stat-info">
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper remaining">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="stat-info">
            <h2>{remainingTasks}</h2>
            <p>Remaining</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-info">
          <span className="progress-label">Task Completion Progress</span>
          <span className="progress-value">{percentage}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </>
  )
}

export default StatsSection