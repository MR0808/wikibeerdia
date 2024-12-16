import Link from "next/link";
import Image from "next/image";

import { BreweryBeersType } from "@/types/breweries";

const BeerCard = ({ beer }: { beer: BreweryBeersType }) => {
    return (
        <Link
            href={`/beers/${beer.id}`}
            className="group flex w-full flex-col items-center space-y-2 rounded-xl transition ease-in-out hover:shadow-lg"
        >
            <Image
                src={beer.images[0].image}
                alt={beer.name}
                height={100}
                width={100}
                className="block h-28 w-28 rounded-lg object-cover object-center transition ease-in-out group-hover:scale-110"
            />
            <div className="font-semibold group-hover:text-primary">
                {beer.name}
            </div>
            <div>{beer.abv}%</div>
            <div className="group-hover:text-primary">
                {beer.subStyle?.name}
            </div>
        </Link>
    );
};
export default BeerCard;
