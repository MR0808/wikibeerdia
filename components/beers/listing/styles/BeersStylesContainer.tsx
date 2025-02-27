"use client";

import { useEffect, useState } from "react";
import { assistant } from "@/app/fonts";
import { useInfiniteQuery } from "@tanstack/react-query";

import { BeersStylesContainerProps } from "@/types/beers";
import { useBeerStyles } from "@/hooks/useBeerStyles";
import { useBeerByStylesTotal } from "@/hooks/useBeerByStylesTotal";
import InfiniteScroll from "@/components/global/InfiniteScroll";
import BeersListSkeleton from "../BeersListSkeleton";
import BeersGridSkeleton from "../BeersGridSkeleton";
import { getBeersByStyles } from "@/actions/beers";
import BeersGridView from "../BeersGridView";
import BeersListView from "../BeersListView";
import { Skeleton } from "@/components/ui/skeleton";
import BeersStylesFilter from "./BeersStylesFilter";
import BeerStylesViewToggle from "./BeerStylesViewToggle";

const BeersStylesContainer = ({
    parentStyles,
    initialTotal
}: BeersStylesContainerProps) => {
    const [parentSlug, setParentSlug] = useState(parentStyles[0].slug);
    const [styleSlug, setStyleSlug] = useState<string>("all");
    const [view, setView] = useState("grid");

    const { data: styles = [], isLoading: stylesLoading } =
        useBeerStyles(parentSlug);

    const { data: total = 0 } = useBeerByStylesTotal(styleSlug, parentSlug);

    const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 12));

    useEffect(() => {
        setTotalPages(Math.ceil(total / 12));
    }, [total]);

    const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["breweriesByStyle", styleSlug, parentSlug],
            queryFn: ({ pageParam }) =>
                getBeersByStyles({
                    slug: styleSlug,
                    parentSlug,
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
            <BeersStylesFilter
                parentStyles={parentStyles}
                setParentSlug={setParentSlug}
                setStyleSlug={setStyleSlug}
                parentSlug={parentSlug}
                stylesLoading={stylesLoading}
                styles={styles}
                styleSlug={styleSlug}
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
                            <BeersListSkeleton />
                        ) : (
                            <BeersGridSkeleton grids={3} />
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
                    <BeerStylesViewToggle
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
                                <BeersListView beers={pages} />
                            ) : (
                                <BeersGridView beers={pages} grids={3} />
                            )}
                        </div>
                    </InfiniteScroll>
                </>
            )}
        </div>
    );
};
export default BeersStylesContainer;
