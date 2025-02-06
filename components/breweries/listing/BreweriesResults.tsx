"use client";

import { X } from "lucide-react";

import BreweriesGridView from "./BreweriesGridView";
import BreweriesGridSkeleton from "./BreweriesGridSkeleton";
import BreweriesListSkeleton from "./BreweriesListSkeleton";
import BreweriesListView from "./BreweriesListView";
import { BreweriesResultsProps } from "@/types/breweries";
import useViewStore from "@/hooks/useViewType";

const BreweriesResults = ({
    breweries,
    params,
    search,
    setSearch,
    country,
    setCountry,
    type,
    setType,
    isPending
}: BreweriesResultsProps) => {
    const { view } = useViewStore();

    let viewPage = "";
    params.view ? (viewPage = params.view) : (viewPage = view);
    let tags = false;

    const onSearchClick = () => {
        setSearch("");
    };

    country.sort();
    const onCountryClick = (countryToRemove: string) => {
        const newCountries = country.filter((c) => c !== countryToRemove);
        setCountry(newCountries);
    };

    type.sort();
    const onTypeClick = (typeToRemove: string) => {
        const newTypes = type.filter((t) => t !== typeToRemove);
        setType(newTypes);
    };

    if (search !== "" || country.length != 0 || type.length != 0) tags = true;
    return (
        <>
            {tags ? (
                <div className="mb-5 flex h-8 flex-row justify-start text-sm">
                    {search !== "" && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={onSearchClick}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                Keywords
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {search}
                            </span>
                            <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                        </button>
                    )}
                    {type.length != 0 &&
                        type.map((item) => {
                            return (
                                <button
                                    type="button"
                                    className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                                    onClick={() => onTypeClick(item)}
                                    key={item}
                                >
                                    <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                        Brewery Type
                                    </span>
                                    <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                        {item}
                                    </span>
                                    <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                                </button>
                            );
                        })}
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
                    <BreweriesGridSkeleton />
                ) : (
                    <BreweriesListSkeleton />
                )
            ) : !breweries || breweries.length === 0 ? (
                <div className="text-2xl font-semibold">
                    No breweries found that match your search
                </div>
            ) : view === "grid" ? (
                <BreweriesGridView breweries={breweries} />
            ) : (
                <BreweriesListView breweries={breweries} />
            )}
        </>
    );
};
export default BreweriesResults;
