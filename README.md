# llm-eval-framework

A framework for testing LLM output quality. Think pytest, but for prompts.

[![CI](https://github.com/vola-trebla/llm-eval-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/vola-trebla/llm-eval-framework/actions/workflows/ci.yml)

## What it does

1. Define test suites in JSON/YAML — prompt, expected Zod schema, assertions
2. Run them against one or multiple models
3. Collect metrics — schema compliance rate, latency p50/p95, token cost, hallucination hits
4. Get a comparison report:

```
┌────────────────┬──────────┬──────────┬────────────┐
│ Model          │ Pass %   │ Avg (ms) │ Cost/call  │
├────────────────┼──────────┼──────────┼────────────┤
│ Gemini Flash   │ 94%      │ 1200     │ $0.003     │
│ Claude Sonnet  │ 98%      │ 2100     │ $0.020     │
└────────────────┴──────────┴──────────┴────────────┘
```

## Core modules

- **Test Runner** — loads suites, runs cases against configured models
- **Assertions** — output contains/not contains, length in range, matches Zod schema, custom validators
- **Metrics** — schema pass rate, latency distribution, cost per call, hallucination detection (mentions of things absent from input)
- **Reporter** — CLI table + JSON export
- **Multi-model** — one suite, multiple models, side-by-side comparison

## Tech stack

TypeScript, Zod, Gemini API, Anthropic API

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
