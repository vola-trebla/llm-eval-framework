import type { z } from 'zod';

export interface ModelConfig {
  provider: 'gemini' | 'anthropic' | 'openai';
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
  tokensUsed: number;
}

export interface ProviderResponse {
  output: string;
  latencyMs: number;
  tokensUsed: number;
}

export interface LLMProvider {
  call(prompt: string): Promise<ProviderResponse>;
  modelName: string;
}

export interface MetricsSummary {
  model: string;
  total: number;
  passed: number;
  passRate: number;
  avgLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  totalTokens: number;
}
