"use server";

import * as z from "zod";
import { Beer, Status, BeerReview } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import GithubSlugger, { slug } from "github-slugger";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { BeerSchemaCreate, BeerEditSchema } from "@/schemas/beer";
import { ReviewSchema, ReviewSchemaCreate } from "@/schemas/reviews";
import { getErrorMessage, renderError } from "@/lib/handleError";
import { ImagesUpload } from "@/types/global";

const slugger = new GithubSlugger();

export const getBeers = async () => {
    const data = await db.beer.findMany({
        where: {
            status: "APPROVED"
        },
        select: { name: true, id: true, slug: true },
        orderBy: { name: "asc" }
    });
    return { data };
};

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
            style,
            brewery,
            images
        } = validatedFields.data;

        const yearCreated = year ? parseInt(year) : null;

        let slug = slugger.slug(name);
        let slugExists = true;

        while (slugExists) {
            const checkSlug = await db.beer.findUnique({ where: { slug } });
            if (!checkSlug) {
                slugExists = false;
                break;
            } else {
                slug = slugger.slug(name);
            }
        }

        data = await db.beer.create({
            data: {
                name,
                slug,
                description,
                headline,
                abv: String(abv),
                ibu: String(ibu),
                yearCreated,
                styleId: style,
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

    redirect(`/beer/${data.slug}`);
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

export const updateBeer = async (
    values: z.infer<typeof BeerEditSchema>,
    id: string
) => {
    let data: Beer;
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const validatedFields = BeerEditSchema.safeParse(values);

        if (!validatedFields.success) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        const {
            name,
            description,
            headline,
            abv,
            ibu,
            year,
            available,
            style,
            brewery
        } = validatedFields.data;

        const yearCreated = year ? parseInt(year) : null;

        const checkBeer = await db.beer.findUnique({ where: { id } });

        if (!checkBeer) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        let slug = checkBeer.slug;

        if (name !== checkBeer.name) {
            let slugExists = true;
            while (slugExists) {
                const checkSlug = await db.beer.findUnique({
                    where: { slug }
                });
                if (!checkSlug) {
                    slugExists = false;
                    break;
                } else {
                    slug = slugger.slug(name);
                }
            }
        }

        data = await db.beer.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                headline,
                abv: String(abv),
                ibu: String(ibu),
                yearCreated,
                available,
                styleId: style,
                breweryId: brewery
            }
        });

        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }
    } catch (error) {
        const err = renderError(error);
        return { data: null, error: err.message };
    }

    redirect(`/beers/${data.slug}`);
};

export const getBeer = async (slug: string) => {
    const data = await db.beer.findUnique({
        where: {
            slug
        },
        include: {
            beerReviews: {
                select: {
                    rating: true
                }
            },
            style: {
                select: {
                    id: true,
                    name: true,
                    parentStyle: { select: { id: true, name: true } }
                }
            },
            images: { orderBy: { order: "asc" } },
            user: { select: { id: true, displayName: true } },
            brewery: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    logoUrl: true,
                    country: { select: { name: true } },
                    _count: {
                        select: {
                            beers: {
                                where: { status: "APPROVED" }
                            }
                        }
                    }
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

export const createBeerReview = async (
    values: z.infer<typeof ReviewSchema>
) => {
    let data: BeerReview;
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

        const beer = await db.beer.findUnique({
            where: { id },
            select: { slug: true }
        });

        if (!beer) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        data = await db.beerReview.create({
            data: {
                rating,
                comment,
                beerId: id,
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

        revalidatePath(`/beers/${beer.slug}`);

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

export const totalNumberOfReviews = async (beerId: string) => {
    const data = db.beerReview.count({
        where: { beerId, status: "APPROVED" }
    });
    return data;
};

export const fetchBeerFavoriteId = async ({ beerId }: { beerId: string }) => {
    const user = await checkAuth();

    if (!user) return null;

    const beerFavorite = await db.beerFavorite.findFirst({
        where: {
            beerId,
            userId: user.id
        },
        select: {
            id: true
        }
    });
    return beerFavorite?.id || null;
};

export const toggleBeerFavoriteAction = async (
    beerId: string,
    beerFavoriteId: string | null,
    pathname: string
) => {
    const user = await currentUser();

    try {
        if (beerFavoriteId) {
            await db.beerFavorite.delete({
                where: {
                    id: beerFavoriteId
                }
            });
        } else {
            await db.beerFavorite.create({
                data: {
                    beerId,
                    userId: user?.id!
                }
            });
        }
        revalidatePath(pathname);
        return {
            result: beerFavoriteId ? false : true,
            message: beerFavoriteId ? "Removed from Faves" : "Added to Faves"
        };
    } catch (error) {
        return renderError(error);
    }
};

export const updateBeerStatus = async (id: string, status: Status) => {
    const user = await checkAuth(true);

    if (!user)
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };

    try {
        const data = await db.beer.update({
            where: { id },
            data: {
                status
            }
        });

        revalidatePath(`/breweries/${data.slug}`);

        return {
            error: null
        };
    } catch (err) {
        return {
            error: getErrorMessage(err)
        };
    }
};
