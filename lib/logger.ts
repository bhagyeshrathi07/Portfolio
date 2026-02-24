/**
 * Chat and System Logger
 * 
 * Abstracted logging service for monitoring AI chat interactions and system events.
 * Currently supports Discord Webhook integration, but can be expanded to include
 * PostHog, Sentry, Datadog, or custom database logging in the future.
 */

interface LogPayload {
    message: string;
    req: Request;
}

export async function logChatMessage({ message, req }: LogPayload) {
    // 1. Extract context data (IP, Location)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown IP';
    const city = req.headers.get('x-vercel-ip-city') ? decodeURIComponent(req.headers.get('x-vercel-ip-city')!) : 'Unknown City';
    const region = req.headers.get('x-vercel-ip-country-region') ? decodeURIComponent(req.headers.get('x-vercel-ip-country-region')!) : 'Unknown Region';
    const country = req.headers.get('x-vercel-ip-country') ? decodeURIComponent(req.headers.get('x-vercel-ip-country')!) : 'Unknown Country';

    const location = [city, region, country].filter(x => x && !x.includes('Unknown')).join(', ') || 'Local/Unknown';
    const userAgent = req.headers.get('user-agent') || 'Unknown Device';
    const referer = req.headers.get('referer') || 'Unknown Origin';

    // 2. Dispatch to all active logging services
    const loggingPromises = [];

    if (process.env.DISCORD_WEBHOOK_URL) {
        loggingPromises.push(
            sendToDiscord({ message, ip, location, userAgent, referer })
        );
    }

    // Future integrations can be added here:
    // if (process.env.POSTHOG_KEY) loggingPromises.push(sendToPostHog(...));
    // if (process.env.SENTRY_DSN) loggingPromises.push(sendToSentry(...));

    // Await all logging ops without failing the main request if one fails
    await Promise.allSettled(loggingPromises);
}

export async function logAiResponse({ message, aiResponse, req }: { message: string, aiResponse: string, req: Request }) {
    if (!process.env.DISCORD_WEBHOOK_URL) return;

    try {
        const embed = {
            title: "AI Response Generated",
            description: `**In reply to:**\n> ${message.length > 200 ? message.substring(0, 197) + "..." : message}`,
            color: 0x2b2d31, // Dark grey background for AI
            fields: [
                { name: "Output", value: aiResponse.length > 1024 ? aiResponse.substring(0, 1021) + "..." : aiResponse, inline: false }
            ],
            timestamp: new Date().toISOString()
        };

        await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
    } catch (e) {
        console.error("Failed to log AI response to discord", e);
    }
}

// --- Specific Service Implementations ---

async function sendToDiscord({ message, ip, location, userAgent, referer }: { message: string, ip: string, location: string, userAgent?: string, referer?: string }) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

    try {
        const embed = {
            title: "New Chat Message",
            color: 0xe8573a, // Portfolio accent color
            fields: [
                { name: "Message", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message, inline: false },
                { name: "Location", value: location, inline: true },
                { name: "IP Address", value: ip, inline: true },
                { name: "Device (User-Agent)", value: userAgent && userAgent !== 'Unknown Device' ? (userAgent.length > 1024 ? userAgent.substring(0, 1021) + "..." : userAgent) : "Unknown", inline: false },
                { name: "Origin (Referer)", value: referer && referer !== 'Unknown Origin' ? referer : "Unknown", inline: true }
            ],
            timestamp: new Date().toISOString()
        };

        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
    } catch (e) {
        console.error("Failed to send discord log", e);
    }
}
