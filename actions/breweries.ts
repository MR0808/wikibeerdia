"use server";

import * as z from "zod";
import { Brewery, Status, BreweryReview } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { BrewerySchemaCreate } from "@/schemas/brewery";
import { ReviewSchema, ReviewSchemaCreate } from "@/schemas/reviews";
import { getErrorMessage, renderError } from "@/lib/handleError";
import { ImagesUpload } from "@/types/global";

export const getBreweries = async () => {
    const data = await db.brewery.findMany({
        where: {
            status: "APPROVED"
        },
        select: { name: true, id: true },
        orderBy: { name: "asc" }
    });
    return { data };
};

export const createBrewery = async (
    values: z.infer<typeof BrewerySchemaCreate>
) => {
    let data: Brewery;
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const validatedFields = BrewerySchemaCreate.safeParse(values);

        if (!validatedFields.success) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        const {
            name,
            address1,
            address2,
            formattedAddress,
            city,
            region,
            postalCode,
            countryCode,
            description,
            headline,
            breweryType,
            website,
            logoUrl,
            images
        } = validatedFields.data;

        const countryId = await db.country.findFirst({
            where: { isoCode: countryCode }
        });

        if (!countryId) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        data = await db.brewery.create({
            data: {
                name,
                address1,
                address2,
                formattedAddress,
                city,
                region,
                postalCode,
                countryId: countryId.id,
                description,
                headline,
                breweryTypeId: breweryType,
                website: website || "",
                logoUrl,
                userId: user.id
            }
        });
        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }
        if (images && images?.length > 0) {
            for (const image of images) {
                await db.breweryImages.update({
                    where: {
                        image: image.image
                    },
                    data: {
                        breweryId: data.id
                    }
                });
            }
        }
    } catch (error) {
        return renderError(error);
    }

    redirect(`/breweries/${data.id}`);
};

export const createBreweryImages = async (images: ImagesUpload[]) => {
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const data = await db.breweryImages.createMany({
            data: images
        });

        if (!data)
            return { data: null, error: getErrorMessage("There was an error") };

        return {
            data,
            error: null
        };
    } catch (error) {
        return renderError(error);
    }
};

export const getBrewery = async (id: string) => {
    const data = await db.brewery.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    beers: {
                        where: { status: "APPROVED" }
                    }
                }
            },
            breweryReviews: {
                select: {
                    rating: true
                }
            },
            breweryType: {
                select: { name: true }
            },
            images: { orderBy: { order: "asc" } },
            user: { select: { id: true, displayName: true } },
            country: true
        }
    });
    return { data };
};

export const findExistingReview = async (userId: string, breweryId: string) => {
    return db.breweryReview.findFirst({
        where: {
            userId,
            breweryId
        }
    });
};

export const createBreweryReview = async (
    values: z.infer<typeof ReviewSchema>
) => {
    let data: BreweryReview;
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const validatedFields = ReviewSchemaCreate.safeParse(values);

        if (!validatedFields.success) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        const { rating, comment, id } = validatedFields.data;

        data = await db.breweryReview.create({
            data: {
                rating,
                comment,
                breweryId: id,
                userId: user.id,
                status: "APPROVED"
            }
        });

        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        const returnData = {
            id: data.id,
            rating: data.rating,
            comment: data.comment,
            createdAt: data.createdAt,
            user: {
                id: user.id,
                displayName: user.displayName,
                image: user.image
            }
        };

        revalidatePath(`/breweries/${id}`);

        return {
            data: returnData,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: getErrorMessage(error)
        };
    }
};

export const getBreweryBeers = async (
    breweryId: string,
    skip: number,
    take: number
) => {
    const data = await db.beer.findMany({
        where: { breweryId, status: "APPROVED" },
        skip,
        take,
        select: {
            id: true,
            images: true,
            name: true,
            abv: true,
            subStyle: {
                select: {
                    name: true
                }
            }
        }
    });

    return data;
};

export const getBreweryReviews = async (
    breweryId: string,
    skip: number,
    take: number,
    order: string = "recent"
) => {
    let orderBy = {};

    switch (order) {
        case "recent":
            orderBy = { createdAt: "desc" };
            break;
        case "asc":
            orderBy = { rating: "asc" };
            break;
        case "desc":
            orderBy = { rating: "desc" };
            break;
        default:
            orderBy = { createdAt: "desc" };
            break;
    }

    const data = await db.breweryReview.findMany({
        where: { breweryId, status: "APPROVED" },
        skip,
        take,
        select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    displayName: true,
                    image: true
                }
            }
        },
        orderBy
    });

    return data;
};

export const totalNumberOfReviews = async (breweryId: string) => {
    const data = db.breweryReview.count({
        where: { breweryId, status: "APPROVED" }
    });
    return data;
};

export const fetchBreweryFavoriteId = async ({
    breweryId
}: {
    breweryId: string;
}) => {
    const user = await checkAuth();

    if (!user) return null;

    const breweryFavorite = await db.breweryFavorite.findFirst({
        where: {
            breweryId,
            userId: user.id
        },
        select: {
            id: true
        }
    });
    return breweryFavorite?.id || null;
};

export const toggleBreweryFavoriteAction = async (
    breweryId: string,
    breweryFavoriteId: string | null,
    pathname: string
) => {
    const user = await currentUser();

    try {
        if (breweryFavoriteId) {
            await db.breweryFavorite.delete({
                where: {
                    id: breweryFavoriteId
                }
            });
        } else {
            await db.breweryFavorite.create({
                data: {
                    breweryId,
                    userId: user?.id!
                }
            });
        }
        revalidatePath(pathname);
        return {
            result: breweryFavoriteId ? false : true,
            message: breweryFavoriteId ? "Removed from Faves" : "Added to Faves"
        };
    } catch (error) {
        return renderError(error);
    }
};

export const updateBreweryStatus = async (id: string, status: Status) => {
    const user = await checkAuth(true);

    if (!user)
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };

    try {
        await db.brewery.update({
            where: { id },
            data: {
                status
            }
        });

        revalidatePath(`/breweries/${id}`);

        return {
            error: null
        };
    } catch (err) {
        return {
            error: getErrorMessage(err)
        };
    }
};
