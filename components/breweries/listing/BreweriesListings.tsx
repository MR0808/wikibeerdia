import { assistant } from "@/app/fonts";
import { Suspense } from "react";

import { BreweriesListingsProps } from "@/types/breweries";
import BreweriesSortSelect from "./BreweriesSortSelect";
import BreweriesViewToggle from "./BreweriesViewToggle";
import BreweriesGridView from "./BreweriesGridView";
import BreweriesGridSkeleton from "./BreweriesGridSkeleton";

const BreweriesListings = ({
    breweries,
    total = 0,
    params
}: BreweriesListingsProps) => {
    const per_page = 12;
    const page = 1;
    const start = per_page * page - per_page + 1;
    const end = per_page * page;

    return (
        <div
            className={`${assistant.className} container flex flex-col-reverse space-x-10 pt-10 md:flex-row md:pt-28`}
        >
            <div className="w-full md:w-1/4">Insert filter here</div>
            <div className="flex w-full flex-col space-y-10 pb-10 md:w-3/4">
                <div className="flex flex-col justify-between space-y-5 text-xl md:flex-row md:space-y-0">
                    <div className="">
                        Showing{" "}
                        <span className="font-semibold">{`${start}-${end}`}</span>{" "}
                        of <span className="font-semibold">{total}</span>{" "}
                        results
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="w-16">Sort by:</div>
                        <Suspense>
                            <BreweriesSortSelect
                                options={[
                                    { value: "az", text: "A - Z" },
                                    { value: "za", text: "Z - A" },
                                    { value: "newest", text: "Newest" },
                                    { value: "oldest", text: "Oldest" },
                                    { value: "popular", text: "Most Popular" }
                                ]}
                                defaultCurrent={0}
                                placeholder=""
                            />
                            <BreweriesViewToggle />
                        </Suspense>
                    </div>
                </div>
                <Suspense fallback={<BreweriesGridSkeleton />}>
                    {!breweries || breweries.length === 0 ? (
                        <div className="text-2xl font-semibold">
                            No breweries found that match your search
                        </div>
                    ) : (
                        <BreweriesGridView breweries={breweries} />
                    )}
                </Suspense>
            </div>
        </div>
    );
};
export default BreweriesListings;
