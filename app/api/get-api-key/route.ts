import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Simulate fetching an API key securely (e.g., from session, database)
    const apiKey = process.env.INTERNAL_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "API key not found" },
            { status: 500 }
        );
    }

    return NextResponse.json({ apiKey });
}
