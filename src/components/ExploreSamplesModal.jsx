import React, { useState } from 'react';
import { X, Search, Sparkles, Check, Plus, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { CATALOG_DECISION_POOL } from '../data/sampleData';

export default function ExploreSamplesModal({
  isOpen,
  onClose,
  existingDecisions = [],
  onParkSampleDecision
}) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // Check which titles are already parked to prevent duplicates
  const existingTitles = new Set(
    existingDecisions.map((d) => d.title.trim().toLowerCase())
  );

  // Filter catalog decisions
  const filteredCatalog = CATALOG_DECISION_POOL.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePark = (item) => {
    onParkSampleDecision(item);
    setRecentlyAddedId(item.title);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-soft)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Compass size={18} />
            </div>
            <div>
              <h2 className="modal-title">Explore Sample Decisions</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Relatable dilemmas from final-year engineering life: placements, friendships, money & academics
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            flexWrap: 'wrap',
            background: 'var(--bg-subtle)'
          }}
        >
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Search sample ideas (DSA, bond, rent, Bangalore...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2rem', paddingRight: '0.5rem', fontSize: '0.825rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {['All', 'Career', 'Education', 'Personal', 'Technology'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn-ghost ${selectedCategory === cat ? 'active' : ''}`}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.55rem',
                  borderRadius: 'var(--r-full)',
                  background: selectedCategory === cat ? 'var(--bg-card)' : 'transparent',
                  border: selectedCategory === cat ? '1px solid var(--border-strong)' : '1px solid transparent',
                  fontWeight: selectedCategory === cat ? 600 : 500,
                  color: selectedCategory === cat ? 'var(--accent)' : 'var(--text-secondary)'
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Cards List */}
        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {filteredCatalog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              No sample decisions found matching your search.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredCatalog.map((item, idx) => {
                const isAlreadyParked = existingTitles.has(item.title.trim().toLowerCase());
                const isJustAdded = recentlyAddedId === item.title;

                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--r-md)',
                      padding: '0.9rem 1.1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                        <span className={`category-badge category-${item.category}`}>
                          {item.category}
                        </span>
                        {item.tag && (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                              background: 'var(--bg-subtle)',
                              padding: '0.15rem 0.45rem',
                              borderRadius: 'var(--r-xs)'
                            }}
                          >
                            #{item.tag}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      {isAlreadyParked ? (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--green)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            background: 'var(--green-bg)',
                            border: '1px solid var(--green-border)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--r-full)'
                          }}
                        >
                          <Check size={12} />
                          Already Parked
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="btn-primary"
                          style={{
                            fontSize: '0.78rem',
                            padding: '0.3rem 0.7rem',
                            background: isJustAdded ? 'var(--green)' : 'var(--accent)'
                          }}
                          onClick={() => handlePark(item)}
                        >
                          {isJustAdded ? (
                            <>
                              <Check size={13} />
                              <span>Parked!</span>
                            </>
                          ) : (
                            <>
                              <Plus size={13} />
                              <span>Park Decision</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <h4 style={{ fontSize: '0.975rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.35 }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {item.reason}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                      <span>{item.options.length} options</span>
                      <span>•</span>
                      <span>{item.questions.length} research questions</span>
                      {item.nextSteps && item.nextSteps.length > 0 && (
                        <>
                          <span>•</span>
                          <span>Next step: {item.nextSteps[0].text}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Adding a sample decision adapts its review date to your current week.
          </span>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
