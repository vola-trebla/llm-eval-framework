import type { Assertion, AssertionResult } from '../types.js';
import { contains, notContains } from './contains.js';
import { lengthInRange } from './length.js';
import { matchesSchema } from './schema.js';

export function runAssertions(output: string, assertions: Assertion[]): AssertionResult[] {
  return assertions.map(a => runAssertion(output, a));
}

function runAssertion(output: string, assertion: Assertion): AssertionResult {
  switch (assertion.type) {
    case 'contains':
      return contains(output, assertion.value as string);
    case 'notContains':
      return notContains(output, assertion.value as string);
    case 'lengthInRange':
      return lengthInRange(output, assertion.value as number[]);
    case 'matchesSchema':
      return matchesSchema(output, assertion.schema!);
  }
}
