import { getIndex } from '../pinecone';

const TOP_K = 5;
const SCORE_THRESHOLD = 0.3;

/**
 * Query Pinecone for the most relevant resume chunks.
 * Filters out low-scoring matches to reduce hallucination.
 */
export async function retrieveContext(queryEmbedding: number[]): Promise<string> {
    const index = getIndex();

    const queryResponse = await index.query({
        vector: queryEmbedding,
        topK: TOP_K,
        includeMetadata: true,
    });

    // Filter by score threshold — without this, low-scoring chunks
    // add noise and cause hallucinations
    const relevantMatches = queryResponse.matches.filter(
        (match) => (match.score || 0) > SCORE_THRESHOLD
    );

    return relevantMatches
        .map((match) => match.metadata?.text)
        .filter(Boolean)
        .join('\n\n');
}
