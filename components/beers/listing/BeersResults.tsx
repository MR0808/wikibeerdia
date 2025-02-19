"use client";

import { X } from "lucide-react";

import BeersGridView from "./BeersGridView";
import BeersGridSkeleton from "./BeersGridSkeleton";
import BeersListSkeleton from "./BeersListSkeleton";
import BeersListView from "./BeersListView";
import { BeersResultsProps } from "@/types/beers";
import useViewStore from "@/hooks/useViewType";
import { useBreweryFilterStore } from "@/hooks/useBreweryFilterStore";

const BeersResults = ({
    beers,
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
    const { breweryList, setBreweryList } = useBreweryFilterStore();

    let tags = false;

    const onSearchClick = () => {
        setSearch("");
    };

    country.sort();
    const onCountryClick = (countryToRemove: string) => {
        let newCountries = country.filter((c) => c !== countryToRemove);
        setCountry(newCountries);
    };

    const onBreweryClick = (breweryToRemove: string) => {
        let newBreweries = brewery.filter((b) => b !== breweryToRemove);
        setBrewery(newBreweries);
        setBreweryList(breweryList.filter((b) => b.slug !== breweryToRemove));
    };

    if (
        search !== "" ||
        country.length != 0 ||
        brewery.length != 0 ||
        abv.length != 0 ||
        ibu.length != 0 ||
        available !== "" ||
        rating > 1
    )
        tags = true;
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

                    {breweryList.length != 0 &&
                        breweryList.map((item) => {
                            return (
                                <button
                                    type="button"
                                    className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                                    onClick={() => onBreweryClick(item.slug)}
                                    key={item.slug}
                                >
                                    <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                        Brewery
                                    </span>
                                    <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                        {item.name}
                                    </span>
                                    <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                                </button>
                            );
                        })}
                    {abv.length != 0 && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={() => setAbv([])}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                ABV
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {`${abv[0]} - ${abv[1]}`}
                            </span>
                            <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                        </button>
                    )}
                    {ibu.length != 0 && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={() => setIbu([])}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                IBU
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {`${ibu[0]} - ${ibu[1]}`}
                            </span>
                            <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                        </button>
                    )}
                    {yearCreated.length != 0 && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={() => setYearCreated([])}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                Year Created
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {`${yearCreated[0]} - ${yearCreated[1]}`}
                            </span>
                            <X className="group-hover:text-primary mt-[-1px] mr-2 text-xl" />
                        </button>
                    )}
                    {available !== "" && (
                        <button
                            type="button"
                            className="group hover:border-primary mr-2 flex cursor-pointer items-center rounded-lg border border-zinc-300 outline-none"
                            onClick={() => setAvailable("")}
                        >
                            <span className="group-hover:bg-primary flex h-full items-center rounded-tl-sm rounded-bl-sm bg-zinc-300 px-2 whitespace-nowrap text-stone-700 group-hover:text-white">
                                Available
                            </span>
                            <span className="flex h-full items-center px-2 font-bold whitespace-nowrap text-slate-900">
                                {available === "true" ? "Yes" : "No"}
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
                <BeersGridView beers={beers} />
            ) : (
                <BeersListView beers={beers} />
            )}
        </>
    );
};
export default BeersResults;
