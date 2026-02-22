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

// Extract text from a message — handles both v6 UIMessage (parts) and legacy (content)
function extractTextFromMessage(msg: any): string {
    if (typeof msg.content === 'string') return msg.content;
    if (Array.isArray(msg.parts)) {
        return msg.parts
            .filter((p: any) => p.type === 'text')
            .map((p: any) => p.text)
            .join('');
    }
    return '';
}

// Normalize messages to {role, content} format that streamText accepts
function normalizeMessages(msgs: any[]): Array<{ role: 'user' | 'assistant'; content: string }> {
    return msgs
        .filter((m: any) => m.role === 'user' || m.role === 'assistant')
        .map((m: any) => ({
            role: m.role as 'user' | 'assistant',
            content: extractTextFromMessage(m),
        }));
}

// Prevent Next.js from buffering the streaming response
export const dynamic = 'force-dynamic';

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
        const lastMessage = extractTextFromMessage(messages[messages.length - 1]);

        if (!lastMessage || lastMessage.length > 500) {
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
            messages: normalizeMessages(messages),
            temperature: 0.3,
            maxOutputTokens: 812,
        });

        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.error('[RAG Pipeline Error]', error);
        return new Response(
            JSON.stringify({ error: 'Something went wrong. Please try again.' }),
            { status: 500 }
        );
    }
}