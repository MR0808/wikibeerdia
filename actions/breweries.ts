"use server";

import * as z from "zod";
import { Brewery } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { BrewerySchemaFormData } from "@/schemas/brewery";
import { uploadImage, deleteImage } from "@/utils/supabase";
import { getErrorMessage } from "@/lib/handleError";

export const createBrewery = async (formData: FormData) => {
    let data: Brewery;
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const form = BrewerySchemaFormData.safeParse(formData);

        if (form.error) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
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
        } = BrewerySchemaFormData.parse(formData);

        const logoFullPath = await uploadImage(logoUrl[0], "logos-bucket");
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
                logoUrl: logoFullPath,
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
            let i = 1;
            for (const image of images) {
                const url = await uploadImage(image, "images-bucket");
                await db.breweryImages.create({
                    data: {
                        image: url,
                        order: i,
                        breweryId: data.id
                    }
                });
                i++;
            }
        }
    } catch (error) {
        return renderError(error);
    }

    redirect(`/breweries/${data.id}`);
};

export const getBrewery = async (id: string) => {
    const data = await db.brewery.findUnique({
        where: {
            id
        },
        include: {
            beers: true,
            breweryReviews: true,
            breweryType: {
                select: { name: true }
            },
            images: true,
            user: { select: { id: true, displayName: true } },
            country: true
        }
    });
    return { data };
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

const renderError = (
    error: unknown
): { result: boolean | null; message: string } => {
    console.log(error);
    return {
        result: false,
        message: error instanceof Error ? error.message : "An error occurred"
    };
};
