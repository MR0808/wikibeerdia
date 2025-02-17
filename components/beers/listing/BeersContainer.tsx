"use client";

import { assistant } from "@/app/fonts";
import { Suspense, useEffect } from "react";

// import BeersListing from "@/components/beers/listing/BeersListing";
import BeersFilter from "@/components/beers/listing/BeersFilter";
import { BeersContainerProps } from "@/types/beers";
import { useBeersParams } from "@/hooks/useBeersParams";
import useViewStore from "@/hooks/useViewType";

const BeersContainer = ({
    beers,
    total = 0,
    params,
    filters
}: BeersContainerProps) => {
    const {
        view,
        setView,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        setPageSize,
        search,
        setSearch,
        country,
        setCountry,
        rating,
        setRating,
        style,
        setStyle,
        brewery,
        setBrewery,
        abv,
        setAbv,
        ibu,
        setIbu,
        yearCreated,
        setYearCreated,
        available,
        setAvailable,
        isPending
    } = useBeersParams();
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
                <BeersFilter
                    params={params}
                    filters={filters}
                    country={country}
                    setCountry={setCountry}
                    search={search}
                    setSearch={setSearch}
                    style={style}
                    setStyle={setStyle}
                    brewery={brewery}
                    setBrewery={setBrewery}
                    abv={abv}
                    setAbv={setAbv}
                    ibu={ibu}
                    setIbu={setIbu}
                    yearCreated={yearCreated}
                    setYearCreated={setYearCreated}
                    available={available}
                    setAvailable={setAvailable}
                    rating={rating}
                    setRating={setRating}
                    isPending={isPending}
                />
            </div>
            <div className="flex w-full flex-col space-y-5 pb-10 md:w-3/4">
                <Suspense>
                    {/* <BreweriesListing
                        breweries={breweries}
                        total={total || 0}
                        params={params}
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
                        setPageSize={setPageSize}
                        setPage={setPage}
                        setSort={setSort}
                        view={view}
                        isPending={isPending}
                    /> */}
                </Suspense>
            </div>
        </div>
    );
};
export default BeersContainer;
