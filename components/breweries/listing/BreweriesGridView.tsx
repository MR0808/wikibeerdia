import { BreweriesListing } from "@/types/breweries";
import BreweriesGridBrewery from "./BreweriesGridBrewery";

const BreweriesGridView = ({
    breweries,
    grids = 2
}: {
    breweries: BreweriesListing[];
    grids?: number;
}) => {
    return (
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-${grids}`}>
            {breweries.map((brewery) => {
                return (
                    <BreweriesGridBrewery brewery={brewery} key={brewery.id} />
                );
            })}
        </div>
    );
};
export default BreweriesGridView;
