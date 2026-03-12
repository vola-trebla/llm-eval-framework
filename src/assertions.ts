import type { Assertion, AssertionResult } from './types.js';

export function runAssertions(output: string, assertions: Assertion[]): AssertionResult[] {
  return assertions.map(assertion => runAssertion(output, assertion));
}

function runAssertion(output: string, assertion: Assertion): AssertionResult {
  switch (assertion.type) {
    case 'contains':
      return {
        type: assertion.type,
        passed: output.includes(assertion.value as string),
        message: `Output ${output.includes(assertion.value as string) ? 'contains' : 'missing'}: "${assertion.value}"`,
      };

    case 'notContains':
      return {
        type: assertion.type,
        passed: !output.includes(assertion.value as string),
        message: `Output ${!output.includes(assertion.value as string) ? 'does not contain' : 'unexpectedly contains'}: "${assertion.value}"`,
      };

    case 'lengthInRange': {
      const range = assertion.value as number[];
      const min = range[0] ?? 0;
      const max = range[1] ?? Infinity;
      const len = output.length;
      const passed = len >= min && len <= max;
      return {
        type: assertion.type,
        passed,
        message: `Output length ${len} ${passed ? 'is' : 'is not'} in range [${min}, ${max}]`,
      };
    }

    case 'matchesSchema': {
      try {
        assertion.schema?.parse(JSON.parse(output));
        return { type: assertion.type, passed: true, message: 'Schema validation passed' };
      } catch (err) {
        return { type: assertion.type, passed: false, message: `Schema validation failed: ${err}` };
      }
    }
  }
}
