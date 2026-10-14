import React from 'react';
import { CheckCircle2, RotateCcw, Trash2, Calendar, Sparkles } from 'lucide-react';
import { formatFriendlyDate } from '../utils/dateUtils';
import EmptyState from './EmptyState';

export default function HistoryView({
  decidedDecisions = [],
  onReopenDecision,
  onDeleteDecision
}) {
  if (decidedDecisions.length === 0) {
    return <EmptyState type="history" />;
  }

  return (
    <section className="history-section" aria-label="Decision History">
      <div className="history-header">
        <div>
          <h2 className="history-title">Decision History</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Archive of choices made, your selected options, rationale, and reflections.
          </p>
        </div>
        <span className="parking-count-pill">
          {decidedDecisions.length} Completed Decision{decidedDecisions.length === 1 ? '' : 's'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {decidedDecisions.map((dec) => {
          const { id, title, category, decisionResult = {}, createdAt } = dec;
          const {
            selectedOption,
            finalReason,
            confidence = 'High',
            reflection,
            decidedAt
          } = decisionResult || {};

          const handleDelete = () => {
            if (window.confirm(`Delete "${title}" from history permanently?`)) {
              onDeleteDecision(id);
            }
          };

          return (
            <article key={id} className="history-card" id={`history-card-${id}`}>
              <div className="history-card-header">
                <div className="history-card-left">
                  <span className={`category-badge category-${category || 'Other'}`}>
                    {category || 'Other'}
                  </span>
                  <span className="history-decided-pill">
                    <CheckCircle2 size={13} />
                    Decided
                  </span>
                  {confidence && (
                    <span className={`history-confidence-pill confidence-${confidence}`}>
                      {confidence} Confidence
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
                    onClick={() => onReopenDecision(id)}
                    title="Move back to active parking lot"
                  >
                    <RotateCcw size={13} />
                    <span>Unpark / Reopen</span>
                  </button>
                  <button
                    type="button"
                    className="btn-danger-ghost"
                    style={{ padding: '0.3rem 0.5rem' }}
                    onClick={handleDelete}
                    title="Delete permanently"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {title}
              </h3>

              {/* Chosen Option and Reason Callout */}
              <div className="history-choice-box">
                <div className="history-choice-title">Selected Option</div>
                <div className="history-choice-chosen">
                  ✓ {selectedOption || 'Choice recorded'}
                </div>

                <div className="history-choice-title" style={{ marginTop: '0.65rem' }}>
                  Final Rationale
                </div>
                <div className="history-choice-rationale">
                  {finalReason || 'No final rationale provided.'}
                </div>
              </div>

              {/* Feature 4: Reflection Box */}
              {reflection && (
                <div className="history-reflection-box">
                  <div className="history-reflection-title">
                    <Sparkles size={13} />
                    <span>What I Learned From Making This Decision</span>
                  </div>
                  <p className="history-reflection-text">
                    "{reflection}"
                  </p>
                </div>
              )}

              {/* Footer timestamps */}
              <div className="history-card-footer">
                <span>
                  Decided on: <strong>{formatFriendlyDate(decidedAt)}</strong>
                </span>
                {createdAt && (
                  <span>
                    Originally parked: {formatFriendlyDate(createdAt)}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
