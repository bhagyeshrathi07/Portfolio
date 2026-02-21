# Bhagyesh Rathi - Portfolio

# RAG-Powered Interactive Resume
# ================================================================
# 1. PROJECT STRUCTURE
# ================================================================

# my-rag-portfolio/
# ├── src/
# │   ├── app/
# │   │   ├── page.tsx                  # Landing page with chat UI
# │   │   ├── layout.tsx                # Root layout
# │   │   └── api/
# │   │       └── chat/
# │   │           └── route.ts          # Main RAG endpoint (Edge Runtime)
# │   ├── lib/
# │   │   ├── rag/
# │   │   │   ├── embeddings.ts         # Embedding generation
# │   │   │   ├── retriever.ts          # Pinecone vector search
# │   │   │   ├── prompt-builder.ts     # Context assembly + prompt template
# │   │   │   └── llm.ts               # LLM provider (swappable)
# │   │   ├── security/
# │   │   │   ├── rate-limiter.ts       # Token bucket rate limiting
# │   │   │   ├── input-sanitizer.ts    # Prompt injection defense
# │   │   │   └── output-guard.ts       # PII/hallucination filtering
# │   │   └── pinecone.ts              # Pinecone client singleton
# │   ├── data/
# │   │   └── resume-chunks.json        # Pre-processed resume data
# │   └── scripts/
# │       └── ingest.ts                 # One-time: embed + upsert to Pinecone
# ├── .env.local                        # Secrets (NEVER commit)
# ├── next.config.js
# ├── package.json
# └── tsconfig.json

# Pipeline flow:
``` User Question → Embed Query → Vector Search (Pinecone) → Retrieve Top-K Chunks → Build Prompt with Context → LLM (Vertex AI) → Streamed Response → User```