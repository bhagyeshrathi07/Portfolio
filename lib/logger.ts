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
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown City';
    const region = req.headers.get('x-vercel-ip-country-region') || 'Unknown Region';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown Country';

    const location = [city, region, country].filter(x => x && !x.includes('Unknown')).join(', ') || 'Local/Unknown';

    // 2. Dispatch to all active logging services
    const loggingPromises = [];

    if (process.env.DISCORD_WEBHOOK_URL) {
        loggingPromises.push(
            sendToDiscord({ message, ip, location })
        );
    }

    // Future integrations can be added here:
    // if (process.env.POSTHOG_KEY) loggingPromises.push(sendToPostHog(...));
    // if (process.env.SENTRY_DSN) loggingPromises.push(sendToSentry(...));

    // Await all logging ops without failing the main request if one fails
    await Promise.allSettled(loggingPromises);
}

// --- Specific Service Implementations ---

async function sendToDiscord({ message, ip, location }: { message: string, ip: string, location: string }) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

    try {
        const embed = {
            title: "New Chat Message",
            color: 0xe8573a, // Portfolio accent color
            fields: [
                { name: "Message", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message, inline: false },
                { name: "Location", value: location, inline: true },
                { name: "IP Address", value: ip, inline: true }
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
