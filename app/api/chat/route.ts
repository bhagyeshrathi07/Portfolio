import { streamText } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';
import { embedQuery } from '@/lib/rag/embeddings';
import { retrieveContext } from '@/lib/rag/retriever';
import { buildSystemPrompt } from '@/lib/rag/prompt-builder';

// Vercel AI SDK + Vertex provider — handles LLM streaming
const vertex = createVertex({
    project: process.env.GOOGLE_CLOUD_PROJECT!,
    location: process.env.GOOGLE_CLOUD_LOCATION!,
});

// ------------------------------------------------
// API Route Handler
// ------------------------------------------------

export async function POST(req: Request) {
    try {
        // --- Parse + Validate Input ---
        // extract conversation history from frontend
        const { messages } = await req.json();

        // validate 
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Invalid messages format' }),
                { status: 400 }
            );
        }
        // get user's latest question 
        const lastMessage = messages[messages.length - 1].content;

        if (typeof lastMessage !== 'string' || lastMessage.length > 500) {
            return new Response(
                JSON.stringify({ error: 'Message must be a string under 500 characters' }),
                { status: 400 }
            );
        }

        // --- RAG Pipeline ---
        const queryEmbedding = await embedQuery(lastMessage);
        const retrievedContext = await retrieveContext(queryEmbedding);
        const systemPrompt = buildSystemPrompt(retrievedContext);

        // --- Stream LLM Response ---
        const result = streamText({
            model: vertex('gemini-2.5-flash'),
            system: systemPrompt,
            messages: messages,
            temperature: 0.3,
            maxOutputTokens: 1024,
        });

        return result.toTextStreamResponse();

    } catch (error) {
        console.error('[RAG Pipeline Error]', error);
        return new Response(
            JSON.stringify({ error: 'Something went wrong. Please try again.' }),
            { status: 500 }
        );
    }
}