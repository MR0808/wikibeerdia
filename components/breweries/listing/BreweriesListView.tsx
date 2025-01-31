import { BreweriesListing } from "@/types/breweries";
import BreweriesListBrewery from "./BreweriesListBrewery";

const BreweriesListView = ({
    breweries
}: {
    breweries: BreweriesListing[];
}) => {
    return (
        <div className="flex flex-col gap-4">
            {breweries.map((brewery) => {
                return (
                    <BreweriesListBrewery brewery={brewery} key={brewery.id} />
                );
            })}
        </div>
    );
};
export default BreweriesListView;
