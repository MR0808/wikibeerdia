"use client";

import { assistant } from "@/app/fonts";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

import InfiniteScroll from "@/components/global/InfiniteScroll";
import { getCountriesBreweries } from "@/actions/breweries";

const BreweriesCountryContainer = ({ total }: { total: number }) => {
    const totalPages = Math.ceil(total / 10);
    const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["breweriesCountry"],
            queryFn: ({ pageParam }) =>
                getCountriesBreweries({
                    page: pageParam
                }),

            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages) => {
                // const nextPage: number | undefined = lastPage?.length
                //     ? allPages?.length
                //     : undefined;

                const nextPage: number | undefined =
                    allPages?.length === totalPages
                        ? undefined
                        : allPages.length;

                return nextPage;
            }
        });

    if (isLoading) {
        return (
            <div
                className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto md:w-[1000px]`}
            >
                Insert Skeleton Here
            </div>
        );
    }

    if (!data || data.pages.length === 0) {
        return (
            <div
                className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto md:w-[1000px]`}
            >
                <div className="text-2xl font-semibold">
                    No countries found with breweries currently
                </div>
            </div>
        );
    }

    const pages = data.pages.flat();

    return (
        <div
            className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto`}
        >
            <InfiniteScroll
                isLoadingIntial={isLoading}
                isLoadingMore={isFetchingNextPage}
                loadMore={() => hasNextPage && fetchNextPage()}
            >
                <div className="mx-8 mt-10 grid grid-cols-3 justify-items-center gap-8">
                    {pages.map((country) => {
                        return (
                            <div
                                key={country.id}
                                className="group relative h-[340px] w-[520px] overflow-hidden rounded-4xl"
                            >
                                <div className="absolute inset-0 scale-100">
                                    <Image
                                        src={`/images/countries/${country.isoCode}.jpg`}
                                        width={520}
                                        height={400}
                                        alt={country.name}
                                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                                        className="h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-black/30"></div>

                                <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/40 text-white">
                                    <Link
                                        href={`/breweries/country/${country.isoCode}`}
                                        className="mb-4 text-3xl font-bold"
                                    >
                                        {country.name}
                                    </Link>
                                    <div className="rounded-4xl border border-white px-5 py-1 text-lg font-medium">{`${country.breweries.length} Brewer${country.breweries.length === 1 ? "y" : "ies"}`}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default BreweriesCountryContainer;
