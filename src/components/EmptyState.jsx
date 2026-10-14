import React from 'react';
import { PlusCircle, Compass, History } from 'lucide-react';

export default function EmptyState({ type = 'active', onAction, actionLabel }) {
  if (type === 'history') {
    return (
      <div className="empty-state">
        <div className="empty-icon-box">
          <History size={28} />
        </div>
        <h3 className="empty-title">No completed decisions yet</h3>
        <p className="empty-desc">
          When you're ready to resolve a parked decision, click "Mark as Decided". Your final choice and reasoning will be safely recorded here.
        </p>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-icon-box">
        <Compass size={28} />
      </div>
      <h3 className="empty-title">Your parking lot is empty</h3>
      <p className="empty-desc">
        Have a tricky choice keeping you up? Park it here, list your options, questions to research, and set a date to revisit it.
      </p>
      {onAction && (
        <button type="button" className="btn-primary" onClick={onAction}>
          <PlusCircle size={16} />
          <span>{actionLabel || 'Park Your First Decision'}</span>
        </button>
      )}
    </div>
  );
}
