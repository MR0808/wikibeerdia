"use client";

import { assistant } from "@/app/fonts";
import { useEffect } from "react";

import { useSearchParams } from "@/hooks/useSearchParams";
import useViewStore from "@/hooks/useViewType";
import { SearchContainerProps } from "@/types/search";
import SearchListing from "./SearchListing";
import SearchFilter from "./SearchFilter";

const SearchContainer = ({ results }: SearchContainerProps) => {
    const {
        query,
        setQuery,
        type,
        setType,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        setPageSize,
        view,
        isPending
    } = useSearchParams();
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
                <SearchFilter
                    query={query}
                    setQuery={setQuery}
                    type={type}
                    setType={setType}
                    isPending={isPending}
                />
            </div>
            <div className="flex w-full flex-col space-y-5 pb-10 md:w-3/4">
                <SearchListing
                    results={results}
                    query={query}
                    setQuery={setQuery}
                    type={type}
                    setType={setType}
                    view={view}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    sort={sort}
                    setSort={setSort}
                    isPending={isPending}
                />
            </div>
        </div>
    );
};
export default SearchContainer;
