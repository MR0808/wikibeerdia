"use server";

import * as z from "zod";
import { Brewery, Status } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { BrewerySchemaCreate } from "@/schemas/brewery";
import { uploadImage, deleteImage } from "@/utils/supabase";
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
            breweryReviews: true,
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
