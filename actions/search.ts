"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { SearchSchema } from "@/schemas/search";
import { SearchFilter } from "@/types/search";

export const getSearchResults = async ({
    sort,
    page,
    pageSize,
    query
}: SearchFilter) => {
    const validation = SearchSchema.safeParse({
        query,
        page,
        pageSize
    });

    if (!validation.success) {
        return { error: "Invalid search parameters" };
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const user = await checkAuth();

    let userId = "";

    if (user) {
        userId = user.id;
    }

    try {
        const [beers, breweries] = await db.$transaction([
            db.beer.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        {
                            description: {
                                contains: query,
                                mode: "insensitive"
                            }
                        },
                        { headline: { contains: query, mode: "insensitive" } }
                    ]
                },
                include: {
                    images: { select: { id: true, image: true } },
                    beerReviews: { select: { id: true } },
                    beerFavourites: userId
                        ? { where: { userId }, select: { id: true } }
                        : false,
                    style: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            parentStyle: { select: { slug: true, name: true } }
                        }
                    },
                    brewery: {
                        select: {
                            id: true,
                            name: true,
                            region: true,
                            country: { select: { name: true } },
                            slug: true
                        }
                    }
                }
            }),
            db.brewery.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        {
                            description: {
                                contains: query,
                                mode: "insensitive"
                            }
                        },
                        { headline: { contains: query, mode: "insensitive" } }
                    ]
                },
                include: {
                    _count: { select: { beers: true } },
                    breweryType: {
                        select: {
                            id: true,
                            name: true,
                            colour: true,
                            slug: true
                        }
                    },
                    country: { select: { id: true, name: true } },
                    breweryReviews: { select: { id: true } },
                    breweryFavourites: userId
                        ? { where: { userId }, select: { id: true } }
                        : false
                }
            })
        ]);

        // Merge and sort results alphabetically by name
        const mergedResults = [
            ...beers.map((b) => ({ ...b, type: "beer" })),
            ...breweries.map((b) => ({ ...b, type: "brewery" }))
        ];

        mergedResults.sort((a, b) => a.name.localeCompare(b.name));

        // Apply pagination
        const paginatedResults = mergedResults.slice(skip, skip + take);

        return {
            results: paginatedResults,
            total: mergedResults.length,
            error: null
        };
    } catch (error) {
        return {
            results: null,
            total: null,
            error: "Something went wrong while searching"
        };
    }
};
