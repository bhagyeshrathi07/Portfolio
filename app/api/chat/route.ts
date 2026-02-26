import { streamText } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';
import { embedQuery } from '@/lib/rag/embeddings';
import { retrieveContext } from '@/lib/rag/retriever';
import { buildSystemPrompt } from '@/lib/rag/prompt-builder';
import { logChatMessage, logAiResponse } from '@/lib/logger';

// Vercel AI SDK + Vertex provider — handles LLM streaming
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
        : undefined, // Falls back to local GOOGLE_APPLICATION_CREDENTIALS file path in dev
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

        // --- Log payload asynchronously to abstracted monitoring services ---
        logChatMessage({ message: lastMessage, req }).catch(e => console.error("Logging dispatcher error:", e));

        // --- RAG Pipeline ---
        const queryEmbedding = await embedQuery(lastMessage);
        const retrievedContext = await retrieveContext(queryEmbedding);
        const systemPrompt = buildSystemPrompt(retrievedContext);

        // --- Stream LLM Response ---
        const result = streamText({
            model: vertex('gemini-2.5-flash'),
            system: systemPrompt,
            messages: normalizeMessages(messages),
            temperature: 0.4,
            maxOutputTokens: 2000,
            onFinish: async ({ text }) => {
                // Log the final AI output to Discord lazily after stream completes
                logAiResponse({ message: lastMessage, aiResponse: text, req }).catch(
                    e => console.error("Discord AI logging error:", e)
                );
            }
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