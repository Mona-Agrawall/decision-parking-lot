import React from 'react';

export default function StatsSummary({ activeCount, dueCount, decidedCount }) {
  return (
    <section className="stats-grid" aria-label="Summary Statistics">
      <div className="stat-card">
        <div className="stat-top-row">
          <span className="stat-label">In the lot</span>
        </div>
        <div className="stat-value">{activeCount}</div>
        <p className="stat-footer-text">decisions parked</p>
      </div>

      <div className="stat-card">
        <div className="stat-top-row">
          <span className="stat-label">Need review</span>
        </div>
        <div className={`stat-value ${dueCount > 0 ? 'attention-value' : ''}`}>
          {dueCount}
        </div>
        <p className="stat-footer-text">
          {dueCount > 0 ? 'overdue or due today' : 'all caught up'}
        </p>
      </div>

      <div className="stat-card">
        <div className="stat-top-row">
          <span className="stat-label">Decided</span>
        </div>
        <div className="stat-value">{decidedCount}</div>
        <p className="stat-footer-text">in history</p>
      </div>
    </section>
  );
}
