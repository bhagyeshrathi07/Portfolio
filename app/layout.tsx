import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Bebas_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});

const bebasNeue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Bhagyesh Rathi — Portfolio',
    description:
        'Software Engineer & AI/ML enthusiast. Explore my projects, experience, and skills — or chat with my AI assistant.',
    keywords: ['Bhagyesh Rathi', 'Portfolio', 'Software Engineer', 'AI', 'Machine Learning', 'RAG'],
    openGraph: {
        title: 'Bhagyesh Rathi — Portfolio',
        description: 'Software Engineer & AI/ML enthusiast.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}>
            <body>{children}</body>
        </html>
    );
}
