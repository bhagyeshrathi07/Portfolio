# Bhagyesh Rathi — RAG-Powered Portfolio

An AI-powered portfolio chatbot that answers questions about my professional background using **Retrieval-Augmented Generation (RAG)**. Built with Next.js, Pinecone, and Google Vertex AI.

## How It Works

```
User Question → Embed Query (text-embedding-005) → Vector Search (Pinecone)
→ Retrieve Top-K Chunks → Build Prompt with Context → LLM (Gemini 2.5 Flash)
→ Streamed Response → User
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Embeddings** | Google `text-embedding-005` via `@google/genai` |
| **Vector DB** | Pinecone (cosine metric, 768 dims) |
| **LLM** | Gemini 2.5 Flash via Vertex AI |
| **Streaming** | Vercel AI SDK (`streamText` + `toTextStreamResponse`) |
| **Ingestion** | LangChain text splitter + pdf-parse |

## Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── page.tsx                  # Landing page (chat UI placeholder)
│   └── api/
│       └── chat/
│           └── route.ts          # RAG API endpoint (orchestrator)
├── lib/
│   ├── pinecone.ts               # Pinecone client singleton
│   └── rag/
│       ├── embeddings.ts         # Query embedding generation
│       ├── retriever.ts          # Pinecone vector search + filtering
│       └── prompt-builder.ts     # System prompt with guardrails
├── scripts/
│   └── ingest.ts                 # PDF → chunks → embeddings → Pinecone
├── data/
│   └── Bhagyesh_Resume.pdf       # Source document
├── tests/
│   ├── 1-embedding.test.ts       # Embedding model connectivity & quality
│   ├── 2-retrieval.test.ts       # Pinecone vector search validation
│   ├── 3-pipeline.test.ts        # End-to-end RAG API tests
│   ├── 4-security.test.ts        # Prompt injection & input validation
│   ├── utils.ts                  # Shared test runner & assertions
│   └── run-all.ts                # Sequential test runner
├── .env.local                    # API keys (not committed)
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- Google Cloud project with Vertex AI enabled
- Pinecone account with an index (768 dims, cosine metric)
- Google AI API key

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env.local` with:
```env
GOOGLE_AI_KEY=your-google-ai-api-key
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
GOOGLE_CLOUD_LOCATION=us-central1
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX_NAME=your-index-name
```

### 3. Ingest resume data
```bash
npx tsx scripts/ingest.ts
```

### 4. Run the dev server
```bash
npm run dev
```

### 5. Run tests
```bash
# Individual test suites
npx tsx tests/1-embedding.test.ts
npx tsx tests/2-retrieval.test.ts
npx tsx tests/3-pipeline.test.ts    # requires dev server running
npx tsx tests/4-security.test.ts    # requires dev server running

# All tests
npx tsx tests/run-all.ts
```

> **Note:** Tests hit real APIs and cost real API calls. Run intentionally, not in CI loops.

## Security

- System prompt injection defense (ignores override attempts)
- Input validation (message format, 500 char limit)
- Score-based retrieval filtering (0.5 threshold) to reduce hallucination
- Topic guardrails (deflects salary, inappropriate questions)