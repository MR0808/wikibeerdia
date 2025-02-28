"use client";

import { useEffect, useState } from "react";
import { assistant } from "@/app/fonts";
import { useInfiniteQuery } from "@tanstack/react-query";

import { BreweriesTypesContainerProps } from "@/types/breweries";
import { useBreweriesByTypesTotal } from "@/hooks/useBreweriesByTypesTotal";
import InfiniteScroll from "@/components/global/InfiniteScroll";
import BreweriesListSkeleton from "../BreweriesListSkeleton";
import BreweriesGridSkeleton from "../BreweriesGridSkeleton";
import { getBreweriesByType } from "@/actions/breweries";
import BreweriesGridView from "../BreweriesGridView";
import BreweriesListView from "../BreweriesListView";
import { Skeleton } from "@/components/ui/skeleton";
import BreweriesTypesFilter from "./BreweriesTypesFilter";
import BreweriesTypesViewToggle from "./BreweriesTypesViewToggle";

const BreweriesTypesContainer = ({
    breweryTypes,
    initialTotal
}: BreweriesTypesContainerProps) => {
    const [slug, setSlug] = useState(breweryTypes[0].slug);
    const [view, setView] = useState("grid");

    const { data: total = 0 } = useBreweriesByTypesTotal(slug);

    const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 12));

    useEffect(() => {
        setTotalPages(Math.ceil(total / 12));
    }, [total]);

    const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["breweriesByType", slug],
            queryFn: ({ pageParam }) =>
                getBreweriesByType({
                    slug,
                    page: pageParam
                }),

            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages) => {
                const nextPage: number | undefined =
                    allPages?.length === totalPages
                        ? undefined
                        : allPages.length;

                return nextPage;
            }
        });

    const pages = data?.pages.flat() || [];

    return (
        <div className="flex flex-col items-center justify-center">
            <BreweriesTypesFilter
                breweryTypes={breweryTypes}
                setSlug={setSlug}
                slug={slug}
            />
            {isLoading ? (
                <>
                    <div className="container flex flex-row justify-between py-10">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="size-9 rounded-4xl" />
                    </div>
                    <div
                        className={`${assistant.className} flex flex-col space-y-5 pt-5 md:container md:mx-auto`}
                    >
                        {view === "list" ? (
                            <BreweriesListSkeleton />
                        ) : (
                            <BreweriesGridSkeleton grids={3} />
                        )}
                    </div>
                </>
            ) : !data || data.pages.length === 0 ? (
                <div
                    className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto md:w-[1000px]`}
                >
                    <div className="text-2xl font-semibold">
                        No beers found that match your search
                    </div>
                </div>
            ) : (
                <>
                    <BreweriesTypesViewToggle
                        view={view}
                        total={total}
                        setView={setView}
                    />
                    <InfiniteScroll
                        typeLoading="beers"
                        isLoadingIntial={isLoading}
                        isLoadingMore={isFetchingNextPage}
                        hasNoResults={pages.length === 0}
                        loadMore={() => hasNextPage && fetchNextPage()}
                    >
                        <div className="container flex flex-col gap-4">
                            {view === "list" ? (
                                <BreweriesListView breweries={pages} />
                            ) : (
                                <BreweriesGridView
                                    breweries={pages}
                                    grids={3}
                                />
                            )}
                        </div>
                    </InfiniteScroll>
                </>
            )}
        </div>
    );
};
export default BreweriesTypesContainer;
