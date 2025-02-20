"use client";

import { BreweriesFilterProps } from "@/types/breweries";
import BreweriesFilterSearch from "./BreweriesFilterSearch";
import BreweriesFilterType from "./BreweriesFilterType";
import BreweriesFilterRating from "./BreweriesFilterRating";
import BreweriesFilterBeers from "./BreweriesFilterBeers";
import BreweriesFilterCountry from "./BreweriesFilterCountry";

const BreweriesFilter = ({
    filters,
    country,
    setCountry,
    search,
    setSearch,
    type,
    setType,
    beers,
    setBeers,
    rating,
    setRating,
    highestBeers
}: BreweriesFilterProps) => {
    return (
        <div className="rounded-3xl border border-black bg-white p-5">
            {filters && (
                <>
                    <BreweriesFilterSearch
                        search={search}
                        setSearch={setSearch}
                    />
                    <BreweriesFilterType
                        type={type}
                        setType={setType}
                        breweryTypes={filters.breweryTypes}
                    />
                    <BreweriesFilterRating
                        rating={rating}
                        setRating={setRating}
                    />
                    <BreweriesFilterBeers
                        beers={beers}
                        setBeers={setBeers}
                        highestBeers={highestBeers}
                    />
                    <BreweriesFilterCountry
                        country={country}
                        setCountry={setCountry}
                        countries={filters.countries}
                    />
                </>
            )}
        </div>
    );
};

export default BreweriesFilter;
