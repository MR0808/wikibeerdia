"use client";

import { SearchFilterProps } from "@/types/search";
import SearchFilterSearch from "./SearchFilterSearch";

const SearchFilter = ({ query, setQuery, isPending }: SearchFilterProps) => {
    return (
        <div className="rounded-3xl border border-black bg-white p-5">
            <SearchFilterSearch query={query} setQuery={setQuery} />
        </div>
    );
};

export default SearchFilter;
