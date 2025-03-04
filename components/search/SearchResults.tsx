"use client";

import { X } from "lucide-react";

import { SearchResultsProps } from "@/types/search";
import useViewStore from "@/hooks/useViewType";
import SearchGridView from "./SearchGridView";
import SearchListView from "./SearchListView";
import SearchGridSkeleton from "./SearchGridSkeleton";
import SearchListSkeleton from "./SearchListSkeleton";

const SearchResults = ({
    results,
    query,
    setQuery,
    nuqsView,
    isPending
}: SearchResultsProps) => {
    const { view } = useViewStore();

    let viewPage = "";
    nuqsView ? (viewPage = nuqsView) : (viewPage = view);
    let tags = false;

    const onQueryClick = () => {
        setQuery("");
    };
    if (query !== "") tags = true;

    return (
        <>
            {tags ? (
                <div className="mb-5 flex h-8 flex-row justify-start text-sm">
                    {query !== "" && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={onQueryClick}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                Search
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {query}
                            </span>
                            <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                        </button>
                    )}
                </div>
            ) : (
                <div className="pt-5"></div>
            )}
            {isPending ? (
                view === "grid" ? (
                    <SearchGridSkeleton />
                ) : (
                    <SearchListSkeleton />
                )
            ) : !results || results.length === 0 ? (
                <div className="text-2xl font-semibold">
                    No results found that match your search
                </div>
            ) : view === "grid" ? (
                <SearchGridView results={results} />
            ) : (
                <SearchListView results={results} />
            )}
        </>
    );
};

export default SearchResults;
