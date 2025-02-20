"use client";

import { assistant } from "@/app/fonts";
import { Suspense, useEffect } from "react";

import BreweriesListing from "@/components/breweries/listing/BreweriesListing";
import BreweriesFilter from "@/components/breweries/listing/BreweriesFilter";
import { BreweriesContainerProps } from "@/types/breweries";
import { useBreweriesParams } from "@/hooks/useBreweriesParams";
import useViewStore from "@/hooks/useViewType";

const BreweriesContainer = ({
    breweries,
    total = 0,
    filters,
    highestBeers
}: BreweriesContainerProps) => {
    const {
        search,
        setSearch,
        country,
        setCountry,
        type,
        setType,
        beers,
        setBeers,
        rating,
        setRating,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        setPageSize,
        view,
        isPending
    } = useBreweriesParams();
    const { setIsLoading, isLoading } = useViewStore();

    useEffect(() => {
        window.scrollTo({ top: 0 });
        setIsLoading(false);
    }, [isLoading]);

    return (
        <div
            className={`${assistant.className} flex flex-col-reverse space-x-10 px-5 pt-10 md:container md:flex-row md:px-0 md:pt-28`}
        >
            <div className="w-full md:w-1/4">
                <BreweriesFilter
                    filters={filters}
                    country={country}
                    setCountry={setCountry}
                    type={type}
                    setType={setType}
                    search={search}
                    setSearch={setSearch}
                    beers={beers}
                    setBeers={setBeers}
                    rating={rating}
                    setRating={setRating}
                    isPending={isPending}
                    highestBeers={highestBeers}
                />
            </div>
            <div className="flex w-full flex-col space-y-5 pb-10 md:w-3/4">
                <Suspense>
                    <BreweriesListing
                        breweries={breweries}
                        total={total || 0}
                        country={country}
                        setCountry={setCountry}
                        type={type}
                        setType={setType}
                        search={search}
                        setSearch={setSearch}
                        beers={beers}
                        setBeers={setBeers}
                        rating={rating}
                        setRating={setRating}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        page={page}
                        setPage={setPage}
                        sort={sort}
                        setSort={setSort}
                        view={view}
                        isPending={isPending}
                    />
                </Suspense>
            </div>
        </div>
    );
};
export default BreweriesContainer;
