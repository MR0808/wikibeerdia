import { NextResponse } from "next/server";
import db from "@/lib/db";
import { checkAuth } from "@/lib/auth";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const swLat = parseFloat(url.searchParams.get("swLat") || "0");
    const swLng = parseFloat(url.searchParams.get("swLng") || "0");
    const neLat = parseFloat(url.searchParams.get("neLat") || "0");
    const neLng = parseFloat(url.searchParams.get("neLng") || "0");
    const breweryType = url.searchParams.get("breweryType") || "all";

    const user = await checkAuth();

    let id = "";

    if (user) {
        id = user.id;
    }
    let where: any = {
        latitude: { gte: swLat, lte: neLat },
        longitude: { gte: swLng, lte: neLng }
    };

    // if (breweryType !== "all") {
    //     where = { ...where, breweryTypeId: breweryType };
    // }

    const locations = await db.brewery.findMany({
        where,
        include: {
            _count: {
                select: { beers: true }
            },
            breweryType: { select: { id: true, name: true, colour: true } },
            country: { select: { id: true, name: true } },
            breweryReviews: { select: { id: true } },
            breweryFavourites: {
                where: { userId: id },
                select: { id: true }
            }
        },
        orderBy: { name: "asc" }
    });

    const updatedLocations = locations.map((item: typeof locations[0]) => ({
        ...item,
        averageRating: item.averageRating.toString()
    }));

    return NextResponse.json(updatedLocations);
}
