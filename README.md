# Bhagyesh Rathi — RAG-Powered Portfolio

An AI-powered portfolio chatbot that answers questions about my professional background using **Retrieval-Augmented Generation (RAG)**. Built with Next.js, Pinecone, and Google Vertex AI.

## How It Works

```
User Question → Embed Query (text-embedding-005) → Vector Search (Pinecone)
→ Retrieve Top-K Chunks → Build Prompt with Context → LLM (Gemini 2.5 Flash)
→ Streamed Response (SSE) → Chat UI
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 19 + `@ai-sdk/react` (`useChat` hook) |
| **Embeddings** | Google `text-embedding-005` via `@google/genai` |
| **Vector DB** | Pinecone (cosine metric, 768 dimensions) |
| **LLM** | Gemini 2.5 Flash via `@ai-sdk/google-vertex` |
| **Streaming** | Vercel AI SDK (`streamText` + `toUIMessageStreamResponse`) |
| **Ingestion** | LangChain `RecursiveCharacterTextSplitter` + `pdf-parse` |

## Project Structure

```
Portfolio/
├── app/
│   ├── globals.css                # Dark theme design system
│   ├── layout.tsx                 # Root layout with SEO metadata
│   ├── page.tsx                   # Renders chat interface
│   └── api/
│       └── chat/
│           └── route.ts           # RAG API endpoint (orchestrator)
├── components/
│   └── ChatFrontend.tsx           # Chat UI (useChat, streaming, suggestions)
├── lib/
│   ├── pinecone.ts                # Pinecone client singleton
│   └── rag/
│       ├── embeddings.ts          # Query embedding generation
│       ├── retriever.ts           # Pinecone vector search + filtering
│       └── prompt-builder.ts      # System prompt with guardrails
├── scripts/
│   └── ingest.ts                  # PDF → chunks → embeddings → Pinecone
├── data/
│   └── Bhagyesh_Resume.pdf        # Source document
├── tests/
│   ├── 1-embedding.test.ts        # Embedding model connectivity & quality
│   ├── 2-retrieval.test.ts        # Pinecone vector search validation
│   ├── 3-pipeline.test.ts         # End-to-end RAG API tests
│   ├── 4-security.test.ts         # Prompt injection & input validation
│   ├── utils.ts                   # Shared test runner & assertions
│   └── run-all.ts                 # Sequential test runner
├── .env.local                     # API keys (not committed)
├── package.json
└── tsconfig.json
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (ChatFrontend.tsx)                             │
│  useChat() ──► sends UIMessages via SSE transport       │
└──────────────────────┬──────────────────────────────────┘
                       │ POST /api/chat
┌──────────────────────▼──────────────────────────────────┐
│  API Route (route.ts)                                   │
│  1. Validate input (format, length)                     │
│  2. Extract text from UIMessage parts                   │
│  3. embedQuery() ──► text-embedding-005 (768d)          │
│  4. retrieveContext() ──► Pinecone top-3, score > 0.5   │
│  5. buildSystemPrompt() ──► context + guardrails        │
│  6. streamText() ──► Gemini 2.5 Flash                   │
│  7. toUIMessageStreamResponse() ──► SSE back to client  │
└─────────────────────────────────────────────────────────┘
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
npm run ingest
```

### 4. Run the dev server
```bash
npm run dev
```

### 5. Run tests
```bash
npm test                                # All tests
npx tsx tests/1-embedding.test.ts       # Embedding only
npx tsx tests/3-pipeline.test.ts        # Requires dev server running
```

> **Note:** Tests hit real APIs and cost real API calls. Run intentionally, not in CI loops.

## Security

- System prompt injection defense (ignores override attempts)
- Input validation (message format, 500 char limit)
- Score-based retrieval filtering (0.5 threshold) to reduce hallucination
- Topic guardrails (deflects salary, inappropriate questions)
- `force-dynamic` export prevents Next.js from caching API responses

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run ingest` | Ingest resume PDF into Pinecone |
| `npm test` | Run all integration tests |