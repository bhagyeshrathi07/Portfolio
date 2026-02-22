import { Pinecone } from '@pinecone-database/pinecone';

// Singleton Pinecone client — initialized once per cold start
export const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
export const indexName = process.env.PINECONE_INDEX_NAME!;

export function getIndex() {
    return pc.Index(indexName);
}
