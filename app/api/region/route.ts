import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const parentStyleSlug =
            searchParams.get("parentStyleSlug") || undefined;

        let styles;

        if (!parentStyleSlug || parentStyleSlug === "all") {
            // Fetch all regions from all styles
            styles = await db.style.findMany({
                where: { status: "APPROVED" },
                select: { region: true }
            });
        } else {
            // Fetch regions based on specific parentStyleId
            styles = await db.style.findMany({
                where: {
                    parentStyle: { slug: parentStyleSlug },
                    status: "APPROVED"
                }, // Ensuring parentStyleId is always a string
                select: { region: true }
            });
        }

        const regions = Array.from(
            new Set(styles.flatMap((style) => style.region))
        )
            .sort()
            .map((region) => ({ value: region, label: region }));

        return NextResponse.json(regions);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
