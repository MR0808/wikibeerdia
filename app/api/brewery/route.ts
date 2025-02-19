import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    if (!query) return NextResponse.json([]);

    try {
        const results = await db.brewery.findMany({
            where: { name: { contains: query, mode: "insensitive" } },
            select: { name: true, slug: true }
        });

        // return NextResponse.json(results.map((r) => r.slug));
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
