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
import {
    BeerPageFilterSearch,
    Filters,
    BeerAZPageSearch,
    BeerStylePageSearch
} from "@/types/beers";

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
                abv,
                ibu,
                yearCreated,
                styleId: style,
                breweryId: brewery,
                available,
                userId: user.id,
                averageRating: "0"
            }
        });
        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        await db.brewery.update({
            where: { id: data.breweryId },
            data: {
                beerCount: { increment: 1 }
            }
        });

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
                abv,
                ibu,
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
        omit: { averageRating: true },
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
                    slug: true,
                    parentStyle: {
                        select: { id: true, name: true, slug: true }
                    }
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

        const averageRating = await db.beerReview.aggregate({
            _avg: {
                rating: true
            },
            where: { beerId: id }
        });

        await db.beer.update({
            where: { id },
            data: { averageRating: averageRating._avg.toString() }
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
        if (pathname !== "/beers/map") revalidatePath(pathname);
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

export const getAllBeersPage = async ({
    sort,
    page,
    pageSize,
    search,
    country,
    style,
    brewery,
    abv,
    ibu,
    yearCreated,
    available,
    rating
}: BeerPageFilterSearch) => {
    const convertCommaListToArray = (list: string) => {
        return list.split(",").map((item) => item.trim());
    };

    let orderBy = {};

    const user = await checkAuth();

    let id = "";

    const pageInt = parseInt(page);
    const pageSizeInt = parseInt(pageSize);

    if (user) {
        id = user.id;
    }

    switch (sort) {
        case "az":
            orderBy = { name: "asc" };
            break;
        case "za":
            orderBy = { name: "desc" };
            break;
        case "newest":
            orderBy = { createdAt: "desc" };
            break;
        case "oldest":
            orderBy = { createdAt: "asc" };
            break;
        case "popular":
            orderBy = { averageRating: "desc" };
            break;
        default:
            orderBy = { name: "asc" };
            break;
    }
    let where: any = { status: "APPROVED" };
    if (search) {
        const searchQuery = search.split(" ").join(" & ");
        where = {
            ...where,
            OR: [
                {
                    name: {
                        search: searchQuery
                    }
                },
                {
                    headline: {
                        search: searchQuery
                    }
                },
                {
                    description: {
                        search: searchQuery
                    }
                }
            ]
        };
    }

    if (country) {
        const countriesSearch = convertCommaListToArray(country);
        where = {
            ...where,
            brewery: { country: { name: { in: countriesSearch } } }
        };
    }
    if (style) {
        const stylesSearch = convertCommaListToArray(style);
        where = {
            ...where,
            style: { slug: { in: stylesSearch }, status: "APPROVED" }
        };
    }
    if (brewery) {
        const breweriesSearch = convertCommaListToArray(brewery);
        where = {
            ...where,
            brewery: { slug: { in: breweriesSearch }, status: "APPROVED" }
        };
    }
    if (abv && abv.length > 0) {
        where = { ...where, abv: { gte: abv[0], lte: abv[1] } };
    }
    if (ibu && ibu.length > 0) {
        where = { ...where, ibu: { gte: ibu[0], lte: ibu[1] } };
    }
    if (yearCreated && yearCreated.length > 0) {
        where = {
            ...where,
            yearCreated: { gte: yearCreated[0], lte: yearCreated[1] }
        };
    }
    if (available) {
        const parseBoolean = (value: string): boolean =>
            value.toLowerCase() === "true";
        where = { ...where, available: parseBoolean(available) };
    }

    if (rating != null && rating >= 0) {
        where = { ...where, averageRating: { gte: rating } };
    }

    try {
        const offset = (pageInt - 1) * pageSizeInt;
        const data = await db.beer.findMany({
            where,
            include: {
                images: { select: { id: true, image: true } },
                beerReviews: { select: { id: true } },
                beerFavourites: {
                    where: { userId: id },
                    select: { id: true }
                },
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
            },
            orderBy,
            skip: offset,
            take: pageSizeInt
        });

        const filtersQuery = await db.beer.findMany({
            where,
            include: { brewery: true }
        });

        const maxResults = await db.beer.aggregate({
            _max: {
                abv: true,
                ibu: true,
                yearCreated: true
            },
            _min: { yearCreated: true }
        });

        const total = filtersQuery.length;

        const countriesList = await db.country.findMany({
            where: {
                breweries: {
                    some: {
                        beers: {
                            some: {}
                        }
                    }
                }
            },
            orderBy: { name: "asc" }
        });

        let countries = countriesList.map((country) => {
            return { id: country.id, name: country.name, count: 0 };
        });
        const stylesList = await db.style.findMany({
            where: {
                beers: {
                    some: {}
                }
            },
            include: { parentStyle: true },
            orderBy: [{ parentStyle: { name: "asc" } }, { name: "asc" }]
        });
        let styles = stylesList.map((style) => {
            return {
                id: style.id,
                name: style.name,
                slug: style.slug,
                parentStyleName: style.parentStyle.name
            };
        });
        for (const beer of filtersQuery) {
            const itemCountry = countries.find(
                (itemCountry) => itemCountry.id === beer.brewery.countryId
            );
            if (itemCountry) itemCountry.count += 1;
        }

        const filters: Filters = { countries, styles };

        const pageCount = Math.ceil(total / pageSizeInt);

        const updatedData = data.map((item) => ({
            ...item,
            averageRating: item.averageRating.toString(),
            abv: item.abv.toString()
        }));

        return {
            data: updatedData,
            pageCount,
            total,
            filters,
            highestAbv: maxResults._max.abv || 0,
            highestIbu: maxResults._max.ibu || 0,
            highestYear: maxResults._max.yearCreated || 0,
            lowerstYear: maxResults._min.yearCreated || 0,
            error: null
        };
    } catch (err) {
        return {
            data: null,
            pageCount: null,
            total: null,
            filters: null,
            highestAbv: null,
            highestIbu: null,
            highestYear: null,
            error: getErrorMessage(err)
        };
    }
};

export const getBreweriesNames = async (breweries: string[]) => {
    try {
        const data = await db.brewery.findMany({
            where: { status: "APPROVED", slug: { in: breweries } },
            select: { name: true, slug: true }
        });

        return { data, error: null };
    } catch (err) {
        return {
            data: null,

            error: getErrorMessage(err)
        };
    }
};

export const getStylesNames = async (styles: string[]) => {
    try {
        const stylesReturn = await db.style.findMany({
            where: { status: "APPROVED", slug: { in: styles } },
            select: {
                id: true,
                name: true,
                slug: true,
                parentStyle: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const data = stylesReturn.map((style) => ({
            id: style.id,
            name: style.name,
            slug: style.slug,
            parentStyleName: style.parentStyle.name
        }));

        return { data, error: null };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err)
        };
    }
};

export const getCountriesBeers = async ({
    page,
    letter = ""
}: {
    page: number;
    letter?: string;
}) => {
    try {
        const skip = page * 9;
        const countries = await db.country.findMany({
            where: {
                name: {
                    startsWith: letter,
                    mode: "insensitive" // Case-insensitive search
                },
                breweries: {
                    some: {
                        status: "APPROVED",
                        beers: { some: { status: "APPROVED" } }
                    }
                }
            },
            select: {
                name: true,
                id: true,
                isoCode: true,
                breweries: {
                    select: {
                        beers: {
                            select: {
                                id: true // Just selecting IDs to count beers
                            }
                        }
                    }
                }
            },
            skip,
            take: 9
        });

        const result = countries.map((country) => ({
            id: country.id,
            isoCode: country.isoCode,
            name: country.name,
            beerCount: country.breweries.reduce(
                (acc, brewery) => acc + brewery.beers.length,
                0
            )
        }));

        return result;
    } catch (err) {
        throw err;
    }
};

export const getCountriesBeersTotal = async (letter = "") => {
    try {
        const total = await db.country.count({
            where: {
                breweries: {
                    some: {
                        status: "APPROVED",
                        beers: { some: { status: "APPROVED" } }
                    }
                },
                name: { startsWith: letter, mode: "insensitive" }
            }
        });
        return total;
    } catch (err) {
        throw err;
    }
};

export const getCountryBeers = async (isoCode: string) => {
    const user = await checkAuth();

    let id = "";

    if (user) {
        id = user.id;
    }

    try {
        const data = await db.country.findFirst({
            where: {
                isoCode,
                breweries: {
                    some: {
                        status: "APPROVED",
                        beers: { some: { status: "APPROVED" } }
                    }
                }
            },
            include: {
                breweries: {
                    include: {
                        _count: {
                            select: { beers: true }
                        },
                        breweryType: {
                            select: { id: true, name: true, colour: true }
                        },
                        country: { select: { id: true, name: true } },
                        beers: {
                            include: {
                                images: { select: { id: true, image: true } },
                                style: {
                                    select: {
                                        id: true,
                                        name: true,
                                        slug: true,
                                        parentStyle: {
                                            select: { slug: true, name: true }
                                        }
                                    }
                                },
                                beerReviews: { select: { id: true } },
                                beerFavourites: {
                                    where: { userId: id },
                                    select: { id: true }
                                }
                            }
                        }
                    },
                    orderBy: { name: "asc" }
                }
            }
        });

        const breweries =
            data?.breweries.map((brewery) => ({
                id: brewery.id,
                slug: brewery.slug,
                name: brewery.name,
                region: brewery.region,
                beers: brewery.beers.map((beer) => ({
                    ...beer,
                    averageRating: beer.averageRating.toString(),
                    abv: beer.abv.toString()
                }))
            })) || [];

        const totalBeers = breweries.reduce(
            (sum, brewery) => sum + brewery.beers.length,
            0
        );

        const country = {
            id: data?.id,
            name: data?.name,
            breweries,
            totalBeers
        };
        return country;
    } catch (err) {
        throw err;
    }
};

export const getBeersAZ = async ({ page, letter = "a" }: BeerAZPageSearch) => {
    const user = await checkAuth();

    let id = "";

    if (user) {
        id = user.id;
    }

    try {
        const offset = page * 10;

        if (letter !== "number") {
            const data = await db.beer.findMany({
                where: {
                    status: "APPROVED",
                    name: { startsWith: letter, mode: "insensitive" }
                },
                include: {
                    images: { select: { id: true, image: true } },
                    beerReviews: { select: { id: true } },
                    beerFavourites: {
                        where: { userId: id },
                        select: { id: true }
                    },
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
                },
                orderBy: { name: "asc" },
                skip: offset,
                take: 10
            });
            const updatedData = data.map((item) => ({
                ...item,
                averageRating: item.averageRating.toString(),
                abv: item.abv.toString()
            }));

            return updatedData;
        } else {
            const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            const data = await db.beer.findMany({
                where: {
                    OR: numbers.map((number) => ({
                        name: {
                            startsWith: number
                        }
                    }))
                },
                include: {
                    images: { select: { id: true, image: true } },
                    beerReviews: { select: { id: true } },
                    beerFavourites: {
                        where: { userId: id },
                        select: { id: true }
                    },
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
                },
                orderBy: { name: "asc" },
                skip: offset,
                take: 10
            });
            const updatedData = data.map((item) => ({
                ...item,
                averageRating: item.averageRating.toString(),
                abv: item.abv.toString()
            }));

            return updatedData;
        }
    } catch (err) {
        throw err;
    }
};

export const getBeersAZTotal = async (letter = "a") => {
    try {
        let total = 0;
        if (letter !== "number") {
            total = await db.beer.count({
                where: {
                    status: "APPROVED",
                    name: { startsWith: letter, mode: "insensitive" }
                }
            });
        } else {
            const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            total = await db.beer.count({
                where: {
                    OR: numbers.map((number) => ({
                        name: {
                            startsWith: number
                        }
                    }))
                }
            });
        }

        return total;
    } catch (err) {
        throw err;
    }
};

export const getBeersByStyles = async ({
    page,
    slug,
    parentSlug = ""
}: BeerStylePageSearch) => {
    const user = await checkAuth();

    let id = "";

    if (user) {
        id = user.id;
    }

    try {
        const offset = page * 12;

        if (slug !== "all") {
            const data = await db.beer.findMany({
                where: { status: "APPROVED", style: { slug } },
                include: {
                    images: { select: { id: true, image: true } },
                    beerReviews: { select: { id: true } },
                    beerFavourites: {
                        where: { userId: id },
                        select: { id: true }
                    },
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
                },
                orderBy: { name: "asc" },
                skip: offset,
                take: 12
            });

            const updatedData = data.map((item) => ({
                ...item,
                averageRating: item.averageRating.toString(),
                abv: item.abv.toString()
            }));

            return updatedData;
        } else {
            const data = await db.beer.findMany({
                where: {
                    status: "APPROVED",
                    style: { parentStyle: { slug: parentSlug } }
                },
                include: {
                    images: { select: { id: true, image: true } },
                    beerReviews: { select: { id: true } },
                    beerFavourites: {
                        where: { userId: id },
                        select: { id: true }
                    },
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
                },
                orderBy: { name: "asc" },
                skip: offset,
                take: 12
            });

            const updatedData = data.map((item) => ({
                ...item,
                averageRating: item.averageRating.toString(),
                abv: item.abv.toString()
            }));

            return updatedData;
        }
    } catch (err) {
        throw err;
    }
};

export const getBeersByStylesTotal = async (slug: string, parentSlug = "") => {
    try {
        let total = 0;
        if (slug !== "all") {
            total = await db.beer.count({
                where: { status: "APPROVED", style: { slug } }
            });
        } else {
            total = await db.beer.count({
                where: {
                    status: "APPROVED",
                    style: { parentStyle: { slug: parentSlug } }
                }
            });
        }

        return total;
    } catch (err) {
        throw err;
    }
};
