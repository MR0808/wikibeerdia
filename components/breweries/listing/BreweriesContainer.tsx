"use client";

import { assistant } from "@/app/fonts";
import { useEffect } from "react";

import BreweriesListing from "@/components/breweries/listing/BreweriesListing";
import BreweriesFilter from "@/components/breweries/listing/BreweriesFilter";
import { BreweriesContainerProps } from "@/types/breweries";
import { useBreweriesParams } from "@/hooks/useBreweriesParams";

const BreweriesContainer = ({
    breweries,
    total = 0,
    params,
    filters
}: BreweriesContainerProps) => {
    const {
        search,
        setSearch,
        country,
        setCountry,
        type,
        setType,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        setPageSize,
        isPending
    } = useBreweriesParams();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [isPending]);

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
                    nuqsCountry={country}
                    type={type}
                    search={search}
                    isPending={isPending}
                />
            </div>
            <div className="flex w-full flex-col space-y-5 pb-10 md:w-3/4">
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
                    country={country}
                    type={type}
                    search={search}
                    pageSize={pageSize}
                    page={page}
                    sort={sort}
                    isPending={isPending}
                />
            </div>
        </div>
    );
};
export default BreweriesContainer;
