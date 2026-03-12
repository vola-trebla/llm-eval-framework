import { z } from 'zod';

export interface ModelConfig {
  provider: 'gemini' | 'anthropic';
  model: string;
  apiKey?: string;
}

export interface Assertion {
  type: 'contains' | 'notContains' | 'lengthInRange' | 'matchesSchema';
  value?: string | number[];
  schema?: z.ZodTypeAny;
}

export interface TestCase {
  id: string;
  prompt: string;
  assertions: Assertion[];
}

export interface TestSuite {
  name: string;
  models: ModelConfig[];
  cases: TestCase[];
}

export interface AssertionResult {
  type: string;
  passed: boolean;
  message: string;
}

export interface TestResult {
  caseId: string;
  model: string;
  output: string;
  passed: boolean;
  assertions: AssertionResult[];
  latencyMs: number;
}

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
