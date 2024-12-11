"use server";

import * as z from "zod";
import {
    Beer,
    type Beer as BeerType,
    Status,
    BeerReview
} from "@prisma/client";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { BeerSchemaCreate } from "@/schemas/beer";
import { ReviewSchema, ReviewSchemaCreate } from "@/schemas/reviews";
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

export const getBeer = async (id: string) => {
    const data = await db.beer.findUnique({
        where: {
            id
        },
        include: {
            beerReviews: {
                select: {
                    rating: true
                }
            },
            subStyle: {
                select: {
                    id: true,
                    name: true,
                    style: {
                        select: {
                            id: true,
                            name: true,
                            parentStyle: { select: { id: true, name: true } }
                        }
                    }
                }
            },
            images: { orderBy: { order: "asc" } },
            user: { select: { id: true, displayName: true } },
            brewery: {
                select: {
                    id: true,
                    name: true,
                    logoUrl: true,
                    country: { select: { name: true } }
                }
            }
        }
    });

    return { data };
};

export const findExistingReview = async (userId: string, beerId: string) => {
    return db.beerReview.findFirst({
        where: {
            userId,
            beerId
        }
    });
};

// export const createBreweryReview = async (
//     values: z.infer<typeof ReviewSchema>
// ) => {
//     let data: BreweryReview;
//     try {
//         const user = await checkAuth();

//         if (!user)
//             return {
//                 data: null,
//                 error: getErrorMessage("Unauthorized")
//             };

//         const validatedFields = ReviewSchemaCreate.safeParse(values);

//         if (!validatedFields.success) {
//             return {
//                 data: null,
//                 error: getErrorMessage("Invalid fields!")
//             };
//         }

//         const { rating, comment, id } = validatedFields.data;

//         data = await db.breweryReview.create({
//             data: {
//                 rating,
//                 comment,
//                 breweryId: id,
//                 userId: user.id,
//                 status: "APPROVED"
//             }
//         });

//         if (!data) {
//             return {
//                 data: null,
//                 error: getErrorMessage("Error with fields")
//             };
//         }

//         const returnData = {
//             id: data.id,
//             rating: data.rating,
//             comment: data.comment,
//             createdAt: data.createdAt,
//             user: {
//                 id: user.id,
//                 displayName: user.displayName,
//                 image: user.image
//             }
//         };

//         revalidatePath(`/breweries/${id}`);

//         return {
//             data: returnData,
//             error: null
//         };
//     } catch (error) {
//         return {
//             data: null,
//             error: getErrorMessage(error)
//         };
//     }
// };

export const getBeerReviews = async (
    beerId: string,
    skip: number,
    take: number,
    order: string = "recent"
) => {
    let orderBy = {};

    switch (order) {
        case "recent":
            orderBy = [{ createdAt: "desc" }, { id: "desc" }];
            break;
        case "asc":
            orderBy = [{ rating: "asc" }, { id: "desc" }];
            break;
        case "desc":
            orderBy = [{ rating: "desc" }, { id: "desc" }];
            break;
        default:
            orderBy = [{ createdAt: "desc" }, { id: "desc" }];
            break;
    }

    const data = await db.beerReview.findMany({
        where: { beerId, status: "APPROVED" },
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

// export const totalNumberOfReviews = async (breweryId: string) => {
//     const data = db.breweryReview.count({
//         where: { breweryId, status: "APPROVED" }
//     });
//     return data;
// };

// export const fetchBreweryFavoriteId = async ({
//     breweryId
// }: {
//     breweryId: string;
// }) => {
//     const user = await checkAuth();

//     if (!user) return null;

//     const breweryFavorite = await db.breweryFavorite.findFirst({
//         where: {
//             breweryId,
//             userId: user.id
//         },
//         select: {
//             id: true
//         }
//     });
//     return breweryFavorite?.id || null;
// };

// export const toggleBreweryFavoriteAction = async (
//     breweryId: string,
//     breweryFavoriteId: string | null,
//     pathname: string
// ) => {
//     const user = await currentUser();

//     try {
//         if (breweryFavoriteId) {
//             await db.breweryFavorite.delete({
//                 where: {
//                     id: breweryFavoriteId
//                 }
//             });
//         } else {
//             await db.breweryFavorite.create({
//                 data: {
//                     breweryId,
//                     userId: user?.id!
//                 }
//             });
//         }
//         revalidatePath(pathname);
//         return {
//             result: breweryFavoriteId ? false : true,
//             message: breweryFavoriteId ? "Removed from Faves" : "Added to Faves"
//         };
//     } catch (error) {
//         return renderError(error);
//     }
// };

// export const updateBreweryStatus = async (id: string, status: Status) => {
//     const user = await checkAuth(true);

//     if (!user)
//         return {
//             data: null,
//             error: getErrorMessage("Unauthorized")
//         };

//     try {
//         await db.brewery.update({
//             where: { id },
//             data: {
//                 status
//             }
//         });

//         revalidatePath(`/breweries/${id}`);

//         return {
//             error: null
//         };
//     } catch (err) {
//         return {
//             error: getErrorMessage(err)
//         };
//     }
// };
