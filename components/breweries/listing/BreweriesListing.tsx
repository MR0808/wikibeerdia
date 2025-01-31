import BreweriesResults from "./BreweriesResults";
import BreweriesSortSelect from "./BreweriesSortSelect";
import BreweriesViewToggle from "./BreweriesViewToggle";
import { BreweriesListingsProps } from "@/types/breweries";

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
    const per_page = 12;
    const page = 1;
    const start = per_page * page - per_page + 1;
    const end = per_page * page;
    return (
        <>
            <div className="flex flex-col justify-between space-y-5 text-xl md:flex-row md:space-y-0">
                <div className="">
                    Showing{" "}
                    <span className="font-semibold">{`${start}-${end}`}</span>{" "}
                    of <span className="font-semibold">{total}</span> results
                </div>
                <div className="flex flex-row space-x-4">
                    <div className="w-16">Sort by:</div>
                    <BreweriesSortSelect
                        sortOrders={sortOrders}
                        sort={searchParams.sort}
                        params={params}
                    />
                    <BreweriesViewToggle paramsView={params.view} />
                </div>
            </div>
            <BreweriesResults
                breweries={breweries}
                searchParams={searchParams}
            />
        </>
    );
};
export default BreweriesListing;
