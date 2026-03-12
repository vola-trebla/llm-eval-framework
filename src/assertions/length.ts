import type { AssertionResult } from '../types.js';

export function lengthInRange(output: string, range: number[]): AssertionResult {
  const min = range[0] ?? 0;
  const max = range[1] ?? Infinity;
  const len = output.length;
  const passed = len >= min && len <= max;
  return {
    type: 'lengthInRange',
    passed,
    message: `Output length ${len} ${passed ? 'is' : 'is not'} in range [${min}, ${max}]`,
  };
}
