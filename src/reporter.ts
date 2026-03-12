import type { MetricsSummary } from './metrics.js';
import type { TestResult } from './types.js';
import { writeFileSync } from 'fs';

export function printTable(summaries: MetricsSummary[]): void {
  console.log('\n📊 LLM Eval Results\n');
  console.log('─'.repeat(70));
  console.log(
    'Model'.padEnd(25),
    'Pass %'.padEnd(10),
    'Avg ms'.padEnd(10),
    'p50'.padEnd(10),
    'p95'.padEnd(10),
    'Tokens'
  );
  console.log('─'.repeat(70));

  for (const s of summaries) {
    console.log(
      s.model.padEnd(25),
      `${(s.passRate * 100).toFixed(0)}%`.padEnd(10),
      String(s.avgLatencyMs).padEnd(10),
      String(s.p50LatencyMs).padEnd(10),
      String(s.p95LatencyMs).padEnd(10),
      String(s.totalTokens)
    );
  }

  console.log('─'.repeat(70));
}

export function exportJson(results: TestResult[], summaries: MetricsSummary[], path: string): void {
  const report = {
    generatedAt: new Date().toISOString(),
    summaries,
    results,
  };

  writeFileSync(path, JSON.stringify(report, null, 2));
  console.log(`\n✅ Report saved to ${path}`);
}
