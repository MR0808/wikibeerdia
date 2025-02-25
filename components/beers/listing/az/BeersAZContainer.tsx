"use client";

import { assistant } from "@/app/fonts";
import { useInfiniteQuery } from "@tanstack/react-query";

import InfiniteScroll from "@/components/global/InfiniteScroll";
import { BeersAZContainerProps } from "@/types/beers";
import BeersAZAlphabet from "./BeersAZAlphabet";
import BeersListSkeleton from "../BeersListSkeleton";
import { getBeersAZ } from "@/actions/beers";
import BeersListBeer from "../BeersListBeer";

const BeersAZContainer = ({ total = 0, letter }: BeersAZContainerProps) => {
    const totalPages = Math.ceil(total / 10);
    const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["breweriesAZ"],
            queryFn: ({ pageParam }) =>
                getBeersAZ({
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
                <BeersListSkeleton />
            </div>
        );
    }

    if (!data || data.pages.length === 0) {
        return (
            <div
                className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto md:w-[1000px]`}
            >
                <div className="text-2xl font-semibold">
                    No beers found that match your search
                </div>
            </div>
        );
    }

    const pages = data.pages.flat();

    return (
        <div
            className={`${assistant.className} flex flex-col space-y-5 pt-5 md:mx-auto md:w-[1000px]`}
        >
            <BeersAZAlphabet letter={letter} />
            <div className="flex flex-row justify-between">
                <div className="text-xl font-semibold">{`${total} result${total === 1 ? "" : "s"}`}</div>
            </div>
            <InfiniteScroll
                typeLoading="beers"
                isLoadingIntial={isLoading}
                isLoadingMore={isFetchingNextPage}
                hasNoResults={pages.length === 0}
                loadMore={() => hasNextPage && fetchNextPage()}
            >
                <div className="flex flex-col gap-4">
                    {pages.map((beer) => {
                        return <BeersListBeer beer={beer} key={beer.id} />;
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default BeersAZContainer;
