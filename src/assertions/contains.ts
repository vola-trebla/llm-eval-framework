import type { AssertionResult } from '../types.js';

export function contains(output: string, value: string): AssertionResult {
  const passed = output.includes(value);
  return {
    type: 'contains',
    passed,
    message: `Output ${passed ? 'contains' : 'missing'}: "${value}"`,
  };
}

export function notContains(output: string, value: string): AssertionResult {
  const passed = !output.includes(value);
  return {
    type: 'notContains',
    passed,
    message: `Output ${passed ? 'does not contain' : 'unexpectedly contains'}: "${value}"`,
  };
}
