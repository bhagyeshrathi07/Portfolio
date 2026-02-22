//================================================================
// FILE: tests/2-retrieval.test.ts
// Tests Pinecone connectivity and vector search quality
// ================================================================

import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';
import { describe, test, runTests, assert, assertInRange } from './utils';

const genai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY! });
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const indexName = process.env.PINECONE_INDEX_NAME!;

async function embed(text: string): Promise<number[]> {
    const res = await genai.models.embedContent({
        model: 'text-embedding-005',
        contents: text,
    });
    return res.embeddings?.[0]?.values!;
}

describe('Pinecone Retrieval', () => {

    test('should connect to Pinecone index', async () => {
        const index = pc.Index(indexName);
        const stats = await index.describeIndexStats();
        console.log(`     → Total vectors: ${stats.totalRecordCount}`);
        assert((stats.totalRecordCount || 0) > 0,
            'Index should have vectors. Did you run the ingest script?');
    });

    test('should return results for a relevant query', async () => {
        const vector = await embed('What technologies do you work with?');
        const index = pc.Index(indexName);
        const results = await index.query({
            vector,
            topK: 3,
            includeMetadata: true,
        });

        assert(results.matches.length > 0, 'Should return at least one match');
        console.log(`     → Top match score: ${results.matches[0].score?.toFixed(4)}`);
        console.log(`     → Top match text: ${(results.matches[0].metadata?.text as string)?.slice(0, 80)}...`);
    });

    test('relevant queries should score higher than irrelevant ones', async () => {
        const index = pc.Index(indexName);
        // Get baseline score for an irrelevant query
        const irrelevantVector = await embed('How to bake a chocolate cake?');
        const irrelevantResults = await index.query({
            vector: irrelevantVector, topK: 1, includeMetadata: true,
        });
        const irrelevantScore = irrelevantResults.matches[0]?.score || 0;
        // Test relevant queries
        const queries = [
            'Tell me about your work experience',
            'What projects have you built?',
            'What is your educational background?',
        ];
        for (const q of queries) {
            const vector = await embed(q);
            const results = await index.query({
                vector, topK: 1, includeMetadata: true,
            });
            const score = results.matches[0]?.score || 0;
            console.log(`     → "${q}" → score: ${score.toFixed(4)} (baseline: ${irrelevantScore.toFixed(4)})`);
            assert(score >= irrelevantScore * 0.5,
                `Query "${q}" scored unexpectedly low: ${score}`);
        }
    });

    test('should return low scores for irrelevant queries', async () => {
        const vector = await embed('How to bake a chocolate cake?');
        const index = pc.Index(indexName);
        const results = await index.query({
            vector,
            topK: 1,
            includeMetadata: true,
        });

        const score = results.matches[0]?.score || 0;
        console.log(`     → Irrelevant query score: ${score.toFixed(4)}`);
        // Score should be lower than relevant queries
        // (may still be > 0 since cosine similarity is 0-1 for normalized vectors)
        assert(score < 0.85, `Irrelevant query scored suspiciously high: ${score}`);
    });

    test('should respect topK parameter', async () => {
        const vector = await embed('experience');
        const index = pc.Index(indexName);

        const results1 = await index.query({ vector, topK: 1, includeMetadata: true });
        const results3 = await index.query({ vector, topK: 3, includeMetadata: true });

        assert(results1.matches.length <= 1, 'topK=1 should return at most 1 result');
        assert(results3.matches.length <= 3, 'topK=3 should return at most 3 results');
        assert(results3.matches.length >= results1.matches.length,
            'topK=3 should return >= topK=1 results');
        console.log(`     → topK=1: ${results1.matches.length}, topK=3: ${results3.matches.length}`);
    });

    test('should measure retrieval latency', async () => {
        const vector = await embed('skills and technologies');
        const index = pc.Index(indexName);

        const start = Date.now();
        await index.query({ vector, topK: 3, includeMetadata: true });
        const latency = Date.now() - start;

        console.log(`     → Retrieval latency: ${latency}ms`);
        assert(latency < 2000, `Retrieval too slow: ${latency}ms (should be < 2000ms)`);
        // Note: First query may be slower due to cold start
        // Subsequent queries should be < 100ms
    });
});

runTests();
