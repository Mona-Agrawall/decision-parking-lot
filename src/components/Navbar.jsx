import React from 'react';

export default function Navbar({ activeTab, setActiveTab, activeCount, historyCount, onOpenAddModal }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div
          className="brand-wrapper"
          onClick={() => setActiveTab('dashboard')}
          role="button"
          tabIndex={0}
        >
          <div className="brand-icon" aria-hidden="true" />
          <div className="brand-text-col">
            <span className="brand-name">Decision Parking Lot</span>
          </div>
        </div>

        <div className="header-right">
          <nav className="nav-tabs" aria-label="Main Navigation">
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span>Parking Lot</span>
              <span className="nav-badge-count">{activeCount}</span>
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <span>History</span>
              {historyCount > 0 && <span className="nav-badge-count">{historyCount}</span>}
            </button>
          </nav>

          <button
            type="button"
            className="btn-primary"
            onClick={onOpenAddModal}
            id="park-decision-btn"
          >
            Park a Decision
          </button>
        </div>
      </div>
    </header>
  );
}
