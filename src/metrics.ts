import type { TestResult, MetricsSummary } from './types.js';

export function collectMetrics(results: TestResult[]): MetricsSummary[] {
  const byModel = groupByModel(results);

  return Object.entries(byModel).map(([model, modelResults]) => {
    const passed = modelResults.filter(r => r.passed).length;
    const latencies = modelResults.map(r => r.latencyMs).sort((a, b) => a - b);
    const totalTokens = modelResults.reduce((sum, r) => sum + r.tokensUsed, 0);

    return {
      model,
      total: modelResults.length,
      passed,
      passRate: passed / modelResults.length,
      avgLatencyMs: Math.round(latencies.reduce((sum, l) => sum + l, 0) / latencies.length),
      p50LatencyMs: percentile(latencies, 50),
      p95LatencyMs: percentile(latencies, 95),
      totalTokens,
    };
  });
}

function groupByModel(results: TestResult[]): Record<string, TestResult[]> {
  return results.reduce((acc, result) => {
    acc[result.model] ??= [];
    acc[result.model]!.push(result);
    return acc;
  }, {} as Record<string, TestResult[]>);
}

function percentile(sorted: number[], p: number): number {
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[index] ?? 0;
}
