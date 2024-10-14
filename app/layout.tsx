import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Wikibeerdia",
    description: "Everything you needed to know about beer"
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en" suppressHydrationWarning={true}>
                <body
                    className={`${inter.className} bg-slate-100`}
                    suppressHydrationWarning={true}
                >
                    <ReactQueryProvider>
                        <TooltipProvider>{children}</TooltipProvider>
                    </ReactQueryProvider>
                    <Toaster richColors />

                    <SpeedInsights />
                </body>
            </html>
        </SessionProvider>
    );
}
