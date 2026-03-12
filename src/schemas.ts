import { z } from 'zod';

export const AssertionSchema = z.object({
  type: z.enum(['contains', 'notContains', 'lengthInRange', 'matchesSchema']),
  value: z.union([z.string(), z.array(z.number())]).optional(),
});

export const TestCaseSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  assertions: z.array(AssertionSchema),
});

export const TestSuiteSchema = z.object({
  name: z.string(),
  models: z.array(z.object({
    provider: z.enum(['gemini', 'anthropic']),
    model: z.string(),
    apiKey: z.string().optional(),
  })),
  cases: z.array(TestCaseSchema),
});
