import { NextResponse } from "next/server";
import { getApiKeyFromDB } from "@/lib/key";
import { serialize } from "cookie";

export async function GET() {
    const apiKey = await getApiKeyFromDB();

    if (!apiKey) {
        return NextResponse.json(
            { error: "API key not found" },
            { status: 500 }
        );
    }

    const cookie = serialize("apiKey", apiKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 day expiration
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);
    return response;
}
