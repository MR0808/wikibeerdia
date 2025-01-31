import { BreweriesListing } from "@/types/breweries";
import BreweriesGridBrewery from "./BreweriesGridBrewery";

const BreweriesGridView = ({
    breweries
}: {
    breweries: BreweriesListing[];
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {breweries.map((brewery) => {
                return (
                    <BreweriesGridBrewery brewery={brewery} key={brewery.id} />
                );
            })}
        </div>
    );
};
export default BreweriesGridView;
