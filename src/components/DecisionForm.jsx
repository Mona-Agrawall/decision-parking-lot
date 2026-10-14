import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, HelpCircle, ListFilter } from 'lucide-react';
import { CATEGORIES } from '../data/sampleData';
import { getRelativeDateString } from '../utils/dateUtils';

export default function DecisionForm({ isOpen, onClose, onSave, initialDecision = null }) {
  if (!isOpen) return null;

  const isEditMode = Boolean(initialDecision);

  const [title, setTitle] = useState(initialDecision ? initialDecision.title : '');
  const [category, setCategory] = useState(initialDecision ? initialDecision.category : 'Career');
  const [reason, setReason] = useState(initialDecision ? initialDecision.reason : '');
  const [reviewDate, setReviewDate] = useState(
    initialDecision ? initialDecision.reviewDate : getRelativeDateString(7)
  );
  const [currentThinking, setCurrentThinking] = useState(
    initialDecision?.currentThinking || ''
  );

  // Options state
  const [options, setOptions] = useState(
    initialDecision ? [...initialDecision.options] : ['']
  );
  const [newOptionInput, setNewOptionInput] = useState('');

  // Questions state (each is { id, text, answered })
  const [questions, setQuestions] = useState(
    initialDecision
      ? initialDecision.questions.map((q) => ({ ...q }))
      : []
  );
  const [newQuestionInput, setNewQuestionInput] = useState('');

  const [errors, setErrors] = useState({});

  // Handlers for Options
  const handleAddOption = (e) => {
    e?.preventDefault();
    const trimmed = newOptionInput.trim();
    if (trimmed) {
      setOptions([
        ...options.filter((o) => (typeof o === 'string' ? o.trim() : o.title.trim()) !== ''),
        { title: trimmed, pros: [], cons: [] }
      ]);
      setNewOptionInput('');
    }
  };

  const handleRemoveOption = (indexToRemove) => {
    setOptions(options.filter((_, idx) => idx !== indexToRemove));
  };

  // Handlers for Questions
  const handleAddQuestion = (e) => {
    e?.preventDefault();
    const trimmed = newQuestionInput.trim();
    if (trimmed) {
      setQuestions([
        ...questions,
        {
          id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          text: trimmed,
          answered: false
        }
      ]);
      setNewQuestionInput('');
    }
  };

  const handleRemoveQuestion = (idToRemove) => {
    setQuestions(questions.filter((q) => q.id !== idToRemove));
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Decision title is required.';
    }
    if (!reason.trim()) {
      newErrors.reason = 'Please explain why this decision matters to you.';
    }
    if (!reviewDate) {
      newErrors.reviewDate = 'Please select a date to revisit this decision.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Include any typed-in text from pending inputs if not yet added
    let finalOptions = options
      .map((o) => {
        if (typeof o === 'string') {
          const trimmed = o.trim();
          return trimmed ? { title: trimmed, pros: [], cons: [] } : null;
        }
        return o.title?.trim() ? o : null;
      })
      .filter(Boolean);

    if (newOptionInput.trim() && !finalOptions.some((o) => o.title.toLowerCase() === newOptionInput.trim().toLowerCase())) {
      finalOptions.push({
        title: newOptionInput.trim(),
        pros: [],
        cons: []
      });
    }

    let finalQuestions = [...questions];
    if (newQuestionInput.trim()) {
      finalQuestions.push({
        id: `q-${Date.now()}`,
        text: newQuestionInput.trim(),
        answered: false
      });
    }

    const decisionPayload = {
      ...(initialDecision || {}),
      title: title.trim(),
      category,
      reason: reason.trim(),
      options: finalOptions,
      questions: finalQuestions,
      reviewDate,
      currentThinking: currentThinking.trim()
    };

    onSave(decisionPayload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <h2 className="modal-title">
              {isEditMode ? 'Edit Parked Decision' : 'Park a New Decision'}
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          <div className="modal-body">
            {/* 1. What are you deciding? */}
            <div className="form-group">
              <label className="form-label" htmlFor="decision-title">
                <span>
                  What are you deciding? <span className="required-star">*</span>
                </span>
              </label>
              <input
                id="decision-title"
                type="text"
                className="form-input"
                placeholder="e.g., Should I buy a new laptop?"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: null });
                }}
                autoFocus
              />
              {errors.title && (
                <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.title}</span>
              )}
            </div>

            {/* 2. Category & 6. Review Date */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="decision-category">
                  Category
                </label>
                <select
                  id="decision-category"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="decision-review-date">
                  <span>
                    When should I revisit this? <span className="required-star">*</span>
                  </span>
                </label>
                <input
                  id="decision-review-date"
                  type="date"
                  className="form-input"
                  value={reviewDate}
                  onChange={(e) => {
                    setReviewDate(e.target.value);
                    if (errors.reviewDate) setErrors({ ...errors, reviewDate: null });
                  }}
                />
                {errors.reviewDate && (
                  <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>
                    {errors.reviewDate}
                  </span>
                )}
              </div>
            </div>

            {/* 3. Why does this decision matter? */}
            <div className="form-group">
              <label className="form-label" htmlFor="decision-reason">
                <span>
                  Why does this decision matter? <span className="required-star">*</span>
                </span>
                <span className="form-helper">Context to keep you grounded</span>
              </label>
              <textarea
                id="decision-reason"
                className="form-textarea"
                rows={3}
                placeholder="Explain the stakes, consequences, or constraints..."
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (errors.reason) setErrors({ ...errors, reason: null });
                }}
              />
              {errors.reason && (
                <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.reason}</span>
              )}
            </div>

            {/* 4. Possible options */}
            <div className="form-group">
              <label className="form-label">
                <span>Possible options</span>
                <span className="form-helper">Add distinct paths you could take</span>
              </label>

              <div className="dynamic-input-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Option A: Buy MacBook on student discount"
                  value={newOptionInput}
                  onChange={(e) => setNewOptionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleAddOption}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {options.filter((o) => (typeof o === 'string' ? o.trim() : o.title?.trim())).length > 0 && (
                <div className="dynamic-items-list">
                  {options
                    .filter((o) => (typeof o === 'string' ? o.trim() : o.title?.trim()))
                    .map((opt, idx) => {
                      const optTitle = typeof opt === 'string' ? opt : opt.title;
                      return (
                        <div key={idx} className="dynamic-item-pill">
                          <span className="dynamic-item-text">
                            <strong>Option {idx + 1}:</strong> {optTitle}
                          </span>
                          <button
                            type="button"
                            className="btn-remove-item"
                            onClick={() => handleRemoveOption(idx)}
                            title="Remove option"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* 5. Questions I need answered */}
            <div className="form-group">
              <label className="form-label">
                <span>Questions I need answered</span>
                <span className="form-helper">What must you research before choosing?</span>
              </label>

              <div className="dynamic-input-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Is the battery replaceable for under $100?"
                  value={newQuestionInput}
                  onChange={(e) => setNewQuestionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddQuestion();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleAddQuestion}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {questions.length > 0 && (
                <div className="dynamic-items-list">
                  {questions.map((q, idx) => (
                    <div key={q.id || idx} className="dynamic-item-pill">
                      <span className="dynamic-item-text">
                        ❓ {q.text}
                      </span>
                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => handleRemoveQuestion(q.id)}
                        title="Remove question"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 7. Current thinking */}
            <div className="form-group">
              <label className="form-label" htmlFor="decision-thinking">
                <span>Current thinking</span>
                <span className="form-helper">Optional gut check or initial inclination</span>
              </label>
              <textarea
                id="decision-thinking"
                className="form-textarea"
                rows={2}
                placeholder="Where does your gut lean today, and what would flip your view?"
                value={currentThinking}
                onChange={(e) => setCurrentThinking(e.target.value)}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn-primary" id="save-decision-btn">
              {isEditMode ? 'Save Changes' : 'Park Decision'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
