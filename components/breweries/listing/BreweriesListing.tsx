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
    params,
    search,
    setSearch,
    country,
    setCountry,
    type,
    setType,
    setPage,
    setPageSize,
    setSort,
    view,
    isPending
}: BreweriesListingsProps) => {
    const currentPage = params.page || 1;
    let postsPerPage = params.pageSize || 10;

    if (postsPerPage > total) postsPerPage = total;

    const start = postsPerPage * currentPage - postsPerPage + 1;
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
                        sort={params.sort}
                        setSort={setSort}
                    />
                    <BreweriesViewToggle paramsView={params.view} />
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
                    params={params}
                    setCountry={setCountry}
                    setType={setType}
                    setSearch={setSearch}
                    country={country}
                    type={type}
                    search={search}
                    isPending={isPending}
                />
            </Suspense>
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
        </>
    );
};
export default BreweriesListing;
