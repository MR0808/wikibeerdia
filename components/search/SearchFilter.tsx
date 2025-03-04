"use client";

import { SearchFilterProps } from "@/types/search";
import SearchFilterSearch from "./SearchFilterSearch";
import SearchFilterType from "./SearchFilterType";
import SearchFilterRating from "./SearchFilterRating";
import SearchFilterCountry from "./SearchFilterCountry";

const SearchFilter = ({
    query,
    setQuery,
    type,
    setType,
    country,
    setCountry,
    rating,
    setRating,
    isPending,
    countries
}: SearchFilterProps) => {
    return (
        <div className="rounded-3xl border border-black bg-white p-5">
            <SearchFilterSearch query={query} setQuery={setQuery} />
            <SearchFilterType type={type} setType={setType} />
            <SearchFilterRating rating={rating} setRating={setRating} />
            <SearchFilterCountry
                country={country}
                setCountry={setCountry}
                countries={countries}
            />
        </div>
    );
};

export default SearchFilter;
