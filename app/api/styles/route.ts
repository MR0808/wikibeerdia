import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const parentSlug = searchParams.get("parentSlug") || "all";

        const styles = await db.style.findMany({
            where: { parentStyle: { slug: parentSlug } },
            select: {
                id: true,
                name: true,
                slug: true
            }
        });

        return NextResponse.json(styles);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch styles", details: error },
            { status: 500 }
        );
    }
}
