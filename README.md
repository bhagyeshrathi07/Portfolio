# Bhagyesh Rathi — Portfolio

A dark-themed, editorial-style portfolio website with an integrated **RAG-powered AI chatbot** that answers questions about my professional background. Built with Next.js 16, React 19, Pinecone, and Google Vertex AI.

## Live Sections

- **Hero** — Bold typographic headline with an interactive dropdown menu for dual CTAs
- **About** — Multi-paragraph bio
- **Experience** — Timeline of professional roles at Rakuten
- **Research Interests** — Active research papers and projects
- **Projects** — Project cards with GitHub/live links and tech tags
- **Skills** — Animated conveyor belt with dynamically rendered `react-icons`
- **Education** — Academic background and certifications
- **Contact** — Email, phone, GitHub, LinkedIn links
- **Ask AI** — Floating chatbot button → `/chat` route with a RAG pipeline and fully formatted **Markdown** responses
- **Favicon** — Custom SVG icon matching the hero typography with 3D overlapping concrete shadows

## RAG Pipeline

```
User Question → Embed (text-embedding-005) → Vector Search (Pinecone)
→ Retrieve Top-K Chunks → Build Prompt with Context → LLM (Gemini 2.5 Flash)
→ Streamed Response (SSE) → Chat UI
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Frontend** | React 19 + `@ai-sdk/react` + `react-markdown` (`remark-gfm`) |
| **Styling** | Vanilla CSS — editorial dark theme with `Bebas Neue` typography |
| **Embeddings** | Google `text-embedding-005` via `@ai-sdk/google-vertex` |
| **Vector DB** | Pinecone (cosine metric, 768 dimensions) |
| **LLM** | Gemini 2.5 Flash via `@ai-sdk/google-vertex` |
| **Streaming** | Vercel AI SDK (`streamText` + `toUIMessageStreamResponse`) |
| **Ingestion** | LangChain `RecursiveCharacterTextSplitter` + `pdf-parse` |
| **Icons** | `react-icons` (dynamically mapped via `SKILL_ICONS` registry) |
| **Deployment** | Vercel |

## Project Structure

```
Portfolio/
├── app/
│   ├── globals.css                # Dark editorial design system
│   ├── layout.tsx                 # Root layout with SEO + fonts
│   ├── page.tsx                   # Main portfolio page (all sections)
│   ├── chat/
│   │   └── page.tsx               # Standalone AI chatbot page
│   └── api/
│       └── chat/
│           └── route.ts           # RAG API endpoint (orchestrator)
├── components/
│   ├── Navbar.tsx                 # Sticky nav with smooth scroll
│   ├── Hero.tsx                   # Typographic hero with overlapping text
│   ├── About.tsx                  # Multi-paragraph bio
│   ├── Experience.tsx             # Work experience timeline
│   ├── Research.tsx               # Research interests grid
│   ├── Projects.tsx               # Project cards with highlights
│   ├── Skills.tsx                 # Animated conveyor belt with icons
│   ├── Education.tsx              # Academic background
│   ├── Contact.tsx                # Contact links + footer
│   ├── ChatButton.tsx             # Floating "Ask AI" button
│   └── ChatFrontend.tsx           # Chat UI (useChat, streaming)
├── data/
│   └── profile.ts                 # All portfolio content + skill icon registry
├── lib/
│   ├── pinecone.ts                # Pinecone client singleton
│   └── rag/
│       ├── embeddings.ts          # Query embedding (Vertex AI)
│       ├── retriever.ts           # Pinecone vector search + filtering
│       └── prompt-builder.ts      # System prompt with guardrails
├── scripts/
│   └── ingest.ts                  # PDF → chunks → embeddings → Pinecone
├── public/
│   └── Bhagyesh_Resume.pdf        # Source document for RAG
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
- GCP service account key (JSON)
- Pinecone account with an index (768 dims, cosine metric)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env.local`:
```env
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX_NAME=resume-index

GOOGLE_CLOUD_PROJECT=your-gcp-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
GOOGLE_GENAI_USE_VERTEXAI=true
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
npm test                                # All 4 test suites (27 tests)
npx tsx tests/1-embedding.test.ts       # Embedding only
npx tsx tests/3-pipeline.test.ts        # Requires dev server running
```

> **Note:** Tests hit real APIs and cost real API calls. Run intentionally, not in CI loops.

## Deploying to Vercel

Since Vercel cannot read local JSON key files, the app supports direct credential injection via environment variables:

| Variable | Value |
|----------|-------|
| `PINECONE_API_KEY` | Your Pinecone API key |
| `PINECONE_INDEX_NAME` | `resume-index` |
| `GOOGLE_CLOUD_PROJECT` | Your GCP project ID |
| `GOOGLE_CLOUD_LOCATION` | `us-central1` |
| `GOOGLE_GENAI_USE_VERTEXAI` | `true` |
| `GOOGLE_CLIENT_EMAIL` | `client_email` from your service account JSON |
| `GOOGLE_PRIVATE_KEY` | `private_key` from your service account JSON |

The app automatically detects whether `GOOGLE_CLIENT_EMAIL` / `GOOGLE_PRIVATE_KEY` are set and uses them for auth. Otherwise, it falls back to local `GOOGLE_APPLICATION_CREDENTIALS`.

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
| `npm test` | Run all 4 integration test suites |

## Customization

All portfolio content lives in `data/profile.ts`. To update skills, experience, projects, or research interests, edit that single file. To add a new skill icon, import it from `react-icons` and add it to the `SKILL_ICONS` map in the same file.