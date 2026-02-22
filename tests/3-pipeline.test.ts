/// ================================================================
// FILE: tests/3-pipeline.test.ts
// Tests the full RAG API route end-to-end
// Requires: dev server running on localhost:3000
// ================================================================

import { describe, test, runTests, assert } from './utils';

const API_URL = 'http://localhost:3000/api/chat';

async function chatRequest(messages: { role: string; content: string }[]): Promise<Response> {
    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
    });
}

async function readStream(res: Response): Promise<string> {
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let text = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
    }
    return text;
}

describe('Full RAG Pipeline (API Route)', () => {

    test('should return 200 for a valid question', async () => {
        const res = await chatRequest([
            { role: 'user', content: 'What is your work experience?' }
        ]);
        assert(res.ok, `Expected 200, got ${res.status}`);

        const text = await readStream(res);
        assert(text.length > 20, `Response too short: "${text.slice(0, 50)}"`);
        console.log(`     → Response preview: "${text.slice(0, 100)}..."`);
    });

    test('should return 400 for empty messages array', async () => {
        const res = await chatRequest([]);
        assert(res.status === 400, `Expected 400, got ${res.status}`);
    });

    test('should return 400 for missing messages field', async () => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: 'hello' }), // Wrong field name
        });
        assert(res.status === 400, `Expected 400, got ${res.status}`);
    });

    test('should return 400 for oversized message (>500 chars)', async () => {
        const res = await chatRequest([
            { role: 'user', content: 'a'.repeat(501) }
        ]);
        assert(res.status === 400, `Expected 400, got ${res.status}`);
    });

    test('should handle multiple messages (conversation history)', async () => {
        const res = await chatRequest([
            { role: 'user', content: 'What technologies do you know?' },
            { role: 'assistant', content: 'I work with React, Node.js, and Python.' },
            { role: 'user', content: 'Tell me more about your React experience.' },
        ]);
        assert(res.ok, `Expected 200, got ${res.status}`);

        const text = await readStream(res);
        assert(text.length > 10, 'Should return a meaningful response');
        console.log(`     → Multi-turn response: "${text.slice(0, 100)}..."`);
    });

    test('should measure end-to-end latency (time to first byte)', async () => {
        const start = Date.now();
        const res = await chatRequest([
            { role: 'user', content: 'What projects have you built?' }
        ]);
        const ttfb = Date.now() - start;

        assert(res.ok, `Request failed: ${res.status}`);
        console.log(`     → Time to first byte: ${ttfb}ms`);
        assert(ttfb < 10000, `TTFB too slow: ${ttfb}ms`);

        // Read full stream and measure total time
        const text = await readStream(res);
        const total = Date.now() - start;
        console.log(`     → Total response time: ${total}ms`);
        console.log(`     → Response length: ${text.length} chars`);
    });

    test('should respond about portfolio content (not generic)', async () => {
        const res = await chatRequest([
            { role: 'user', content: 'What is your most recent job?' }
        ]);
        const text = await readStream(res);

        // The response should contain something specific from your resume
        // Adjust these checks based on your actual resume data
        const lowerText = text.toLowerCase();
        const hasSpecificContent = lowerText.includes('bhagyesh') ||
            lowerText.includes('engineer') ||
            lowerText.includes('developer') ||
            lowerText.includes('experience');

        console.log(`     → Contains portfolio-specific content: ${hasSpecificContent}`);
        assert(hasSpecificContent,
            'Response should reference specific portfolio data, not generic text');
    });
});

runTests();