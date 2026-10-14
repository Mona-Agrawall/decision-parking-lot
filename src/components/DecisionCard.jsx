import React from 'react';
import { Calendar, ArrowRight, Zap, Check, Clock } from 'lucide-react';
import { formatFriendlyDate, getReviewStatus } from '../utils/dateUtils';
import { getNormalizedOptions, getActiveStep, getLastCompletedStep } from '../utils/decisionUtils';
import ProgressBar from './ProgressBar';

export default function DecisionCard({ decision, onSelect, onToggleStepComplete, onSnooze }) {
  const { slotNumber, title, category, reason, questions = [], reviewDate } = decision;

  const normalizedOptions = getNormalizedOptions(decision);
  const totalQuestions = questions.length;
  const answeredQuestions = questions.filter((q) => q.answered).length;
  const reviewInfo = getReviewStatus(reviewDate);

  // Next step info
  const activeStep = getActiveStep(decision);
  const lastCompleted = getLastCompletedStep(decision);

  return (
    <article className="decision-card" id={`decision-card-${decision.id}`}>
      {/* Top row: Parking Stall number + Sample Badge + Category Badge */}
      <div className="decision-card-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <div className="stall-badge">
            <span className="stall-p">P</span>
            <span>{String(slotNumber).padStart(2, '0')}</span>
          </div>
          {decision.isSample && (
            <span className="sample-indicator-pill" title="Sample decision idea">
              Sample
            </span>
          )}
        </div>
        <span className={`category-badge category-${category || 'Other'}`}>
          {category || 'Other'}
        </span>
      </div>

      {/* Decision Title */}
      <h3 className="decision-title">{title}</h3>

      {/* Reason Preview */}
      <p className="decision-reason-preview" title={reason}>
        {reason || 'No specific reason entered.'}
      </p>

      {/* Metadata Row: Review Date & Status */}
      <div className="decision-meta-row">
        <span className={`review-date-pill ${reviewInfo.status}`}>
          <Calendar size={13} />
          <span>{reviewInfo.label}</span>
          <span style={{ color: 'var(--text-faint)', fontSize: '0.72rem' }}>
            ({formatFriendlyDate(reviewDate)})
          </span>
        </span>

        <span className="questions-count-text">
          {normalizedOptions.length} option{normalizedOptions.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Snooze Review Row (Feature 3) */}
      {onSnooze && (
        <div className="snooze-bar-row">
          <span className="snooze-label">
            <Clock size={11} /> Snooze:
          </span>
          <button
            type="button"
            className="btn-snooze-pill"
            onClick={(e) => {
              e.stopPropagation();
              onSnooze(decision.id, 1);
            }}
            title="Postpone to tomorrow (+1 day)"
          >
            +1d
          </button>
          <button
            type="button"
            className="btn-snooze-pill"
            onClick={(e) => {
              e.stopPropagation();
              onSnooze(decision.id, 3);
            }}
            title="Postpone by 3 days"
          >
            +3d
          </button>
          <button
            type="button"
            className="btn-snooze-pill"
            onClick={(e) => {
              e.stopPropagation();
              onSnooze(decision.id, 7);
            }}
            title="Postpone by 7 days"
          >
            +7d
          </button>
        </div>
      )}

      {/* Next Actionable Step (Feature 2) */}
      {activeStep ? (
        <div className="card-next-step" title={`Next step: ${activeStep.text}`}>
          <div className="card-next-step-left">
            <Zap size={13} className="card-next-step-icon" />
            <span className="card-next-step-text">{activeStep.text}</span>
            {activeStep.minutes && (
              <span className="step-duration-badge">{activeStep.minutes}m</span>
            )}
          </div>
          {onToggleStepComplete && (
            <button
              type="button"
              className="btn-complete-step-mini"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStepComplete(decision.id, activeStep.id);
              }}
              title="Mark step complete"
            >
              <Check size={12} />
            </button>
          )}
        </div>
      ) : lastCompleted ? (
        <div className="card-next-step" style={{ background: 'var(--green-bg)', borderColor: 'var(--green-border)' }}>
          <div className="card-next-step-left">
            <Check size={13} style={{ color: 'var(--green-mid)', flexShrink: 0 }} />
            <span
              className="card-next-step-text"
              style={{ color: 'var(--green)', textDecoration: 'line-through' }}
              title={`Completed: ${lastCompleted.text}`}
            >
              {lastCompleted.text}
            </span>
          </div>
        </div>
      ) : null}

      {/* Progress Bar for Questions */}
      <div className="card-progress-wrapper" style={{ marginTop: '0.75rem' }}>
        <ProgressBar
          completed={answeredQuestions}
          total={totalQuestions}
          size="sm"
          showLabel={true}
        />
      </div>

      {/* Footer Action */}
      <div className="card-footer-actions">
        <button
          type="button"
          className="btn-view-card"
          onClick={() => onSelect(decision)}
          id={`view-decision-${decision.id}`}
        >
          <span>View Decision</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}
