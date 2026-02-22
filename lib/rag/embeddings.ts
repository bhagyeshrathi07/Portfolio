import { GoogleGenAI } from '@google/genai';

const genai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY! });

const EMBEDDING_MODEL = 'text-embedding-005';

/**
 * Generate an embedding vector for a text query.
 * Uses Google's text-embedding-005 model (768 dimensions).
 */
export async function embedQuery(text: string): Promise<number[]> {
    const response = await genai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: text,
        config: {
            taskType: 'RETRIEVAL_QUERY',
        },
    });

    const values = response.embeddings?.[0]?.values;
    if (!values) {
        throw new Error('Failed to generate embedding');
    }
    return values;
}
