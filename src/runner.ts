import type { TestSuite, TestResult, LLMProvider } from './types.js';
import { runAssertions } from './assertions/index.js';

export async function runSuite(
  suite: TestSuite,
  providers: LLMProvider[]
): Promise<TestResult[]> {
  const results: TestResult[] = [];

  for (const provider of providers) {
    for (const testCase of suite.cases) {
      const response = await provider.call(testCase.prompt);
      const assertions = runAssertions(response.output, testCase.assertions);

      results.push({
        caseId: testCase.id,
        model: provider.modelName,
        output: response.output,
        passed: assertions.every(a => a.passed),
        assertions,
        latencyMs: response.latencyMs,
        tokensUsed: response.tokensUsed,
      });
    }
  }

  return results;
}
