import { assistant } from "@/app/fonts";

import { BreweriesListingsProps } from "@/types/breweries";
import BreweriesResults from "./BreweriesResults";

const BreweriesListings = ({
    breweries,
    total = 0,
    searchParams,
    params
}: BreweriesListingsProps) => {
    return (
        <div
            className={`${assistant.className} container flex flex-col-reverse space-x-10 pt-10 md:flex-row md:pt-28`}
        >
            <div className="w-full md:w-1/4">Insert filter here</div>
            <div className="flex w-full flex-col space-y-10 pb-10 md:w-3/4">
                <BreweriesResults
                    breweries={breweries}
                    total={total}
                    searchParams={searchParams}
                    params={params}
                />
            </div>
        </div>
    );
};
export default BreweriesListings;
