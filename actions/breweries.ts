"use server";

import * as z from "zod";
import {
    Brewery,
    type Brewery as BreweryType,
    Status,
    BreweryReview
} from "@prisma/client";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import GithubSlugger from "github-slugger";

import db from "@/lib/db";
import { checkAuth, currentUser } from "@/lib/auth";
import { BrewerySchemaCreate, BreweryEditSchema } from "@/schemas/brewery";
import { GetBreweriesSchema } from "@/types/admin";
import { ReviewSchema, ReviewSchemaCreate } from "@/schemas/reviews";
import { getErrorMessage, renderError } from "@/lib/handleError";
import { ImagesUpload } from "@/types/global";
import { deleteImage } from "@/utils/supabase";
import { filterColumn } from "@/lib/filterColumn";
import {
    Filters,
    BreweryPageFilterSearch,
    BreweryAZPageSearch
} from "@/types/breweries";
import { error } from "console";

const slugger = new GithubSlugger();

export const getBreweries = async () => {
    const data = await db.brewery.findMany({
        where: {
            status: "APPROVED"
        },
        select: { name: true, id: true, slug: true },
        orderBy: { name: "asc" }
    });
    return { data };
};

export const getBreweriesSearch = async (input: GetBreweriesSchema) => {
    noStore();
    const { page, per_page, sort, name, status, operator, from, to } = input;

    try {
        const offset = (page - 1) * per_page;
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "name",
            "asc"
        ]) as [keyof Brewery | undefined, "asc" | "desc" | undefined];

        const fromDay = from ? format(new Date(from), "yyyy-MM-dd") : undefined;
        const toDay = to ? format(new Date(to), "yyyy-MM-dd") : undefined;

        let whereFilter = [];

        name &&
            whereFilter.push(
                filterColumn({
                    column: "name",
                    value: name
                })
            );

        status &&
            whereFilter.push(
                filterColumn({
                    column: "status",
                    value: status,
                    isSelectable: true
                })
            );

        fromDay && whereFilter.push({ createdAt: { gte: fromDay } });

        toDay && whereFilter.push({ createdAt: { lte: toDay } });

        let usedFilter;

        !operator || operator === "and"
            ? (usedFilter = { AND: [...whereFilter] })
            : (usedFilter = { OR: [...whereFilter] });

        const orderBy = [{ [`${column}`]: `${order}` }];

        const data = await db.brewery.findMany({
            where: usedFilter,
            skip: offset,
            take: per_page,
            orderBy
        });

        const total = await db.brewery.count({ where: usedFilter });

        const pageCount = Math.ceil(total / per_page);

        const updatedData = data.map((item) => ({
            ...item,
            averageRating: item.averageRating.toString()
        }));

        return { data: updatedData, pageCount };
    } catch (err) {
        return { data: [], pageCount: 0 };
    }
};

