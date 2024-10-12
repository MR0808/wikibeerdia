"use server";

import * as z from "zod";
import { Brewery } from "@prisma/client";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { BrewerySchemaFormData } from "@/schemas/brewery";
import { uploadImage, deleteImage } from "@/utils/supabase";
import { getUserById } from "@/data/user";
import { getErrorMessage } from "@/lib/handleError";

export const createBrewery = async (formData: FormData) => {
    console.log("values", formData);
    try {
        const user = await currentUser();

        if (!user) {
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };
        }

        const dbUser = await getUserById(user.id!);

        if (!dbUser) {
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };
        }

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
            country,
            countryCode,
            description,
            breweryType,
            website,
            logoUrl,
            images
        } = BrewerySchemaFormData.parse(formData);

        const logoFullPath = await uploadImage(logoUrl[0], "logos-bucket");
        let imagesUrls: string[] = [];
        if (images && images?.length > 0) {
            for (const image of images) {
                const url = await uploadImage(image, "images-bucket");
                imagesUrls.push(url);
            }
        }
        const countryId = await db.country.findFirst({
            where: { isoCode: countryCode }
        });

        if (!countryId) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        const data = await db.brewery.create({
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
                breweryTypeId: breweryType,
                website: website || "",
                logoUrl: logoFullPath,
                images: imagesUrls,
                userId: dbUser.id
            }
        });
        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        redirect(`/breweries/${data.id}`);
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
