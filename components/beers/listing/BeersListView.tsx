import { BeersListing } from "@/types/beers";
import BeersListBeer from "./BeersListBeer";

const BeersListView = ({ beers }: { beers: BeersListing[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {beers.map((beer) => {
                return <BeersListBeer beer={beer} key={beer.id} />;
            })}
        </div>
    );
};
export default BeersListView;
