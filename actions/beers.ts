"use server";

import * as z from "zod";
import { Beer } from "@prisma/client";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { BeerSchemaCreate } from "@/schemas/beer";
import { getErrorMessage, renderError } from "@/lib/handleError";
import { ImagesUpload } from "@/types/global";

export const createBeer = async (values: z.infer<typeof BeerSchemaCreate>) => {
    let data: Beer;
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const validatedFields = BeerSchemaCreate.safeParse(values);

        if (!validatedFields.success) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        const {
            name,
            headline,
            description,
            abv,
            ibu,
            year,
            available,
            subStyle,
            brewery,
            images
        } = validatedFields.data;

        const yearCreated = year ? parseInt(year) : null;

        data = await db.beer.create({
            data: {
                name,
                description,
                headline,
                abv: String(abv),
                ibu: String(ibu),
                yearCreated,
                subStyleId: subStyle,
                breweryId: brewery,
                available,
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
                await db.beerImages.update({
                    where: {
                        image: image.image
                    },
                    data: {
                        beerId: data.id
                    }
                });
            }
        }
    } catch (error) {
        return renderError(error);
    }

    redirect(`/beer/${data.id}`);
};

export const createBeerImages = async (images: ImagesUpload[]) => {
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const data = await db.beerImages.createMany({
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

// export const createBeer = async (formData: FormData) => {
//     console.log("here");
//     let data: Beer;
//     try {
//         const user = await checkAuth();

//         if (!user)
//             return {
//                 data: null,
//                 error: getErrorMessage("Unauthorized")
//             };

//         const form = BeerSchemaFormData.safeParse(formData);

//         if (form.error) {
//             return {
//                 data: null,
//                 error: getErrorMessage("Error with fields")
//             };
//         }

//         const {
//             name,
//             headline,
//             description,
//             abv,
//             ibu,
//             year,
//             available,
//             subStyle,
//             brewery,
//             images
//         } = BeerSchemaFormData.parse(formData);

//         const availableBool = available?.toLowerCase?.() === "true";
//         const yearCreated = parseInt(year);

//         data = await db.beer.create({
//             data: {
//                 name,
//                 description,
//                 headline,
//                 abv,
//                 ibu,
//                 yearCreated,
//                 subStyleId: subStyle,
//                 breweryId: brewery,
//                 available: availableBool,
//                 userId: user.id
//             }
//         });
//         if (!data) {
//             return {
//                 data: null,
//                 error: getErrorMessage("Error with fields")
//             };
//         }
//         if (images && images?.length > 0) {
//             let i = 1;
//             for (const image of images) {
//                 const url = await uploadImage(image, "images-bucket");
//                 await db.beerImages.create({
//                     data: {
//                         image: url,
//                         order: i,
//                         beerId: data.id
//                     }
//                 });
//                 i++;
//             }
//         }
//     } catch (error) {
//         return renderError(error);
//     }

//     redirect(`/beer/${data.id}`);
// };
