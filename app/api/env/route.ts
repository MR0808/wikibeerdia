import { NextRequest, NextResponse } from "next/server";
import { getApiKeyFromDB } from "@/lib/key";

// List of allowed environment variables
const ALLOWED_ENV_VARS = ["MAPBOX_ACCESS_TOKEN", "GOOGLE_PLACES_API_KEY"];

function getApiKeyFromCookies(req: NextRequest): string | null {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return null;

    const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => c.split("="))
    );

    return cookies.apiKey || null;
}

export async function GET(req: NextRequest) {
    const apiKeyFromCookie = getApiKeyFromCookies(req);
    const validApiKey = await getApiKeyFromDB();

    if (!apiKeyFromCookie || apiKeyFromCookie !== validApiKey) {
        return NextResponse.json(
            { error: "Forbidden: Invalid API Key" },
            { status: 403 }
        );
    }

    // Fetch env vars securely
    const envVars: Record<string, string> = {};
    for (const key of ALLOWED_ENV_VARS) {
        const value = process.env[key];
        if (value) envVars[key] = value;
    }

    return NextResponse.json(envVars);
}
