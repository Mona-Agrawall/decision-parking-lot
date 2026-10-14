/**
 * Utilities for normalizing decisions, options, next steps, and reflections
 * to ensure 100% backward compatibility with legacy saved data.
 */

/**
 * Normalizes an option entry into { title, pros, cons }.
 * Handles legacy string options ('Option A') as well as object options.
 */
export function normalizeOption(opt) {
  if (!opt) {
    return { title: '', pros: [], cons: [] };
  }
  if (typeof opt === 'string') {
    return { title: opt, pros: [], cons: [] };
  }
  return {
    title: opt.title || '',
    pros: Array.isArray(opt.pros) ? opt.pros : [],
    cons: Array.isArray(opt.cons) ? opt.cons : []
  };
}

/**
 * Returns safe array of normalized options for a decision.
 */
export function getNormalizedOptions(decision) {
  if (!decision || !Array.isArray(decision.options)) {
    return [];
  }
  return decision.options.map(normalizeOption);
}

/**
 * Returns safe array of nextSteps for a decision.
 */
export function getSafeNextSteps(decision) {
  if (!decision || !Array.isArray(decision.nextSteps)) {
    return [];
  }
  return decision.nextSteps;
}

/**
 * Finds the currently active (uncompleted) step for a decision.
 */
export function getActiveStep(decision) {
  const steps = getSafeNextSteps(decision);
  return steps.find((s) => !s.completed) || null;
}

/**
 * Finds the most recently completed step for a decision.
 */
export function getLastCompletedStep(decision) {
  const steps = getSafeNextSteps(decision);
  const completed = steps.filter((s) => s.completed);
  return completed.length > 0 ? completed[completed.length - 1] : null;
}
