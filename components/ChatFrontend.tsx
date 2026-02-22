"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SUGGESTIONS = [
    "What's your work experience?",
    "What projects have you built?",
    "What technologies do you use?",
    "Tell me about your education",
];

export default function ChatFrontend() {
    const { messages, sendMessage, stop, status } = useChat({
        experimental_throttle: 50,
    });
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isLoading = status === "submitted" || status === "streaming";

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;
        sendMessage({ text: trimmed });
        setInput("");
    };

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage({ text: suggestion });
    };

    // Extract text content from message parts
    const getMessageText = (message: (typeof messages)[0]): string => {
        return message.parts
            .filter((part): part is { type: "text"; text: string } => part.type === "text")
            .map((part) => part.text)
            .join("");
    };

    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <div className="header-logo">
                    <div className="header-logo-icon">B</div>
                    <h1>Bhagyesh Rathi</h1>
                </div>
                <p>AI-Powered Portfolio Assistant</p>
                <div className="status-indicator">
                    <span className="status-dot" />
                    Online
                </div>
            </header>

            {/* Messages */}
            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="messages-empty">
                        <div className="messages-empty-icon">💬</div>
                        <h2>Ask me anything about Bhagyesh</h2>
                        <p>
                            I can tell you about his experience, projects, skills,
                            and education — all powered by RAG.
                        </p>
                        <div className="suggestions">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    className="suggestion-chip"
                                    onClick={() => handleSuggestionClick(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message message-${message.role}`}
                        >
                            <span className="message-label">
                                {message.role === "user" ? "You" : "AI"}
                            </span>
                            <div className="message-bubble">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {getMessageText(message)}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))
                )}

                {/* Typing indicator */}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="typing-indicator">
                        <div className="typing-dots">
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                        </div>
                        <span className="typing-text">Thinking...</span>
                        <button
                            type="button"
                            onClick={() => stop()}
                            className="stop-button"
                        >
                            Stop
                        </button>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="input-area">
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        ref={inputRef}
                        className="input-field"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about experience, projects, skills..."
                        disabled={isLoading}
                        maxLength={500}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="send-button"
                    >
                        Send
                    </button>
                </form>
                <p className="input-hint">
                    Powered by RAG · Gemini 2.5 Flash · Pinecone
                </p>
            </div>
        </div>
    );
}
