import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsSummary from './components/StatsSummary';
import AttentionBanner from './components/AttentionBanner';
import DecisionCard from './components/DecisionCard';
import DecisionForm from './components/DecisionForm';
import DecisionDetails from './components/DecisionDetails';
import DecideModal from './components/DecideModal';
import HistoryView from './components/HistoryView';
import EmptyState from './components/EmptyState';
import ExploreSamplesModal from './components/ExploreSamplesModal';
import { getInitialSampleDecisions, CATEGORIES } from './data/sampleData';
import { getReviewStatus, getTodayString, getRelativeDateString } from './utils/dateUtils';
import { RotateCcw, Search } from 'lucide-react';

const STORAGE_KEY = 'decision_parking_lot_v1';

export default function App() {
  // 1. Initialize decisions from localStorage or use initial sample data
  const [decisions, setDecisions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load decisions from localStorage:', err);
    }
    return getInitialSampleDecisions();
  });

  // 2. Persist to localStorage whenever decisions change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
    } catch (err) {
      console.error('Failed to save decisions to localStorage:', err);
    }
  }, [decisions]);

  // Navigation tab: 'dashboard' | 'history'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [editingDecision, setEditingDecision] = useState(null);
  const [viewingDecision, setViewingDecision] = useState(null);
  const [decidingDecision, setDecidingDecision] = useState(null);

  // Derived collections
  const activeDecisions = decisions.filter((d) => d.status === 'parked');
  const historyDecisions = decisions.filter((d) => d.status === 'decided');

  // Decisions requiring attention (reviewDate is today or overdue)
  const attentionDecisions = activeDecisions.filter((d) => {
    const status = getReviewStatus(d.reviewDate);
    return status.isAttention;
  });

  // Filtered active decisions for Parking Lot section
  const filteredActiveDecisions = activeDecisions.filter((d) => {
    const matchesCategory =
      selectedCategory === 'All' || d.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.reason && d.reason.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  // Next parking slot number
  const getNextSlotNumber = () => {
    if (decisions.length === 0) return 1;
    const maxSlot = Math.max(...decisions.map((d) => d.slotNumber || 1));
    return maxSlot + 1;
  };

  // Handler: Add or update decision
  const handleSaveDecision = (decisionData) => {
    if (decisionData.id) {
      // Edit existing
      setDecisions((prev) =>
        prev.map((d) => (d.id === decisionData.id ? { ...d, ...decisionData } : d))
      );
      if (viewingDecision && viewingDecision.id === decisionData.id) {
        setViewingDecision((prev) => ({ ...prev, ...decisionData }));
      }
    } else {
      // Create new
      const newDecision = {
        ...decisionData,
        id: `dec-${Date.now()}`,
        slotNumber: getNextSlotNumber(),
        status: 'parked',
        createdAt: getTodayString(),
        decisionResult: null,
        nextSteps: decisionData.nextSteps || []
      };
      setDecisions((prev) => [newDecision, ...prev]);
    }
  };

  // Handler: Park a sample decision from catalog without creating duplicates
  const handleParkSampleDecision = (sampleItem) => {
    const exists = decisions.some(
      (d) => d.title.trim().toLowerCase() === sampleItem.title.trim().toLowerCase()
    );
    if (exists) return;

    const newDecision = {
      id: `dec-${Date.now()}`,
      slotNumber: getNextSlotNumber(),
      isSample: true,
      title: sampleItem.title,
      category: sampleItem.category,
      reason: sampleItem.reason,
      options: sampleItem.options,
      questions: sampleItem.questions.map((q, idx) => ({
        ...q,
        id: `q-${Date.now()}-${idx}`
      })),
      nextSteps: (sampleItem.nextSteps || []).map((s, idx) => ({
        ...s,
        id: `step-${Date.now()}-${idx}`
      })),
      reviewDate: getRelativeDateString(sampleItem.reviewDateOffset || 4),
      currentThinking: sampleItem.currentThinking || '',
      status: 'parked',
      createdAt: getTodayString(),
      decisionResult: null
    };

    setDecisions((prev) => [newDecision, ...prev]);
  };

  // Handler: Check / uncheck question
  const handleToggleQuestion = (decisionId, questionId) => {
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id !== decisionId) return d;
        const updatedQuestions = d.questions.map((q) =>
          q.id === questionId ? { ...q, answered: !q.answered } : q
        );
        const updated = { ...d, questions: updatedQuestions };

        // Keep viewing modal in sync immediately
        if (viewingDecision && viewingDecision.id === decisionId) {
          setViewingDecision(updated);
        }
        return updated;
      })
    );
  };

  // Handler: Snooze review date by N days
  const handleSnooze = (decisionId, offsetDays) => {
    const newDate = getRelativeDateString(offsetDays);
    setDecisions((prev) =>
      prev.map((d) => (d.id === decisionId ? { ...d, reviewDate: newDate } : d))
    );
    if (viewingDecision && viewingDecision.id === decisionId) {
      setViewingDecision((prev) => ({ ...prev, reviewDate: newDate }));
    }
  };

  // Handler: Update Pros & Cons for an option
  const handleUpdateOptionProsCons = (decisionId, optionIndex, newPros, newCons) => {
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id !== decisionId) return d;
        const currentOptions = (d.options || []).map((o) =>
          typeof o === 'string' ? { title: o, pros: [], cons: [] } : { ...o }
        );
        if (currentOptions[optionIndex]) {
          currentOptions[optionIndex] = {
            ...currentOptions[optionIndex],
            pros: newPros,
            cons: newCons
          };
        }
        const updated = { ...d, options: currentOptions };
        if (viewingDecision && viewingDecision.id === decisionId) {
          setViewingDecision(updated);
        }
        return updated;
      })
    );
  };

  // Handler: Add a next small step
  const handleAddNextStep = (decisionId, { text, minutes }) => {
    const newStep = {
      id: `step-${Date.now()}`,
      text,
      minutes: minutes || null,
      completed: false
    };
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id !== decisionId) return d;
        const existingSteps = Array.isArray(d.nextSteps) ? d.nextSteps : [];
        const updated = { ...d, nextSteps: [...existingSteps, newStep] };
        if (viewingDecision && viewingDecision.id === decisionId) {
          setViewingDecision(updated);
        }
        return updated;
      })
    );
  };

  // Handler: Toggle complete status on a next step
  const handleToggleStepComplete = (decisionId, stepId) => {
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id !== decisionId) return d;
        const existingSteps = Array.isArray(d.nextSteps) ? d.nextSteps : [];
        const updatedSteps = existingSteps.map((s) =>
          s.id === stepId ? { ...s, completed: !s.completed } : s
        );
        const updated = { ...d, nextSteps: updatedSteps };
        if (viewingDecision && viewingDecision.id === decisionId) {
          setViewingDecision(updated);
        }
        return updated;
      })
    );
  };

  // Handler: Mark as Decided
  const handleConfirmDecided = (decisionId, resultData) => {
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id !== decisionId) return d;
        return {
          ...d,
          status: 'decided',
          decisionResult: resultData
        };
      })
    );
    if (viewingDecision && viewingDecision.id === decisionId) {
      setViewingDecision(null);
    }
    // Switch to history view so user can see their decided decision
    setActiveTab('history');
  };

  // Handler: Reopen / Unpark decision
  const handleReopenDecision = (decisionId) => {
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id !== decisionId) return d;
        return {
          ...d,
          status: 'parked',
          decisionResult: null
        };
      })
    );
  };

  // Handler: Delete decision
  const handleDeleteDecision = (decisionId) => {
    setDecisions((prev) => prev.filter((d) => d.id !== decisionId));
    if (viewingDecision && viewingDecision.id === decisionId) {
      setViewingDecision(null);
    }
  };

  // Handler: Reset sample data
  const handleResetSampleData = () => {
    if (window.confirm('Reset all decisions back to the initial sample data?')) {
      const initial = getInitialSampleDecisions();
      setDecisions(initial);
      setSelectedCategory('All');
      setSearchQuery('');
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCount={activeDecisions.length}
        historyCount={historyDecisions.length}
        onOpenAddModal={() => {
          setEditingDecision(null);
          setIsFormOpen(true);
        }}
      />

      <main className="main-content">
        {activeTab === 'dashboard' ? (
          <>
            {/* Welcome Section */}
            <section className="welcome-section">
              <h1 className="welcome-title">Clear your mind. Park the decision.</h1>
              <p className="welcome-subtitle">
                You don't have to figure everything out right now. Write it down, set a date, and come back when you're ready.
              </p>
            </section>

            {/* Summary Statistics */}
            <StatsSummary
              activeCount={activeDecisions.length}
              dueCount={attentionDecisions.length}
              decidedCount={historyDecisions.length}
            />

            {/* Needs Your Attention Banner */}
            <AttentionBanner
              attentionDecisions={attentionDecisions}
              onSelectDecision={(dec) => setViewingDecision(dec)}
              onSnooze={handleSnooze}
            />

            {/* Your Parking Lot */}
            <section aria-label="Your Parking Lot">
              <div className="parking-section-header">
                <div className="parking-section-title-wrap">
                  <h2 className="parking-section-title">Your Parking Lot</h2>
                  <span className="parking-count-pill">
                    {activeDecisions.length} active
                  </span>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setIsExploreModalOpen(true)}
                    id="explore-samples-btn"
                    title="Browse relatable college and placement dilemmas"
                  >
                    Explore samples →
                  </button>
                </div>

                {/* Search and Category Filter */}
                {activeDecisions.length > 0 && (
                  <div className="parking-filter-bar">
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Search
                        size={14}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          color: 'var(--text-muted)',
                          pointerEvents: 'none'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Search decisions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input"
                        style={{
                          paddingLeft: '2rem',
                          paddingTop: '0.4rem',
                          paddingBottom: '0.4rem',
                          fontSize: '0.825rem',
                          width: '180px'
                        }}
                      />
                    </div>

                    <select
                      className="filter-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      aria-label="Filter by category"
                    >
                      <option value="All">All Categories</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Cards Grid or Empty State */}
              {activeDecisions.length === 0 ? (
                <EmptyState
                  type="active"
                  onAction={() => {
                    setEditingDecision(null);
                    setIsFormOpen(true);
                  }}
                  actionLabel="+ Park Your First Decision"
                />
              ) : filteredActiveDecisions.length === 0 ? (
                <div
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px dashed var(--border-strong)',
                    borderRadius: 'var(--r-md)',
                    padding: '2.5rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)'
                  }}
                >
                  <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                    No decisions match your search or filter.
                  </p>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="decision-grid">
                  {filteredActiveDecisions.map((decision) => (
                    <DecisionCard
                      key={decision.id}
                      decision={decision}
                      onSelect={(dec) => setViewingDecision(dec)}
                      onToggleStepComplete={handleToggleStepComplete}
                      onSnooze={handleSnooze}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        ) : (
          /* History View */
          <HistoryView
            decidedDecisions={historyDecisions}
            onReopenDecision={handleReopenDecision}
            onDeleteDecision={handleDeleteDecision}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <strong>Decision Parking Lot</strong> — Built with React & Vite. Local storage persisted.
          </div>
          <div className="footer-actions">
            <button
              type="button"
              className="btn-ghost"
              style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              onClick={handleResetSampleData}
              title="Reset sample data for testing and demonstration"
            >
              <RotateCcw size={13} />
              <span>Reset Sample Data</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Add / Edit Decision Modal */}
      <DecisionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingDecision(null);
        }}
        onSave={handleSaveDecision}
        initialDecision={editingDecision}
      />

      {/* Decision Details Modal */}
      <DecisionDetails
        isOpen={Boolean(viewingDecision)}
        onClose={() => setViewingDecision(null)}
        decision={viewingDecision}
        onToggleQuestion={handleToggleQuestion}
        onOpenDecideModal={(dec) => setDecidingDecision(dec)}
        onEditDecision={(dec) => {
          setEditingDecision(dec);
          setIsFormOpen(true);
        }}
        onDeleteDecision={handleDeleteDecision}
        onSnooze={handleSnooze}
        onUpdateOptionProsCons={handleUpdateOptionProsCons}
        onAddNextStep={handleAddNextStep}
        onToggleStepComplete={handleToggleStepComplete}
      />

      {/* Decide Modal */}
      <DecideModal
        isOpen={Boolean(decidingDecision)}
        onClose={() => setDecidingDecision(null)}
        decision={decidingDecision}
        onConfirmDecided={handleConfirmDecided}
      />

      {/* Explore Sample Decisions Modal */}
      <ExploreSamplesModal
        isOpen={isExploreModalOpen}
        onClose={() => setIsExploreModalOpen(false)}
        existingDecisions={decisions}
        onParkSampleDecision={handleParkSampleDecision}
      />
    </div>
  );
}
