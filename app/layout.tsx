import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { GoogleTagManager } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import siteMetadata from "@/utils/siteMetaData";
import { inter } from "./fonts";
import Scroll from "@/components/global/Scroll";
import { ApiKeyProvider } from "@/Providers/ApiKeyProvider";

export const metadata: Metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        template: `${siteMetadata.title} | %s`,
        default: siteMetadata.title // a default is required when creating a template
    },
    description: siteMetadata.description,
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: siteMetadata.siteUrl,
        siteName: siteMetadata.title,
        images: [siteMetadata.siteLogo],
        locale: "en_AU",
        type: "website"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    twitter: {
        card: "summary_large_image",
        title: siteMetadata.title,
        images: [siteMetadata.siteLogo]
    }
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
                    {/* <Scroll /> */}
                    <ApiKeyProvider />
                    <NuqsAdapter>
                        <ReactQueryProvider>
                            <TooltipProvider>
                                <GoogleTagManager gtmId="G-FBQEGT4TEE" />
                                {children}
                            </TooltipProvider>
                        </ReactQueryProvider>
                    </NuqsAdapter>
                    <Toaster richColors />
                    <SpeedInsights />
                </body>
            </html>
        </SessionProvider>
    );
}
