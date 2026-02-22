import Link from "next/link";

export default function ChatButton() {
    return (
        <Link href="/chat" className="chat-fab" title="Ask AI about me">
            Ask AI
        </Link>
    );
}
