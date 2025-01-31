import { Suspense } from "react";

import BreweriesResults from "./BreweriesResults";
import BreweriesSortSelect from "./BreweriesSortSelect";
import BreweriesViewToggle from "./BreweriesViewToggle";
import { BreweriesListingsProps } from "@/types/breweries";
import PaginationWithLinks from "@/components/global/PaginationWithLinks";
import BreweriesGridSkeleton from "./BreweriesGridSkeleton";

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
    searchParams,
    params
}: BreweriesListingsProps) => {
    const currentPage = parseInt((searchParams.page as string) || "1");
    const postsPerPage = parseInt((searchParams.pageSize as string) || "10");

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
                    <Suspense>
                        <BreweriesSortSelect
                            sortOrders={sortOrders}
                            sort={searchParams.sort}
                            params={params}
                        />
                        <BreweriesViewToggle paramsView={params.view} />
                    </Suspense>
                </div>
            </div>
            <Suspense
                fallback={<BreweriesGridSkeleton />}
                key={JSON.stringify(searchParams)}
            >
                <BreweriesResults
                    breweries={breweries}
                    searchParams={searchParams}
                />

                <PaginationWithLinks
                    page={currentPage}
                    pageSize={postsPerPage}
                    totalCount={total}
                    pageSizeSelectOptions={{
                        pageSizeOptions: [10, 20, 50, 100]
                    }}
                />
            </Suspense>
        </>
    );
};
export default BreweriesListing;
