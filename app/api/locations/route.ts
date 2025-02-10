import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkAuth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const url = new URL(req.url);
    const swLat = parseFloat(url.searchParams.get("swLat") || "0");
    const swLng = parseFloat(url.searchParams.get("swLng") || "0");
    const neLat = parseFloat(url.searchParams.get("neLat") || "0");
    const neLng = parseFloat(url.searchParams.get("neLng") || "0");

    const user = await checkAuth();

    let id = "";

    if (user) {
        id = user.id;
    }

    const locations = await prisma.brewery.findMany({
        where: {
            latitude: { gte: swLat, lte: neLat },
            longitude: { gte: swLng, lte: neLng }
        },
        include: {
            _count: {
                select: { beers: true }
            },
            images: { select: { id: true, image: true } },
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

    const updatedLocations = locations.map((item) => ({
        ...item,
        averageRating: item.averageRating.toString()
    }));

    return NextResponse.json(updatedLocations);
}
