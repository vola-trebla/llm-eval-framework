import type { MetricsSummary } from '../types.js';

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
