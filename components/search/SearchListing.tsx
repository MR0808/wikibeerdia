import { Suspense } from "react";

import { SearchListingProps } from "@/types/search";
import PaginationWithLinks from "@/components/global/PaginationWithLinks";
import SearchSortSelect from "./SearchSortSelect";
import SearchViewToggle from "./SearchViewToggle";
import SearchResults from "./SearchResults";

const sortOrders = [
    { value: "az", name: "A - Z" },
    { value: "za", name: "Z - A" },
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" },
    { value: "popular", name: "Most Popular" }
];

const SearchListing = ({
    results,
    query,
    setQuery,
    view,
    page,
    setPage,
    pageSize,
    setPageSize,
    sort,
    setSort,
    isPending
}: SearchListingProps) => {
    const searchResults = results?.results ? results.results : [];
    const total = results?.total ? results.total : 0;
    const currentPage = page || 1;
    let postsPerPage = pageSize || 10;

    if (postsPerPage > total) postsPerPage = total;

    const start =
        searchResults && searchResults.length > 0
            ? postsPerPage * currentPage - postsPerPage + 1
            : 0;
    const end = postsPerPage * currentPage;

    return (
        <>
            <div className="flex flex-col justify-between space-y-5 text-xl md:flex-row md:space-y-0">
                <div>
                    Showing{" "}
                    <span className="font-semibold">{`${start}-${end}`}</span>{" "}
                    of <span className="font-semibold">{total}</span> results
                </div>
                <div className="flex flex-row justify-start space-x-4">
                    <div className="w-16">Sort by:</div>
                    <SearchSortSelect
                        sortOrders={sortOrders}
                        sort={sort}
                        setSort={setSort}
                    />
                    <SearchViewToggle paramsView={view} />
                </div>
            </div>
            <Suspense fallback={view === "list" ? <></> : <></>}>
                <SearchResults
                    results={searchResults}
                    query={query}
                    setQuery={setQuery}
                    nuqsView={view}
                    isPending={isPending}
                />
            </Suspense>
            {searchResults && searchResults.length > 0 && (
                <PaginationWithLinks
                    page={currentPage}
                    pageSize={postsPerPage}
                    totalCount={total}
                    pageSizeSelectOptions={{
                        pageSizeOptions: [10, 20, 50, 100]
                    }}
                    setPage={setPage}
                    setPageSize={setPageSize}
                />
            )}
        </>
    );
};

export default SearchListing;
