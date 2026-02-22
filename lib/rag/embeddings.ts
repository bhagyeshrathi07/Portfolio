import { embed } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';

// Keep auth unified with the chat route
const vertex = createVertex({
    project: process.env.GOOGLE_CLOUD_PROJECT!,
    location: process.env.GOOGLE_CLOUD_LOCATION!,
    googleAuthOptions: process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY
        ? {
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
        }
        : undefined, // Falls back to local GOOGLE_APPLICATION_CREDENTIALS in dev
});

const EMBEDDING_MODEL = 'text-embedding-005';

/**
 * Generate an embedding vector for a text query.
 * Uses Google's text-embedding-005 model (768 dimensions).
 */
export async function embedQuery(text: string): Promise<number[]> {
    const { embedding } = await embed({
        model: vertex.textEmbeddingModel(EMBEDDING_MODEL),
        value: text,
    });

    return embedding;
}
