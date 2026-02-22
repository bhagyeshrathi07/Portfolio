import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bhagyesh Rathi — Portfolio',
    description:
        'AI-powered portfolio chatbot. Ask me anything about my professional experience, projects, and skills.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
