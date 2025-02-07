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
    params,
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
        setSort,
        setPage,
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
                    params={params}
                    filters={filters}
                    setCountry={setCountry}
                    setType={setType}
                    setSearch={setSearch}
                    setBeers={setBeers}
                    nuqsCountry={country}
                    type={type}
                    search={search}
                    beers={beers}
                    isPending={isPending}
                    highestBeers={highestBeers}
                />
            </div>
            <div className="flex w-full flex-col space-y-5 pb-10 md:w-3/4">
                <Suspense>
                    <BreweriesListing
                        breweries={breweries}
                        total={total || 0}
                        params={params}
                        setCountry={setCountry}
                        setType={setType}
                        setSearch={setSearch}
                        setPageSize={setPageSize}
                        setPage={setPage}
                        setSort={setSort}
                        setBeers={setBeers}
                        country={country}
                        type={type}
                        search={search}
                        view={view}
                        beers={beers}
                        isPending={isPending}
                    />
                </Suspense>
            </div>
        </div>
    );
};
export default BreweriesContainer;
