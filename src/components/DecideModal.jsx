import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Smile, ShieldAlert } from 'lucide-react';
import { getTodayString } from '../utils/dateUtils';
import { getNormalizedOptions } from '../utils/decisionUtils';

export default function DecideModal({ isOpen, onClose, decision, onConfirmDecided }) {
  if (!isOpen || !decision) return null;

  const normalizedOptions = getNormalizedOptions(decision);
  const { title } = decision;

  const defaultOption = normalizedOptions.length > 0 ? normalizedOptions[0].title : '';

  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [customOption, setCustomOption] = useState('');
  const [isCustom, setIsCustom] = useState(normalizedOptions.length === 0);
  const [finalReason, setFinalReason] = useState('');
  const [confidence, setConfidence] = useState('High');
  const [reflection, setReflection] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalChoice = isCustom ? customOption.trim() : selectedOption;

    if (!finalChoice) {
      setError('Please choose or enter the option you decided on.');
      return;
    }
    if (!finalReason.trim()) {
      setError('Please share a brief rationale for why you chose this.');
      return;
    }

    onConfirmDecided(decision.id, {
      selectedOption: finalChoice,
      finalReason: finalReason.trim(),
      confidence: confidence || 'High',
      reflection: reflection.trim(),
      decidedAt: getTodayString()
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <CheckCircle2 size={20} color="var(--green)" />
            <h2 className="modal-title">Mark as Decided</h2>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          <div className="modal-body">
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                DECISION
              </span>
              <p style={{ fontWeight: 500, fontSize: '1.05rem', marginTop: '2px', color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>
                {title}
              </p>
            </div>

            {/* Which option was chosen? */}
            <div className="form-group">
              <label className="form-label">
                <span>
                  Which option did you choose? <span className="required-star">*</span>
                </span>
              </label>

              {normalizedOptions.length > 0 && !isCustom && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.5rem' }}>
                  {normalizedOptions.map((opt, idx) => (
                    <label
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--r-md)',
                        border: selectedOption === opt.title ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                        background: selectedOption === opt.title ? 'var(--accent-light)' : 'var(--bg-card)',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      <input
                        type="radio"
                        name="decidedOption"
                        value={opt.title}
                        checked={selectedOption === opt.title}
                        onChange={() => setSelectedOption(opt.title)}
                        style={{ accentColor: 'var(--accent)' }}
                      />
                      <span>{opt.title}</span>
                    </label>
                  ))}
                </div>
              )}

              {normalizedOptions.length > 0 && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{ fontSize: '0.78rem', padding: '0.2rem 0.4rem' }}
                    onClick={() => setIsCustom(!isCustom)}
                  >
                    {isCustom ? '← Pick from saved options' : '+ Specify another option'}
                  </button>
                </div>
              )}

              {isCustom && (
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter the chosen option or decision..."
                  value={customOption}
                  onChange={(e) => setCustomOption(e.target.value)}
                  autoFocus
                />
              )}
            </div>

            {/* Why was this option chosen? */}
            <div className="form-group">
              <label className="form-label" htmlFor="decide-final-reason">
                <span>
                  Why was this option chosen? <span className="required-star">*</span>
                </span>
                <span className="form-helper">Record your final rationale for future reference</span>
              </label>
              <textarea
                id="decide-final-reason"
                className="form-textarea"
                rows={3}
                placeholder="What evidence, intuition, or compromise tipped the scale?"
                value={finalReason}
                onChange={(e) => {
                  setFinalReason(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>

            {/* Confidence Selector */}
            <div className="form-group">
              <label className="form-label">
                <span>Confidence Level</span>
                <span className="form-helper">How certain do you feel about this choice?</span>
              </label>
              <div className="confidence-selector-row">
                {['High', 'Moderate', 'Uncertain'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`confidence-option-btn ${confidence === lvl ? 'selected' : ''}`}
                    onClick={() => setConfidence(lvl)}
                  >
                    {lvl === 'High' && '✨ High'}
                    {lvl === 'Moderate' && '⚖️ Moderate'}
                    {lvl === 'Uncertain' && '💭 Uncertain'}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature 4: Decision Reflection */}
            <div className="form-group">
              <label className="form-label" htmlFor="decision-reflection">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={14} color="#a21caf" />
                  What did you learn from making this decision?
                </span>
                <span className="form-helper">Optional reflection</span>
              </label>
              <textarea
                id="decision-reflection"
                className="form-textarea"
                rows={2}
                placeholder="e.g. Taking time to test my assumptions saved me from rushing into an expensive commitment."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
            </div>

            {error && (
              <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 500 }}>
                {error}
              </span>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" id="confirm-decide-btn">
              Confirm & Move to History
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