export const updateBreweryStatusAdmin = async (input: {
    ids: string[];
    status?: BreweryType["status"];
}) => {
    noStore();
    const user = await checkAuth(true);

    if (!user)
        return {
            data: null,
            error: getErrorMessage("Unauthorized")
        };

    try {
        await db.brewery.updateMany({
            where: { id: { in: input.ids } },
            data: { status: input.status }
        });

        revalidatePath("/admin/breweries");

        return {
            data: null,
            error: null
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err)
        };
    }
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
            latitude,
            longitude,
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

        let slug = slugger.slug(name);
        let slugExists = true;

        while (slugExists) {
            const checkSlug = await db.brewery.findUnique({ where: { slug } });
            if (!checkSlug) {
                slugExists = false;
                break;
            } else {
                slug = slugger.slug(name);
            }
        }

        data = await db.brewery.create({
            data: {
                name,
                slug,
                address1,
                address2,
                formattedAddress,
                latitude,
                longitude,
                city,
                region,
                postalCode,
                countryId: countryId.id,
                description,
                headline,
                breweryTypeId: breweryType,
                website: website || "",
                logoUrl,
                userId: user.id,
                averageRating: 0
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

    redirect(`/breweries/${data.slug}`);
};

export const updateBrewery = async (
    values: z.infer<typeof BreweryEditSchema>,
    id: string
) => {
    let data: Brewery;
    try {
        const user = await checkAuth();

        if (!user)
            return {
                data: null,
                error: getErrorMessage("Unauthorized")
            };

        const validatedFields = BreweryEditSchema.safeParse(values);

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
            website
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

        const checkBrewery = await db.brewery.findUnique({ where: { id } });

        if (!checkBrewery) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }

        let slug = checkBrewery.slug;

        if (name !== checkBrewery.name) {
            let slugExists = true;
            while (slugExists) {
                const checkSlug = await db.brewery.findUnique({
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

        data = await db.brewery.update({
            where: { id },
            data: {
                name,
                slug,
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
                website: website || ""
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

    redirect(`/breweries/${data.slug}`);
};

export const updateBreweryLogo = async (
    logoUrl: string,
    id: string,
    oldUrl: string
) => {
    try {
        const user = await checkAuth();

        if (!user)
            return {
                result: false,
                message: "Unauthorized"
            };

        const data = await db.brewery.update({
            where: { id },
            omit: { averageRating: true },
            data: {
                logoUrl
            }
        });

        if (!data) {
            return {
                data: null,
                error: getErrorMessage("Error with fields")
            };
        }
        const oldLogo = await deleteImage(oldUrl, "logos-bucket");
        if (oldLogo.error) {
            return {
                data: null,
                error: oldLogo.error.message
            };
        }

        revalidatePath(`/breweries/${data.slug}`);

        return { data, error: null };
    } catch (error) {
        const err = renderError(error);
        return { data: null, error: err.message };
    }
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

export const getBrewery = async (slug: string) => {
    let data = await db.brewery.findUnique({
        where: {
            slug
        },
        omit: { averageRating: true },
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

        const brewery = await db.brewery.findUnique({
            where: { id },
            select: { slug: true }
        });

        if (!brewery) {
            return {
                data: null,
                error: getErrorMessage("Invalid fields!")
            };
        }

        data = await db.breweryReview.create({
            data: {
                rating,
                comment,
                breweryId: id,
                userId: user.id,
                status: "APPROVED"
            }
        });

        const averageRating = await db.breweryReview.aggregate({
            _avg: {
                rating: true
            },
            where: { breweryId: id }
        });

        await db.brewery.update({
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

        revalidatePath(`/breweries/${brewery.slug}`);

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
    const beers = await db.beer.findMany({
        where: { breweryId, status: "APPROVED" },
        skip,
        take,
        select: {
            id: true,
            slug: true,
            images: true,
            name: true,
            abv: true,
            style: {
                select: {
                    name: true
                }
            }
        }
    });

    const data = beers.map((item) => ({
        ...item,
        abv: item.abv.toString()
    }));

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

    if (!user) return "";

    const breweryFavorite = await db.breweryFavorite.findFirst({
        where: {
            breweryId,
            userId: user.id
        },
        select: {
            id: true
        }
    });
    return breweryFavorite?.id || "";
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
        if (pathname !== "/breweries/map") revalidatePath(pathname);
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
        const data = await db.brewery.update({
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

// Breweries Page Functions

export const getAllBreweriesPage = async ({
    sort,
    page,
    pageSize,
    search,
    country,
    type,
    beers,
    rating
}: BreweryPageFilterSearch) => {
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
            country: { name: { in: countriesSearch } }
        };
    }
    if (type) {
        const typesSearch = convertCommaListToArray(type);
        where = { ...where, breweryType: { name: { in: typesSearch } } };
    }
    if (beers && beers.length > 0) {
        where = { ...where, beerCount: { gte: beers[0], lte: beers[1] } };
    }
    if (rating != null && rating >= 0) {
        where = { ...where, averageRating: { gte: rating } };
    }

    try {
        const offset = (pageInt - 1) * pageSizeInt;
        const data = await db.brewery.findMany({
            where,
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
            orderBy,
            skip: offset,
            take: pageSizeInt
        });

        const filtersQuery = await db.brewery.findMany({
            where,
            select: {
                id: true,
                averageRating: true,
                breweryTypeId: true,
                countryId: true,
                _count: { select: { beers: true } }
            }
        });

        const total = filtersQuery.length;

        const countriesList = await db.country.findMany({
            where: { breweries: { some: {} } },
            orderBy: { name: "asc" }
        });
        const breweryTypesList = await db.breweryType.findMany({
            where: { status: "APPROVED" },
            orderBy: { name: "asc" }
        });
        let countries = countriesList.map((country) => {
            return { id: country.id, name: country.name, count: 0 };
        });
        let breweryTypes = breweryTypesList.map((type) => {
            return { id: type.id, name: type.name, count: 0 };
        });
        for (const brewery of filtersQuery) {
            const itemCountry = countries.find(
                (itemCountry) => itemCountry.id === brewery.countryId
            );
            if (itemCountry) itemCountry.count += 1;

            const itemType = breweryTypes.find(
                (itemType) => itemType.id === brewery.breweryTypeId
            );
            if (itemType) itemType.count += 1;
        }

        const brewery = await db.brewery.findFirst({
            orderBy: {
                beers: {
                    _count: "desc"
                }
            },
            include: {
                _count: {
                    select: { beers: true }
                }
            }
        });

        const highestBeers = brewery ? brewery._count.beers : 100;

        const filters: Filters = { countries, breweryTypes };

        const pageCount = Math.ceil(total / pageSizeInt);

        const updatedData = data.map((item) => ({
            ...item,
            averageRating: item.averageRating.toString()
        }));

        return {
            data: updatedData,
            pageCount,
            total,
            filters,
            highestBeers,
            error: null
        };
    } catch (err) {
        return {
            data: null,
            pageCount: null,
            total: null,
            filters: null,
            highestBeers: null,
            error: getErrorMessage(err)
        };
    }
};

export const getBreweriesAZ = async ({
    page,
    letter = "a"
}: BreweryAZPageSearch) => {
    const user = await checkAuth();

    let id = "";

    if (user) {
        id = user.id;
    }

    try {
        const offset = page * 10;
        const data = await db.brewery.findMany({
            where: { name: { startsWith: letter, mode: "insensitive" } },
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
            orderBy: { name: "asc" },
            skip: offset,
            take: 10
        });

        const updatedData = data.map((item) => ({
            ...item,
            averageRating: item.averageRating.toString()
        }));

        return updatedData;
    } catch (err) {
        throw err;
    }
};

export const getBreweriesAZTotal = async (letter = "a") => {
    try {
        const total = await db.brewery.count({
            where: { name: { startsWith: letter, mode: "insensitive" } }
        });
        return total;
    } catch (err) {
        throw err;
    }
};

export const getCountriesBreweries = async ({
    page,
    letter = ""
}: {
    page: number;
    letter?: string;
}) => {
    try {
        const skip = page * 10;
        const countries = await db.country.findMany({
            where: {
                breweries: {
                    some: {
                        status: "APPROVED"
                    }
                },
                name: { startsWith: letter, mode: "insensitive" }
            },
            select: {
                id: true,
                isoCode: true,
                name: true,
                currency: true,
                breweries: {
                    where: {
                        status: "APPROVED"
                    },
                    omit: { averageRating: true }
                }
            },
            skip,
            take: 9
        });

        return countries;
    } catch (err) {
        throw err;
    }
};

export const getCountriesBreweriesTotal = async (letter = "") => {
    try {
        const total = await db.country.count({
            where: {
                breweries: {
                    some: {
                        status: "APPROVED"
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

export const getCountryBreweries = async (isoCode: string) => {
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
                        status: "APPROVED"
                    }
                }
            },
            include: {
                breweries: {
                    include: {
                        _count: {
                            select: { beers: true }
                        },
                        images: { select: { id: true, image: true } },
                        breweryType: {
                            select: { id: true, name: true, colour: true }
                        },
                        country: { select: { id: true, name: true } },
                        breweryReviews: { select: { id: true } },
                        breweryFavourites: {
                            where: { userId: id },
                            select: { id: true }
                        }
                    },
                    orderBy: { name: "asc" }
                }
            }
        });

        const breweries = data?.breweries.map((item) => ({
            ...item,
            averageRating: item.averageRating.toString()
        }));

        const country = { id: data?.id, name: data?.name, breweries };

        return country;
    } catch (err) {
        throw err;
    }
};
