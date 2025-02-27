"use client";

import { useEffect, useState } from "react";
import { assistant } from "@/app/fonts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Menu, LayoutGrid } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { BeersStylesContainerProps } from "@/types/beers";
import { useBeerStyles } from "@/hooks/useBeerStyles";
import { useBeerByStylesTotal } from "@/hooks/useBeerByStylesTotal";
import InfiniteScroll from "@/components/global/InfiniteScroll";
import BeersListSkeleton from "../BeersListSkeleton";
import { getBeersByStyles, getBeersByStylesTotal } from "@/actions/beers";
import BeersListBeer from "../BeersListBeer";
import BeersGridBeer from "../BeersGridBeer";
import { Skeleton } from "@/components/ui/skeleton";

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

    const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 10));

    useEffect(() => {
        setTotalPages(Math.ceil(total / 10));
    }, [total]);

    const onParentChange = (slug: string) => {
        setParentSlug(slug);
        setStyleSlug("all");
    };

    const updateLayout = () => {
        if (view === "grid") {
            setView("list");
        } else {
            setView("grid");
        }
    };

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
            <div className="sxl:px-20 text-dark mx-5 mt-10 flex flex-wrap items-center justify-center border-b border-b-gray-200 px-0 py-4 font-medium md:mx-10">
                {parentStyles.map((parentStyle) => {
                    return (
                        <div key={parentStyle.id}>
                            <div
                                className={cn(
                                    "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                                    parentSlug === parentStyle.slug
                                        ? "bg-dark border-primary bg-primary text-white"
                                        : "border-dark bg-light text-dark"
                                )}
                                onClick={() => onParentChange(parentStyle.slug)}
                            >
                                {parentStyle.name}
                            </div>
                        </div>
                    );
                })}
            </div>
            {stylesLoading ? (
                <div className="container flex items-center justify-center border-b border-b-gray-200 py-4">
                    <Skeleton className="h-[112px] w-[1100px]" />
                </div>
            ) : (
                styles.length > 0 && (
                    <div className="sxl:px-20 text-dark container mx-5 flex flex-wrap items-center justify-center border-b border-b-gray-200 px-0 py-4 font-medium md:mx-10">
                        <div
                            className={cn(
                                "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 text-sm capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                                styleSlug === "all"
                                    ? "bg-dark border-primary bg-primary text-white"
                                    : "border-dark bg-light text-dark"
                            )}
                            onClick={() => setStyleSlug("all")}
                        >
                            All
                        </div>
                        {styles.map((style) => {
                            return (
                                <div key={style.id}>
                                    <div
                                        className={cn(
                                            "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 text-sm capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                                            styleSlug === style.slug
                                                ? "bg-dark border-primary bg-primary text-white"
                                                : "border-dark bg-light text-dark"
                                        )}
                                        onClick={() => setStyleSlug(style.slug)}
                                    >
                                        {style.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
            {isLoading ? (
                <>
                    <div className="container flex flex-row justify-between py-10">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="size-9 rounded-4xl" />
                    </div>
                    <div
                        className={`${assistant.className} flex flex-col space-y-5 pt-5 md:container md:mx-auto`}
                    >
                        <BeersListSkeleton />
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
                    <div className="container flex flex-row justify-between py-10">
                        <div className="text-xl font-semibold">{`${total} result${total === 1 ? "" : "s"}`}</div>
                        <div>
                            <div
                                className="hover:bg-primary hover:border-primary collapse hidden size-9 cursor-pointer flex-col items-center justify-center rounded-4xl border border-black text-black transition-all transition-normal delay-0 duration-300 ease-in-out hover:text-white md:visible md:flex"
                                onClick={updateLayout}
                            >
                                {view == "grid" ? (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Menu />
                                            </TooltipTrigger>
                                            <TooltipContent className="mb-3">
                                                <p>Switch To List View</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ) : (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <LayoutGrid />
                                            </TooltipTrigger>
                                            <TooltipContent className="mb-3">
                                                <p>Switch To Grid View</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                        </div>
                    </div>
                    <InfiniteScroll
                        typeLoading="beers"
                        isLoadingIntial={isLoading}
                        isLoadingMore={isFetchingNextPage}
                        hasNoResults={pages.length === 0}
                        loadMore={() => hasNextPage && fetchNextPage()}
                    >
                        <div className="container flex flex-col gap-4">
                            {pages.map((beer) => {
                                return view === "list" ? (
                                    <BeersListBeer beer={beer} key={beer.id} />
                                ) : (
                                    <div
                                        className="grid grid-cols-1 gap-4 md:grid-cols-2"
                                        key={beer.id}
                                    >
                                        <BeersGridBeer beer={beer} />
                                    </div>
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                </>
            )}
        </div>
    );
};
export default BeersStylesContainer;
