
// ================================================================
// RAG Portfolio — Test Suite
// ================================================================
//
// Folder structure:
//   tests/
//   ├── 1-embedding.test.ts      ← Test embedding generation
//   ├── 2-retrieval.test.ts      ← Test Pinecone vector search
//   ├── 3-pipeline.test.ts       ← Test full RAG pipeline (end-to-end)
//   ├── 4-security.test.ts       ← Test prompt injection & edge cases
//   └── run-all.ts               ← Run all tests in sequence
//
// How to run:
//   Single test:  npx tsx tests/1-embedding.test.ts
//   All tests:    npx tsx tests/run-all.ts
//
// Prerequisites:
//   - .env.local must have GOOGLE_AI_KEY, PINECONE_API_KEY, PINECONE_INDEX_NAME
//   - Pinecone index must be populated (run your ingest script first)
//   - Dev server running on localhost:3000 (for pipeline + security tests)
//
// NOTE: These are integration tests that hit real APIs.
// They cost real API calls. Run them intentionally, not in CI loops.
// ================================================================