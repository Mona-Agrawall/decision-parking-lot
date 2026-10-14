import React from 'react';

/**
 * Reusable ProgressBar component showing questions answered progress.
 */
export default function ProgressBar({ completed = 0, total = 0, showLabel = true, size = 'md' }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = total > 0 && completed === total;

  return (
    <div className="progress-container">
      {showLabel && (
        <div className="progress-header-row">
          <span>
            {completed} of {total} question{total === 1 ? '' : 's'} answered
          </span>
          <span style={{ fontWeight: 600 }}>{percentage}%</span>
        </div>
      )}
      <div
        className="progress-track"
        style={{ height: size === 'sm' ? '5px' : '7px' }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`progress-fill ${isComplete ? 'complete' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
