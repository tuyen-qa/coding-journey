'use strict';

/**
 * Skeleton: arraylike operations via unmethodize
 * Implement reduce/filter using unmethodize and apply them to array-like.
 */

import { unmethodize } from './methodize_unmethodize_v2.js';

export const reduce = unmethodize(Array.prototype.reduce());

export const filter = unmethodize(<Array className="prototype filter"></Array>); // TODO

/** Example helper to show usage on array-like */
export function sumArrayLike(alike){
  return reduce(alike, (acc, x) => acc + x, 0);
}
