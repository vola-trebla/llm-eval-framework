import type { z } from 'zod';
import type { AssertionResult } from '../types.js';

export function matchesSchema(output: string, schema: z.ZodTypeAny): AssertionResult {
  try {
    schema.parse(JSON.parse(output));
    return { type: 'matchesSchema', passed: true, message: 'Schema validation passed' };
  } catch (err) {
    return { type: 'matchesSchema', passed: false, message: `Schema validation failed: ${err}` };
  }
}
