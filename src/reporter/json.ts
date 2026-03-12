import type { MetricsSummary } from '../types.js';
import type { TestResult } from '../types.js';
import { writeFileSync } from 'fs';

export function exportJson(results: TestResult[], summaries: MetricsSummary[], path: string): void {
  const report = {
    generatedAt: new Date().toISOString(),
    summaries,
    results,
  };

  writeFileSync(path, JSON.stringify(report, null, 2));
  console.log(`\n✅ Report saved to ${path}`);
}
