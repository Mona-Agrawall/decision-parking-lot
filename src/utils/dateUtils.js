/**
 * Date utility functions for Decision Parking Lot
 */

/**
 * Returns today's date as a YYYY-MM-DD string in local time.
 */
export function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns a YYYY-MM-DD date string with an offset in days from today.
 */
export function getRelativeDateString(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a YYYY-MM-DD date string into a friendly human-readable format.
 * e.g., "Oct 19, 2026"
 */
export function formatFriendlyDate(dateStr) {
  if (!dateStr) return 'No date set';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Computes status relative to today's date.
 * Returns { status: 'overdue' | 'today' | 'upcoming', label: string, diffDays: number, isAttention: boolean }
 */
export function getReviewStatus(dateStr) {
  if (!dateStr) {
    return { status: 'none', label: 'No review date', diffDays: 0, isAttention: false };
  }

  const todayStr = getTodayString();
  
  // Parse year, month, day to avoid timezone/daylight saving shifts
  const [tY, tM, tD] = todayStr.split('-').map(Number);
  const [rY, rM, rD] = dateStr.split('-').map(Number);

  const todayMidnight = new Date(tY, tM - 1, tD).getTime();
  const reviewMidnight = new Date(rY, rM - 1, rD).getTime();

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((reviewMidnight - todayMidnight) / msPerDay);

  if (diffDays < 0) {
    const daysAgo = Math.abs(diffDays);
    return {
      status: 'overdue',
      label: `Overdue by ${daysAgo} day${daysAgo === 1 ? '' : 's'}`,
      diffDays,
      isAttention: true
    };
  }

  if (diffDays === 0) {
    return {
      status: 'today',
      label: 'Due today',
      diffDays: 0,
      isAttention: true
    };
  }

  if (diffDays === 1) {
    return {
      status: 'upcoming',
      label: 'Due tomorrow',
      diffDays: 1,
      isAttention: false
    };
  }

  return {
    status: 'upcoming',
    label: `In ${diffDays} days`,
    diffDays,
    isAttention: false
  };
}
