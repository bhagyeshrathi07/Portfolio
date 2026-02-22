// ================================================================
// FILE: tests/run-all.ts
// Runs all test files in sequence
// Usage: npx tsx tests/run-all.ts
// ================================================================

import { execSync } from 'child_process';

const testFiles = [
    'tests/1-embedding.test.ts',
    'tests/2-retrieval.test.ts',
    'tests/3-pipeline.test.ts',
    'tests/4-security.test.ts',
];

console.log('🚀 Running RAG Portfolio Test Suite\n');
console.log('Prerequisites:');
console.log('  ✓ .env.local configured with API keys');
console.log('  ✓ Pinecone index populated');
console.log('  ✓ Dev server running on localhost:3000 (for tests 3-4)\n');

let allPassed = true;

for (const file of testFiles) {
    console.log(`\n📋 Running: ${file}`);
    try {
        execSync(`npx tsx ${file}`, { stdio: 'inherit' });
    } catch {
        allPassed = false;
        console.log(`⚠️  Some tests failed in ${file}`);
    }
}

console.log('\n' + '='.repeat(60));
console.log(allPassed ? '✅ ALL TEST SUITES PASSED' : '❌ SOME TESTS FAILED');
console.log('='.repeat(60));
process.exit(allPassed ? 0 : 1);