import { BeersListing } from "@/types/beers";
import BeersGridBeer from "./BeersGridBeer";

const BeersGridView = ({
    beers,
    grids = 2
}: {
    beers: BeersListing[];
    grids?: number;
}) => {
    return (
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-${grids}`}>
            {beers.map((beer) => {
                return <BeersGridBeer beer={beer} key={beer.id} />;
            })}
        </div>
    );
};
export default BeersGridView;
