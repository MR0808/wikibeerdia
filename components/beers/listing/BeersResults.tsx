"use client";

import { X } from "lucide-react";

import BeersGridView from "./BeersGridView";
import BeersGridSkeleton from "./BeersGridSkeleton";
import BeersListSkeleton from "./BeersListSkeleton";
import BeersListView from "./BeersListView";
import { BeersResultsProps } from "@/types/beers";
import useViewStore from "@/hooks/useViewType";

const BeersResults = ({
    beers,
    params,
    search,
    setSearch,
    country,
    setCountry,
    style,
    setStyle,
    brewery,
    setBrewery,
    abv,
    setAbv,
    ibu,
    setIbu,
    yearCreated,
    setYearCreated,
    available,
    setAvailable,
    rating,
    setRating,
    isPending
}: BeersResultsProps) => {
    const { view } = useViewStore();

    let viewPage = "";
    params.view ? (viewPage = params.view) : (viewPage = view);
    let tags = false;

    const onSearchClick = () => {
        setSearch("");
    };

    country.sort();
    const onCountryClick = (countryToRemove: string) => {
        let newCountries = country.filter((c) => c !== countryToRemove);
        setCountry(newCountries);
    };

    if (search !== "" || country.length != 0 || rating > 1) tags = true;
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

                    {rating > 1 && (
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
                view === "list" ? (
                    <BeersListSkeleton />
                ) : (
                    <BeersGridSkeleton />
                )
            ) : !beers || beers.length === 0 ? (
                <div className="text-2xl font-semibold">
                    No breweries found that match your search
                </div>
            ) : view === "grid" ? (
                <>
                    <BeersGridSkeleton />
                    <BeersGridView beers={beers} />
                </>
            ) : (
                <BeersListView beers={beers} />
            )}
        </>
    );
};
export default BeersResults;
