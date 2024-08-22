import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/lib/env';
import { GlobalToaster } from '@/components/global/GlobalToaster';
import { Suspense } from 'react';

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
                {children}
                <Suspense>
                    <GlobalToaster />
                </Suspense>
            </body>
        </html>
    );
}
