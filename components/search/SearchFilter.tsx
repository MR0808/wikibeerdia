"use client";

import { SearchFilterProps } from "@/types/search";
import SearchFilterSearch from "./SearchFilterSearch";
import SearchFilterType from "./SearchFilterType";

const SearchFilter = ({
    query,
    setQuery,
    type,
    setType,
    isPending
}: SearchFilterProps) => {
    return (
        <div className="rounded-3xl border border-black bg-white p-5">
            <SearchFilterSearch query={query} setQuery={setQuery} />
            <SearchFilterType type={type} setType={setType} />
        </div>
    );
};

export default SearchFilter;
