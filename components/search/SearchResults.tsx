"use client";

import { X } from "lucide-react";

import { SearchResultsProps } from "@/types/search";
import useViewStore from "@/hooks/useViewType";
import SearchGridView from "./SearchGridView";
import SearchListView from "./SearchListView";
import SearchGridSkeleton from "./SearchGridSkeleton";
import SearchListSkeleton from "./SearchListSkeleton";
import { capitaliseFirstLetter } from "@/utils/case";

const SearchResults = ({
    results,
    query,
    setQuery,
    type,
    setType,
    country,
    setCountry,
    rating,
    setRating,
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

    const onTypeClick = () => {
        setType("all");
    };

    country.sort();
    const onCountryClick = (countryToRemove: string) => {
        let newCountries = country.filter((c) => c !== countryToRemove);
        setCountry(newCountries);
    };

    if (query !== "" || type !== "all" || country.length != 0 || rating > 0)
        tags = true;

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
                    {type !== "all" && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={onTypeClick}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                Type
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {capitaliseFirstLetter(type)}
                            </span>
                            <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                        </button>
                    )}
                    {rating > 0 && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={() => setRating(1)}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                Rating
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {`${rating} stars +`}
                            </span>
                            <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                        </button>
                    )}
                    {country.length != 0 &&
                        country.map((item) => {
                            return (
                                <button
                                    type="button"
                                    className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                                    onClick={() => onCountryClick(item)}
                                    key={item}
                                >
                                    <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                        Location
                                    </span>
                                    <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                        {item}
                                    </span>
                                    <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                                </button>
                            );
                        })}
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
