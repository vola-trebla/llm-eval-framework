import 'dotenv/config';
import { createProvider } from './providers/index.js';
import { runSuite } from './runner.js';
import { collectMetrics } from './metrics.js';
import { printTable, exportJson } from './reporter/index.js';
import type { TestSuite } from './types.js';

const suite: TestSuite = {
  name: 'AI Test Suite',
  models: [
    { provider: 'gemini', model: 'gemini-2.5-flash' },
    { provider: 'anthropic', model: 'claude-sonnet-4-20250514' },
    { provider: 'openai', model: 'gpt-4o' },
  ],
  cases: [
    {
      id: 'test-01',
      prompt: 'What is an AI agent? Reply in one sentence.',
      assertions: [
        { type: 'contains', value: 'agent' },
        { type: 'notContains', value: 'I cannot' },
        { type: 'lengthInRange', value: [20, 300] },
      ],
    },
    {
      id: 'test-02',
      prompt: 'Name 3 real-world use cases for AI agents.',
      assertions: [
        { type: 'contains', value: 'AI' },
        { type: 'notContains', value: 'I cannot' },
        { type: 'lengthInRange', value: [50, 1000] },
      ],
    },
  ],
};

const providers = suite.models.map(m => createProvider(m));

const results = await runSuite(suite, providers);
const summaries = collectMetrics(results);

printTable(summaries);
exportJson(results, summaries, './report.json');
