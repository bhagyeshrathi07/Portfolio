import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Oswald } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
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

const oswald = Oswald({
    subsets: ['latin'],
    weight: '300',
    variable: '--font-display',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://bhagyesh.dev'), // Ensure this is your actual production domain
    title: {
        default: 'Bhagyesh Rathi | Software Engineer',
        template: '%s | Bhagyesh Rathi'
    },
    description:
        'Portfolio of Bhagyesh Rathi. Software Engineer & AI/ML enthusiast. Explore my projects, experience, and skills — or chat with my AI assistant.',
    keywords: ['Bhagyesh Rathi', 'bhagyesh.dev', 'Bhagyesh', 'Portfolio', 'Software Engineer', 'AI', 'Machine Learning', 'RAG'],
    openGraph: {
        title: 'Bhagyesh Rathi | Software Engineer',
        description: 'Portfolio of Bhagyesh Rathi. Software Engineer & AI/ML enthusiast.',
        url: 'https://bhagyesh.dev',
        siteName: 'Bhagyesh Rathi',
        locale: 'en_US',
        type: 'website',
    },
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${oswald.variable}`}>
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Bhagyesh Rathi",
                        "url": "https://bhagyesh.dev",
                        "jobTitle": "Software Engineer",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Bay Area",
                            "addressRegion": "CA"
                        },
                        "sameAs": [
                            "https://www.linkedin.com/in/bhagyeshrathi07/",
                            "https://github.com/bhagyeshrathi07"
                        ]
                    })
                }} />
            </head>
            <body className="antialiased text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen">
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    {children}
                    <div className="fixed bottom-7 left-7 z-50">
                        <ThemeToggle />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
