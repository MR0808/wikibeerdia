import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const apiKey = req.cookies.get("apiKey");

    if (!apiKey) {
        return NextResponse.json({ valid: false });
    }

    return NextResponse.json({ valid: true });
}
