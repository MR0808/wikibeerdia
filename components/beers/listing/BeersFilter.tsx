"use client";

import { BeersFilterProps } from "@/types/beers";
import BeersFilterBrewery from "./BeersFilterBrewery";
import BeersFilterSearch from "./BeersFilterSearch";
import BeersFilterCountry from "./BeersFilterCountry";
import BeersFilterRating from "./BeersFilterRating";
import BeersFilterAbv from "./BeersFilterAbv";
import BeersFilterIbu from "./BeersFilterIbu";
import BeersFilterYear from "./BeersFilterYear";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const BeersFilter = ({
    filters,
    country,
    setCountry,
    search,
    setSearch,
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
    highest
}: BeersFilterProps) => {
    const highestAbv = parseFloat(highest.abv);
    const highestIbu = parseInt(highest.ibu);
    const highestYear = parseInt(highest.yearMax);
    const lowestYear = parseInt(highest.yearMin);

    return (
        <div className="rounded-3xl border border-black bg-white p-5">
            {filters && (
                <>
                    <BeersFilterSearch search={search} setSearch={setSearch} />
                    <BeersFilterBrewery
                        brewery={brewery}
                        setBrewery={setBrewery}
                    />
                    <BeersFilterAbv
                        abv={abv}
                        setAbv={setAbv}
                        highestAbv={highestAbv}
                    />
                    <BeersFilterIbu
                        ibu={ibu}
                        setIbu={setIbu}
                        highestIbu={highestIbu}
                    />
                    <BeersFilterYear
                        yearCreated={yearCreated}
                        setYearCreated={setYearCreated}
                        highestYear={highestYear}
                        lowestYear={lowestYear}
                    />
                    <div className="flex w-full flex-col border-b border-b-gray-200 pb-6">
                        <div className="py-4 text-xl font-bold text-black/80">
                            Available?
                        </div>
                        <div className="flex flex-col space-y-4">
                            <Switch size="lg" />
                        </div>
                    </div>
                    <BeersFilterRating rating={rating} setRating={setRating} />
                    <BeersFilterCountry
                        country={country}
                        setCountry={setCountry}
                        countries={filters.countries}
                    />
                </>
            )}
        </div>
    );
};

export default BeersFilter;
