import Link from "next/link";
import ChatFrontend from "@/components/ChatFrontend";

export const metadata = {
    title: "Chat — Bhagyesh Rathi",
    description: "Ask the AI assistant anything about Bhagyesh's experience, projects, and skills.",
};

export default function ChatPage() {
    return (
        <div className="chat-page">
            <div className="chat-back">
                <Link href="/" className="btn btn-outline btn-sm">
                    ← Back to Portfolio
                </Link>
            </div>
            <ChatFrontend />
        </div>
    );
}
