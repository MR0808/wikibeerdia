"use client";

import { assistant } from "@/app/fonts";
import { useInfiniteQuery } from "@tanstack/react-query";

import InfiniteScroll from "@/components/global/InfiniteScroll";
import { BreweriesAZContainerProps } from "@/types/breweries";
import BreweriesAZAlphabet from "./BreweriesAZAlphabet";
import BreweriesListSkeleton from "../BreweriesListSkeleton";
import { getBreweriesAZ } from "@/actions/breweries";
import BreweriesListBrewery from "../BreweriesListBrewery";

const BreweriesAZContainer = ({
    total = 0,
    letter
}: BreweriesAZContainerProps) => {
    const totalPages = Math.ceil(total / 10);
    const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["breweriesAZ"],
            queryFn: ({ pageParam }) =>
                getBreweriesAZ({
                    page: pageParam,
                    letter
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
                <BreweriesListSkeleton />
            </div>
        );
    }

    if (!data || data.pages.length === 0) {
        return (
            <div
                className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto md:w-[1000px]`}
            >
                <div className="text-2xl font-semibold">
                    No breweries found that match your search
                </div>
            </div>
        );
    }

    const pages = data.pages.flat();

    return (
        <div
            className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto md:w-[1000px]`}
        >
            <BreweriesAZAlphabet letter={letter} />
            <div className="flex flex-row justify-between">
                <div className="text-xl font-semibold">{`${total} result${total === 1 ? "" : "s"}`}</div>
            </div>
            <InfiniteScroll
                isLoadingIntial={isLoading}
                isLoadingMore={isFetchingNextPage}
                loadMore={() => hasNextPage && fetchNextPage()}
            >
                <div className="flex flex-col gap-4">
                    {pages.map((brewery) => {
                        return (
                            <BreweriesListBrewery
                                brewery={brewery}
                                key={brewery.id}
                            />
                        );
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default BreweriesAZContainer;
