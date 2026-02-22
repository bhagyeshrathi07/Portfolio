// ================================================================
// FILE: tests/utils.ts
// Shared helpers for all test files
// ================================================================

import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Simple test runner (no Jest dependency needed)
type TestFn = () => Promise<void>;
interface TestCase { name: string; fn: TestFn }

const results: { name: string; passed: boolean; error?: string; duration: number }[] = [];

export function describe(suite: string, fn: () => void) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`  ${suite}`);
    console.log(`${'='.repeat(60)}`);
    fn();
}

const tests: TestCase[] = [];

export function test(name: string, fn: TestFn) {
    tests.push({ name, fn });
}

export async function runTests() {
    for (const t of tests) {
        const start = Date.now();
        try {
            await t.fn();
            const dur = Date.now() - start;
            console.log(`  ✅ ${t.name} (${dur}ms)`);
            results.push({ name: t.name, passed: true, duration: dur });
        } catch (err: any) {
            const dur = Date.now() - start;
            console.log(`  ❌ ${t.name} (${dur}ms)`);
            console.log(`     Error: ${err.message}`);
            results.push({ name: t.name, passed: false, error: err.message, duration: dur });
        }
    }

    // Summary
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`  Results: ${passed} passed, ${failed} failed, ${results.length} total`);
    if (failed > 0) {
        console.log(`\n  Failures:`);
        results.filter(r => !r.passed).forEach(r => {
            console.log(`    ✗ ${r.name}: ${r.error}`);
        });
    }
    console.log(`${'─'.repeat(60)}\n`);

    // Clear for next file
    tests.length = 0;
    results.length = 0;

    return failed === 0;
}

// Assertion helpers
export function assert(condition: boolean, msg: string) {
    if (!condition) throw new Error(msg);
}

export function assertEqual<T>(actual: T, expected: T, msg: string) {
    if (actual !== expected) {
        throw new Error(`${msg} — expected: ${expected}, got: ${actual}`);
    }
}

export function assertInRange(value: number, min: number, max: number, msg: string) {
    if (value < min || value > max) {
        throw new Error(`${msg} — expected ${min}-${max}, got: ${value}`);
    }
}