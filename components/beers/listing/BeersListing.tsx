import { Suspense } from "react";

import BeersResults from "./BeersResults";
import BeersGridSkeleton from "./BeersGridSkeleton";
import BeersListSkeleton from "./BeersListSkeleton";
import { BeersListingsProps } from "@/types/beers";
import PaginationWithLinks from "@/components/global/PaginationWithLinks";
import BeersViewToggle from "./BeersViewToggle";
import BeersSortSelect from "./BeersSortSelect";

const sortOrders = [
    { value: "az", name: "A - Z" },
    { value: "za", name: "Z - A" },
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" },
    { value: "popular", name: "Most Popular" }
];

const BeersListing = ({
    beers,
    total = 0,
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
    pageSize,
    setPageSize,
    page,
    setPage,
    sort,
    setSort,
    view,
    isPending
}: BeersListingsProps) => {
    // const currentPage = params.page || 1;
    // let postsPerPage = params.pageSize || 10;

    const currentPage = page || 1;
    let postsPerPage = pageSize || 10;

    if (postsPerPage > total) postsPerPage = total;

    const start =
        beers && beers.length > 0
            ? postsPerPage * currentPage - postsPerPage + 1
            : 0;
    let end = postsPerPage * currentPage;

    if (end > total) end = total;
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
                    <BeersSortSelect
                        sortOrders={sortOrders}
                        sort={sort}
                        setSort={setSort}
                    />
                    <BeersViewToggle paramsView={view} />
                </div>
            </div>
            <Suspense
                fallback={
                    view === "list" ? (
                        <BeersListSkeleton />
                    ) : (
                        <BeersGridSkeleton />
                    )
                }
            >
                <BeersResults
                    beers={beers}
                    country={country}
                    setCountry={setCountry}
                    search={search}
                    setSearch={setSearch}
                    style={style}
                    setStyle={setStyle}
                    brewery={brewery}
                    setBrewery={setBrewery}
                    abv={abv}
                    setAbv={setAbv}
                    ibu={ibu}
                    setIbu={setIbu}
                    yearCreated={yearCreated}
                    setYearCreated={setYearCreated}
                    available={available}
                    setAvailable={setAvailable}
                    rating={rating}
                    setRating={setRating}
                    isPending={isPending}
                />
            </Suspense>
            {beers && beers.length > 0 && (
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
export default BeersListing;
