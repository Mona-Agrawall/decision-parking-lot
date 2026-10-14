import React, { useState } from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit3,
  HelpCircle,
  Lightbulb,
  CheckSquare,
  Square,
  Clock,
  Plus,
  Zap,
  Check,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { formatFriendlyDate, getReviewStatus } from '../utils/dateUtils';
import {
  getNormalizedOptions,
  getActiveStep,
  getSafeNextSteps
} from '../utils/decisionUtils';
import ProgressBar from './ProgressBar';

export default function DecisionDetails({
  isOpen,
  onClose,
  decision,
  onToggleQuestion,
  onOpenDecideModal,
  onEditDecision,
  onDeleteDecision,
  onSnooze,
  onUpdateOptionProsCons,
  onAddNextStep,
  onToggleStepComplete
}) {
  if (!isOpen || !decision) return null;

  const {
    id,
    slotNumber,
    title,
    category,
    reason,
    questions = [],
    reviewDate,
    currentThinking
  } = decision;

  const normalizedOptions = getNormalizedOptions(decision);
  const reviewInfo = getReviewStatus(reviewDate);
  const totalQuestions = questions.length;
  const answeredQuestions = questions.filter((q) => q.answered).length;

  // Next steps
  const nextSteps = getSafeNextSteps(decision);
  const activeStep = getActiveStep(decision);
  const completedSteps = nextSteps.filter((s) => s.completed);

  // Local state for adding a new step
  const [newStepText, setNewStepText] = useState('');
  const [newStepMinutes, setNewStepMinutes] = useState('');

  // Local state for inline adding pros & cons
  const [newProInputs, setNewProInputs] = useState({});
  const [newConInputs, setNewConInputs] = useState({});

  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmed) {
      onDeleteDecision(id);
      onClose();
    }
  };

  // Add Pro handler
  const handleAddPro = (optIndex) => {
    const text = (newProInputs[optIndex] || '').trim();
    if (!text) return;
    const currentOpt = normalizedOptions[optIndex];
    const updatedPros = [...currentOpt.pros, text];
    onUpdateOptionProsCons(id, optIndex, updatedPros, currentOpt.cons);
    setNewProInputs({ ...newProInputs, [optIndex]: '' });
  };

  // Remove Pro handler
  const handleRemovePro = (optIndex, proIndex) => {
    const currentOpt = normalizedOptions[optIndex];
    const updatedPros = currentOpt.pros.filter((_, idx) => idx !== proIndex);
    onUpdateOptionProsCons(id, optIndex, updatedPros, currentOpt.cons);
  };

  // Add Con handler
  const handleAddCon = (optIndex) => {
    const text = (newConInputs[optIndex] || '').trim();
    if (!text) return;
    const currentOpt = normalizedOptions[optIndex];
    const updatedCons = [...currentOpt.cons, text];
    onUpdateOptionProsCons(id, optIndex, currentOpt.pros, updatedCons);
    setNewConInputs({ ...newConInputs, [optIndex]: '' });
  };

  // Remove Con handler
  const handleRemoveCon = (optIndex, conIndex) => {
    const currentOpt = normalizedOptions[optIndex];
    const updatedCons = currentOpt.cons.filter((_, idx) => idx !== conIndex);
    onUpdateOptionProsCons(id, optIndex, currentOpt.pros, updatedCons);
  };

  // Add Next Step handler
  const handleAddStepSubmit = (e) => {
    e.preventDefault();
    if (!newStepText.trim()) return;
    onAddNextStep(id, {
      text: newStepText.trim(),
      minutes: newStepMinutes ? parseInt(newStepMinutes, 10) : null
    });
    setNewStepText('');
    setNewStepMinutes('');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="stall-badge">
              <span className="stall-p">P</span>
              <span>{String(slotNumber).padStart(2, '0')}</span>
            </div>
            {decision.isSample && (
              <span className="sample-indicator-pill" title="Sample decision idea">
                Sample
              </span>
            )}
            <span className={`category-badge category-${category || 'Other'}`}>
              {category || 'Other'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: '0.35rem 0.6rem' }}
              onClick={() => {
                onClose();
                onEditDecision(decision);
              }}
              title="Edit decision details"
            >
              <Edit3 size={15} />
              <span style={{ fontSize: '0.8rem' }}>Edit</span>
            </button>
            <button
              type="button"
              className="btn-danger-ghost"
              style={{ padding: '0.35rem 0.6rem' }}
              onClick={handleDelete}
              title="Delete decision"
            >
              <Trash2 size={15} />
            </button>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Title & Review Date / Snooze */}
          <div>
            <h2 className="modal-title" style={{ fontSize: '1.25rem', lineHeight: 1.3, fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
              {title}
            </h2>

            <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span className={`review-date-pill ${reviewInfo.status}`}>
                  <Calendar size={14} />
                  <span>
                    Revisit: <strong>{formatFriendlyDate(reviewDate)}</strong> ({reviewInfo.label})
                  </span>
                </span>
              </div>

              {/* Feature 3: Snooze quick actions */}
              {onSnooze && (
                <div className="snooze-bar-row">
                  <span className="snooze-label">
                    <Clock size={12} /> Postpone review:
                  </span>
                  <button
                    type="button"
                    className="btn-snooze-pill"
                    onClick={() => onSnooze(id, 1)}
                    title="Postpone until tomorrow (+1 day)"
                  >
                    +1d Tomorrow
                  </button>
                  <button
                    type="button"
                    className="btn-snooze-pill"
                    onClick={() => onSnooze(id, 3)}
                    title="Postpone by 3 days"
                  >
                    +3d In 3 days
                  </button>
                  <button
                    type="button"
                    className="btn-snooze-pill"
                    onClick={() => onSnooze(id, 7)}
                    title="Postpone by 7 days"
                  >
                    +7d In 7 days
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Decision Progress Bar */}
          <div style={{ background: 'var(--bg-subtle)', padding: '10px 14px', borderRadius: 'var(--r-sm)' }}>
            <ProgressBar
              completed={answeredQuestions}
              total={totalQuestions}
              size="md"
              showLabel={true}
            />
          </div>

          {/* Feature 2: Next Small Step */}
          <div>
            <div className="detail-section-title">
              <Zap size={14} style={{ color: '#f59e0b' }} /> Actionable Next Step
            </div>
            <div className="detail-next-step-card">
              {activeStep ? (
                <div className="active-step-row">
                  <div className="active-step-info">
                    <Zap size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                    <span className="active-step-title">{activeStep.text}</span>
                    {activeStep.minutes && (
                      <span className="step-duration-badge">⏱️ {activeStep.minutes} mins</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn-mark-step-complete"
                    onClick={() => onToggleStepComplete(id, activeStep.id)}
                    title="Mark this next step complete"
                  >
                    <Check size={14} />
                    <span>Done</span>
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  {completedSteps.length > 0
                    ? 'All set! Ready to define your next small step?'
                    : 'Break inertia by defining one small, low-effort action to take next.'}
                </p>
              )}

              {/* Form to add a new step */}
              {(!activeStep || completedSteps.length > 0) && (
                <form onSubmit={handleAddStepSubmit} className="add-step-inline-form">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Call admissions office to ask about deadline..."
                    value={newStepText}
                    onChange={(e) => setNewStepText(e.target.value)}
                    style={{ flex: 1, minWidth: '180px', fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                  />
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Mins (opt)"
                    min="1"
                    max="999"
                    value={newStepMinutes}
                    onChange={(e) => setNewStepMinutes(e.target.value)}
                    style={{ width: '85px', fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                  />
                  <button
                    type="submit"
                    className="btn-secondary"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.75rem' }}
                  >
                    <Plus size={14} />
                    <span>Add Step</span>
                  </button>
                </form>
              )}

              {/* Completed steps history */}
              {completedSteps.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Completed Steps ({completedSteps.length})
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                    {completedSteps.map((step) => (
                      <div key={step.id} className="completed-step-pill">
                        <Check size={12} style={{ color: '#10b981', flexShrink: 0 }} />
                        <span>{step.text}</span>
                        {step.minutes && <span style={{ fontSize: '0.7rem' }}>({step.minutes}m)</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reason for Decision */}
          <div>
            <div className="detail-section-title">Why this decision matters</div>
            <div className="detail-text-box">
              {reason || 'No specific reasoning entered.'}
            </div>
          </div>

          {/* Feature 1: Possible Options with Pros & Cons */}
          <div>
            <div className="detail-section-title">
              Possible Options & Pros / Cons ({normalizedOptions.length})
            </div>
            {normalizedOptions.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No options recorded yet.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {normalizedOptions.map((opt, idx) => (
                  <div key={idx} className="option-detail-card">
                    {/* Option Header */}
                    <div className="option-header-row">
                      <span className="option-bullet" />
                      <div className="option-header-title">
                        <strong>Option {idx + 1}:</strong> {opt.title}
                      </div>
                    </div>

                    {/* Pros and Cons 2-column grid */}
                    <div className="pros-cons-grid">
                      {/* Pros Column */}
                      <div className="pro-con-column pros">
                        <div className="pro-con-header pros-title">
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <ThumbsUp size={12} /> Pros
                          </span>
                          <span className="pro-con-count pros-count">{opt.pros.length}</span>
                        </div>

                        {opt.pros.length > 0 ? (
                          <div className="pro-con-list">
                            {opt.pros.map((pro, pIdx) => (
                              <div key={pIdx} className="pro-con-item pro-item">
                                <span>+ {pro}</span>
                                <button
                                  type="button"
                                  className="pro-con-remove-btn"
                                  onClick={() => handleRemovePro(idx, pIdx)}
                                  title="Remove pro"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#166534', opacity: 0.7 }}>
                            No pros added yet.
                          </span>
                        )}

                        {/* Inline add pro */}
                        <div className="pro-con-add-row">
                          <input
                            type="text"
                            className="pro-con-input"
                            placeholder="+ Add pro..."
                            value={newProInputs[idx] || ''}
                            onChange={(e) =>
                              setNewProInputs({ ...newProInputs, [idx]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddPro(idx);
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="pro-con-add-btn pro-btn"
                            onClick={() => handleAddPro(idx)}
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Cons Column */}
                      <div className="pro-con-column cons">
                        <div className="pro-con-header cons-title">
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <ThumbsDown size={12} /> Cons
                          </span>
                          <span className="pro-con-count cons-count">{opt.cons.length}</span>
                        </div>

                        {opt.cons.length > 0 ? (
                          <div className="pro-con-list">
                            {opt.cons.map((con, cIdx) => (
                              <div key={cIdx} className="pro-con-item con-item">
                                <span>- {con}</span>
                                <button
                                  type="button"
                                  className="pro-con-remove-btn"
                                  onClick={() => handleRemoveCon(idx, cIdx)}
                                  title="Remove con"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#991b1b', opacity: 0.7 }}>
                            No cons added yet.
                          </span>
                        )}

                        {/* Inline add con */}
                        <div className="pro-con-add-row">
                          <input
                            type="text"
                            className="pro-con-input"
                            placeholder="- Add con..."
                            value={newConInputs[idx] || ''}
                            onChange={(e) =>
                              setNewConInputs({ ...newConInputs, [idx]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCon(idx);
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="pro-con-add-btn con-btn"
                            onClick={() => handleAddCon(idx)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Questions with Interactive Checkboxes */}
          <div>
            <div className="detail-section-title">
              Questions I Need Answered ({answeredQuestions}/{totalQuestions})
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Check off questions as you discover facts or verify criteria:
            </p>

            {questions.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No questions listed yet.
              </p>
            ) : (
              <div className="questions-checklist">
                {questions.map((q) => (
                  <label
                    key={q.id}
                    className="question-check-item"
                    onClick={(e) => {
                      if (e.target.tagName !== 'INPUT') {
                        onToggleQuestion(id, q.id);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      className="question-checkbox"
                      checked={Boolean(q.answered)}
                      onChange={() => onToggleQuestion(id, q.id)}
                    />
                    <span className={`question-text ${q.answered ? 'checked' : ''}`}>
                      {q.text}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Current Thinking */}
          {currentThinking && (
            <div>
              <div className="detail-section-title">
                <Lightbulb size={14} /> Current Thinking
              </div>
              <div className="detail-text-box" style={{ fontStyle: 'italic' }}>
                "{currentThinking}"
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose} id="keep-parked-btn">
            Keep Parked
          </button>

          <button
            type="button"
            className="btn-primary"
            style={{ background: 'var(--green-mid)' }}
            onClick={() => {
              onClose();
              onOpenDecideModal(decision);
            }}
            id="mark-decided-btn"
          >
            <CheckCircle2 size={16} />
            <span>Mark as Decided</span>
          </button>
        </div>
      </div>
    </div>
  );
}
