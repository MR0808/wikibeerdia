import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/global/Container';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Wikibeerdia',
    description: 'Everything you needed to know about beer'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    <div className="relative flex min-h-screen flex-col">
                        <Navbar />
                        <div className="flex-1">{children}</div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
