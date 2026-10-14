import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { getReviewStatus } from '../utils/dateUtils';

export default function AttentionBanner({
  attentionDecisions,
  onSelectDecision,
  onSnooze
}) {
  if (!attentionDecisions || attentionDecisions.length === 0) {
    return null;
  }

  return (
    <section className="attention-section" aria-label="Needs Your Attention">
      <div className="attention-container">
        <div className="attention-header">
          <span className="attention-header-badge">
            <AlertTriangle size={13} />
            Needs Attention
          </span>
          <h2 className="attention-header-title">
            {attentionDecisions.length} decision{attentionDecisions.length === 1 ? ' is' : 's are'} due for review today or overdue
          </h2>
        </div>

        <div className="attention-items-list">
          {attentionDecisions.map((dec) => {
            const reviewStatus = getReviewStatus(dec.reviewDate);
            return (
              <div key={dec.id} className="attention-row">
                <div className="attention-row-info">
                  <span className="attention-slot-tag">P-{String(dec.slotNumber).padStart(2, '0')}</span>
                  <span className="attention-row-title" title={dec.title}>
                    {dec.title}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span className="attention-row-due">
                    <Clock size={14} />
                    {reviewStatus.label}
                  </span>

                  {/* Snooze quick actions */}
                  {onSnooze && (
                    <div className="attention-snooze-btn-group" title="Postpone review date">
                      <button
                        type="button"
                        className="btn-attention-snooze"
                        onClick={() => onSnooze(dec.id, 1)}
                        title="Postpone to tomorrow (+1 day)"
                      >
                        +1d
                      </button>
                      <button
                        type="button"
                        className="btn-attention-snooze"
                        onClick={() => onSnooze(dec.id, 3)}
                        title="Postpone by 3 days"
                      >
                        +3d
                      </button>
                      <button
                        type="button"
                        className="btn-attention-snooze"
                        onClick={() => onSnooze(dec.id, 7)}
                        title="Postpone by 7 days"
                      >
                        +7d
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn-attention-action"
                    onClick={() => onSelectDecision(dec)}
                    id={`attention-review-${dec.id}`}
                  >
                    Review Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
