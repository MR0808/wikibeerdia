import { BeersListing } from "@/types/beers";
import BeersGridBeer from "./BeersGridBeer";

const BeersGridView = ({ beers }: { beers: BeersListing[] }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {beers.map((beer) => {
                return <BeersGridBeer beer={beer} key={beer.id} />;
            })}
        </div>
    );
};
export default BeersGridView;
