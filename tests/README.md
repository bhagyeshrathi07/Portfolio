# RAG Portfolio — Test Suite

## Folder Structure

```
tests/
├── 1-embedding.test.ts      ← Test embedding generation
├── 2-retrieval.test.ts      ← Test Pinecone vector search
├── 3-pipeline.test.ts       ← Test full RAG pipeline (end-to-end)
├── 4-security.test.ts       ← Test prompt injection & edge cases
├── utils.ts                 ← Shared test runner & assertions
└── run-all.ts               ← Run all tests in sequence
```

## How to Run

```bash
# Single test suite
npx tsx tests/1-embedding.test.ts

# All tests
npx tsx tests/run-all.ts
```

## Prerequisites

- `.env.local` with `GOOGLE_AI_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`
- Pinecone index populated (run `npx tsx scripts/ingest.ts` first)
- Dev server running on `localhost:3000` (for pipeline + security tests)

> **Note:** These are integration tests that hit real APIs. They cost real API calls. Run them intentionally, not in CI loops.