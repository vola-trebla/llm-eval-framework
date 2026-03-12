# llm-eval-framework

A framework for testing LLM output quality. Think pytest, but for prompts.

[![CI](https://github.com/vola-trebla/llm-eval-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/vola-trebla/llm-eval-framework/actions/workflows/ci.yml)

## What it does

1. Define test suites in JSON/YAML — prompt, expected Zod schema, assertions
2. Run them against one or multiple models
3. Collect metrics — schema compliance rate, latency p50/p95, token cost, hallucination hits
4. Get a comparison report:

```
📊 LLM Eval Results

──────────────────────────────────────────────────────────────────────
Model                     Pass %     Avg ms     p50        p95        Tokens
──────────────────────────────────────────────────────────────────────
gemini-2.5-flash          50%        5767       2541       8992       1950
claude-sonnet-4-20250514  100%       1870       1640       2310       486
gpt-4o                    100%       2130       1980       2450       512
──────────────────────────────────────────────────────────────────────
```

## Example output

### JSON report (multi-model comparison)

```json
{
  "summaries": [
    { "model": "gemini-2.5-flash",          "total": 2, "passed": 1, "passRate": 0.5,  "avgLatencyMs": 5767, "p50LatencyMs": 2541, "p95LatencyMs": 8992, "totalTokens": 1950 },
    { "model": "claude-sonnet-4-20250514",   "total": 2, "passed": 2, "passRate": 1.0,  "avgLatencyMs": 1870, "p50LatencyMs": 1640, "p95LatencyMs": 2310, "totalTokens": 486  },
    { "model": "gpt-4o",                     "total": 2, "passed": 2, "passRate": 1.0,  "avgLatencyMs": 2130, "p50LatencyMs": 1980, "p95LatencyMs": 2450, "totalTokens": 512  }
  ]
}
```

## Core modules

- **Test Runner** — loads suites, runs cases against configured models
- **Assertions** — output contains/not contains, length in range, matches Zod schema, custom validators
- **Metrics** — schema pass rate, latency distribution, cost per call, hallucination detection (mentions of things absent from input)
- **Reporter** — CLI table + JSON export
- **Multi-model** — one suite, multiple models, side-by-side comparison

## Tech stack

TypeScript, Zod, Gemini API, Anthropic API, OpenAI API

## Getting started

```bash
npm install
cp .env.example .env  # add your API keys
npm run dev
```

## Scripts

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `npm run dev`      | Run with watch mode          |
| `npm start`        | Run once                     |
| `npm run build`    | Compile TypeScript           |
| `npm run typecheck`| Type-check without emitting  |
| `npm test`         | Run tests                    |

## License

ISC
