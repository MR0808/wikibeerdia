"use server";

import db from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { SearchFilter } from "@/types/search";
import { sortResults } from "@/utils/sortResults";

export const getSearchResults = async ({
    sort,
    page,
    pageSize,
    query,
    type,
    country,
    rating
}: SearchFilter) => {
    const convertCommaListToArray = (list: string) => {
        return list.split(",").map((item) => item.trim());
    };

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const user = await checkAuth();

    let userId = user ? user.id : "";

    let beerWhere: any = { status: "APPROVED" };
    let breweryWhere: any = { status: "APPROVED" };

    if (query) {
        const searchQuery = query.split(" ").join(" & ");
        beerWhere = {
            ...beerWhere,
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
        breweryWhere = {
            ...breweryWhere,
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
        beerWhere = {
            ...beerWhere,
            brewery: { country: { name: { in: countriesSearch } } }
        };
        breweryWhere = {
            ...breweryWhere,
            country: { name: { in: countriesSearch } }
        };
    }

    if (rating != null && rating >= 0) {
        beerWhere = { ...beerWhere, averageRating: { gte: rating } };
        breweryWhere = {
            ...breweryWhere,
            averageRating: { gte: rating }
        };
    }

    try {
        const beers =
            type === "all" || type === "beers"
                ? await db.beer.findMany({
                      where: beerWhere,
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
                                  parentStyle: {
                                      select: { slug: true, name: true }
                                  }
                              }
                          },
                          brewery: {
                              select: {
                                  id: true,
                                  name: true,
                                  region: true,
                                  country: { select: { id: true, name: true } },
                                  slug: true
                              }
                          }
                      }
                  })
                : [];

        const breweries =
            type === "all" || type === "breweries"
                ? await db.brewery.findMany({
                      where: breweryWhere,
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
                : [];

        // Merge and sort results alphabetically by name
        const mergedResults = [
            ...beers.map((b) => ({
                type: "beer",
                id: b.id,
                slug: b.slug,
                name: b.name,
                parentStyleSlug: b.style?.parentStyle.slug,
                styleSlug: b.style?.slug,
                style: b.style?.name,
                favouritesId:
                    b.beerFavourites && b.beerFavourites.length > 0
                        ? b.beerFavourites[0].id
                        : "",
                image: b.images[0].image,
                available: b.available,
                brewerySlug: b.brewery.slug,
                breweryName: b.brewery.name,
                region: b.brewery.region,
                country: b.brewery.country.name,
                countryId: b.brewery.country.id,
                averageRating: b.averageRating.toString(),
                abv: b.abv.toString(),
                ibu: b.ibu,
                yearCreated: b.yearCreated,
                reviewsLength: b.beerReviews.length,
                createdAt: b.createdAt
            })),
            ...breweries.map((b) => ({
                type: "brewery",
                id: b.id,
                slug: b.slug,
                name: b.name,
                breweryTypeName: b.breweryType.name,
                breweryTypeSlug: b.breweryType.slug,
                breweryTypeColour: b.breweryType.colour,
                favouritesId:
                    b.breweryFavourites && b.breweryFavourites.length > 0
                        ? b.breweryFavourites[0].id
                        : "",
                logoUrl: b.logoUrl,
                region: b.region,
                country: b.country.name,
                countryId: b.country.id,
                beerCount: b._count.beers,
                averageRating: b.averageRating.toString(),
                reviewsLength: b.breweryReviews.length,
                createdAt: b.createdAt
            }))
        ];

        const countriesList = await db.country.findMany({
            where: {
                breweries: {
                    some: {}
                }
            },
            orderBy: { name: "asc" }
        });

        let countries = countriesList.map((country) => {
            return { id: country.id, name: country.name, count: 0 };
        });

        const sortedResults = sortResults(mergedResults, sort);

        for (const result of sortedResults) {
            const itemCountry = countries.find(
                (itemCountry) => itemCountry.id === result.countryId
            );
            if (itemCountry) itemCountry.count += 1;
        }

        // Apply pagination
        const paginatedResults = sortedResults.slice(skip, skip + take);

        return {
            results: paginatedResults,
            total: sortedResults.length,
            countries,
            error: null
        };
    } catch (error) {
        // console.error("Server Action Error:", error);
        // if (error instanceof Error) {
        //     console.error(error.stack); // Stack trace with line numbers
        // }
        return {
            results: null,
            total: null,
            countries: null,
            error: `Something went wrong while searching - ${error}`
        };
    }
};

// export const getSearchResults = async ({
//     sort,
//     page,
//     pageSize,
//     query,
//     type
// }: SearchFilter) => {
//     const validation = SearchSchema.safeParse({
//         query,
//         page,
//         pageSize,
//         type
//     });

//     if (!validation.success) {
//         return { error: "Invalid search parameters" };
//     }

//     const skip = (page - 1) * pageSize;
//     const take = pageSize;

//     const user = await checkAuth();

//     let userId = user ? user.id : "";

//     try {
//         const [beers, breweries] = await db.$transaction([
//             db.beer.findMany({
//                 where: {
//                     OR: [
//                         { name: { contains: query, mode: "insensitive" } },
//                         {
//                             description: {
//                                 contains: query,
//                                 mode: "insensitive"
//                             }
//                         },
//                         { headline: { contains: query, mode: "insensitive" } }
//                     ]
//                 },
//                 include: {
//                     images: { select: { id: true, image: true } },
//                     beerReviews: { select: { id: true } },
//                     beerFavourites: userId
//                         ? { where: { userId }, select: { id: true } }
//                         : false,
//                     style: {
//                         select: {
//                             id: true,
//                             name: true,
//                             slug: true,
//                             parentStyle: { select: { slug: true, name: true } }
//                         }
//                     },
//                     brewery: {
//                         select: {
//                             id: true,
//                             name: true,
//                             region: true,
//                             country: { select: { name: true } },
//                             slug: true
//                         }
//                     }
//                 }
//             }),
//             db.brewery.findMany({
//                 where: {
//                     OR: [
//                         { name: { contains: query, mode: "insensitive" } },
//                         {
//                             description: {
//                                 contains: query,
//                                 mode: "insensitive"
//                             }
//                         },
//                         { headline: { contains: query, mode: "insensitive" } }
//                     ]
//                 },
//                 include: {
//                     _count: { select: { beers: true } },
//                     breweryType: {
//                         select: {
//                             id: true,
//                             name: true,
//                             colour: true,
//                             slug: true
//                         }
//                     },
//                     country: { select: { id: true, name: true } },
//                     breweryReviews: { select: { id: true } },
//                     breweryFavourites: userId
//                         ? { where: { userId }, select: { id: true } }
//                         : false
//                 }
//             })
//         ]);

//         // Merge and sort results alphabetically by name
//         const mergedResults = [
//             ...beers.map((b) => ({
//                 type: "beer",
//                 id: b.id,
//                 slug: b.slug,
//                 name: b.name,
//                 parentStyleSlug: b.style?.parentStyle.slug,
//                 styleSlug: b.style?.slug,
//                 style: b.style?.name,
//                 favouritesId: b.beerFavourites[0]?.id,
//                 image: b.images[0].image,
//                 available: b.available,
//                 brewerySlug: b.brewery.slug,
//                 breweryName: b.brewery.name,
//                 region: b.brewery.region,
//                 country: b.brewery.country.name,
//                 averageRating: b.averageRating.toString(),
//                 abv: b.abv.toString(),
//                 ibu: b.ibu,
//                 yearCreated: b.yearCreated,
//                 reviewsLength: b.beerReviews.length
//             })),
//             ...breweries.map((b) => ({
//                 type: "brewery",
//                 id: b.id,
//                 slug: b.slug,
//                 name: b.name,
//                 breweryTypeName: b.breweryType.name,
//                 breweryTypeSlug: b.breweryType.slug,
//                 breweryTypeColour: b.breweryType.colour,
//                 favouritesId: b.breweryFavourites[0]?.id,
//                 logoUrl: b.logoUrl,
//                 region: b.region,
//                 country: b.country.name,
//                 beerCount: b._count.beers,
//                 averageRating: b.averageRating.toString(),
//                 reviewsLength: b.breweryReviews.length
//             }))
//         ];

//         mergedResults.sort((a, b) => a.name.localeCompare(b.name));

//         // Apply pagination
//         const paginatedResults = mergedResults.slice(skip, skip + take);

//         return {
//             results: paginatedResults,
//             total: mergedResults.length,
//             error: null
//         };
//     } catch (error) {
//         return {
//             results: null,
//             total: null,
//             error: `Something went wrong while searching - ${error}`
//         };
//     }
// };
