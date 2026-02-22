// ================================================================
// FILE: tests/1-embedding.test.ts
// Tests that the embedding model is reachable and returns valid vectors
// ================================================================

import { GoogleGenAI } from '@google/genai';
import { describe, test, runTests, assert, assertInRange } from './utils';

const genai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY! });
const MODEL = 'text-embedding-005';

describe('Embedding Generation', () => {

    test('should generate an embedding for a simple query', async () => {
        const res = await genai.models.embedContent({
            model: MODEL,
            contents: 'What is your work experience?',
        });

        const values = res.embeddings?.[0]?.values;
        assert(!!values, 'Embedding values should exist');
        assert(values!.length > 0, 'Embedding should not be empty');
        console.log(`     → Dimension: ${values!.length}`);
    });

    test('should return correct embedding dimension (768 for text-embedding-004)', async () => {
        const res = await genai.models.embedContent({
            model: MODEL,
            contents: 'test',
        });

        // text-embedding-004 = 768 dims, text-embedding-005 = 768 dims
        assertInRange(res.embeddings?.[0]?.values?.length || 0, 768, 768,
            'Embedding dimension mismatch');
    });

    test('should produce different embeddings for different inputs', async () => {
        const res1 = await genai.models.embedContent({
            model: MODEL,
            contents: 'machine learning engineer',
        });
        const res2 = await genai.models.embedContent({
            model: MODEL,
            contents: 'chocolate cake recipe',
        });

        const v1 = res1.embeddings?.[0]?.values!;
        const v2 = res2.embeddings?.[0]?.values!;

        // Compute cosine similarity — should be low for unrelated inputs
        const dot = v1.reduce((sum, a, i) => sum + a * v2[i], 0);
        const mag1 = Math.sqrt(v1.reduce((sum, a) => sum + a * a, 0));
        const mag2 = Math.sqrt(v2.reduce((sum, a) => sum + a * a, 0));
        const similarity = dot / (mag1 * mag2);

        console.log(`     → Cosine similarity: ${similarity.toFixed(4)}`);
        assert(similarity < 0.9, `Unrelated texts should have low similarity, got ${similarity}`);
    });

    test('should produce similar embeddings for related inputs', async () => {
        const res1 = await genai.models.embedContent({
            model: MODEL,
            contents: 'software engineer with React experience',
        });
        const res2 = await genai.models.embedContent({
            model: MODEL,
            contents: 'frontend developer skilled in React.js',
        });

        const v1 = res1.embeddings?.[0]?.values!;
        const v2 = res2.embeddings?.[0]?.values!;

        const dot = v1.reduce((sum, a, i) => sum + a * v2[i], 0);
        const mag1 = Math.sqrt(v1.reduce((sum, a) => sum + a * a, 0));
        const mag2 = Math.sqrt(v2.reduce((sum, a) => sum + a * a, 0));
        const similarity = dot / (mag1 * mag2);

        console.log(`     → Cosine similarity: ${similarity.toFixed(4)}`);
        assert(similarity > 0.7, `Related texts should have high similarity, got ${similarity}`);
    });

    test('should handle empty string gracefully', async () => {
        try {
            await genai.models.embedContent({
                model: MODEL,
                contents: '',
            });
            // If it succeeds, that's fine — some models allow empty strings
        } catch (err: any) {
            // Expected to fail — just ensure it throws, doesn't hang
            assert(err.message.length > 0, 'Should throw a meaningful error');
            console.log(`     → Correctly rejected empty input: ${err.message.slice(0, 60)}`);
        }
    });
});

runTests();