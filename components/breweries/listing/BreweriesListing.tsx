import { Suspense } from "react";

import BreweriesResults from "./BreweriesResults";
import BreweriesSortSelect from "./BreweriesSortSelect";
import BreweriesViewToggle from "./BreweriesViewToggle";
import { BreweriesListingsProps } from "@/types/breweries";
import PaginationWithLinks from "@/components/global/PaginationWithLinks";
import BreweriesGridSkeleton from "./BreweriesGridSkeleton";
import BreweriesListSkeleton from "./BreweriesListSkeleton";

const sortOrders = [
    { value: "az", name: "A - Z" },
    { value: "za", name: "Z - A" },
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" },
    { value: "popular", name: "Most Popular" }
];

const BreweriesListing = ({
    breweries,
    total = 0,
    search,
    setSearch,
    country,
    setCountry,
    type,
    setType,
    view,
    beers,
    setBeers,
    rating,
    setRating,
    page,
    setPage,
    pageSize,
    setPageSize,
    sort,
    setSort,
    isPending
}: BreweriesListingsProps) => {
    const currentPage = page || 1;
    let postsPerPage = pageSize || 10;

    if (postsPerPage > total) postsPerPage = total;

    const start =
        breweries && breweries.length > 0
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
                    <BreweriesSortSelect
                        sortOrders={sortOrders}
                        sort={sort}
                        setSort={setSort}
                    />
                    <BreweriesViewToggle paramsView={view} />
                </div>
            </div>
            <Suspense
                fallback={
                    view === "list" ? (
                        <BreweriesListSkeleton />
                    ) : (
                        <BreweriesGridSkeleton />
                    )
                }
            >
                <BreweriesResults
                    breweries={breweries}
                    country={country}
                    setCountry={setCountry}
                    type={type}
                    setType={setType}
                    search={search}
                    setSearch={setSearch}
                    beers={beers}
                    setBeers={setBeers}
                    rating={rating}
                    setRating={setRating}
                    nuqsView={view}
                    isPending={isPending}
                />
            </Suspense>
            {breweries && breweries.length > 0 && (
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
export default BreweriesListing;
