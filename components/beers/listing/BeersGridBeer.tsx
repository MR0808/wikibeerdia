import Image from "next/image";
import { Beer, Star, MoveUpRight, Hop, CalendarDays } from "lucide-react";
import Link from "next/link";

import { BeersListing } from "@/types/beers";
import BeersFavouriteToggleButton from "./BeersFavouriteToggleButton";

const BeersGridBeer = ({ beer }: { beer: BeersListing }) => {
    return (
        <div className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5">
            <div className="absolute top-10 left-10 z-[1] w-fit rounded-3xl bg-slate-500 px-3 text-center text-sm leading-7 tracking-wide text-white uppercase">
                {beer.style?.name}
            </div>
            <div className="absolute top-10 right-10 z-[1] float-right">
                <BeersFavouriteToggleButton
                    beerId={beer.id}
                    beerFavouriteId={beer.beerFavourites[0]?.id || ""}
                />
            </div>
            <Link
                href={`/beers/${beer.slug}`}
                className="h-full overflow-hidden rounded-xl"
            >
                <Image
                    src={beer.images[0].image}
                    alt={beer.name}
                    width={300}
                    height={200}
                    className="ease object-auto aspect-[4/3] h-full w-full object-center transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                />
            </Link>
            <div className="flex flex-col space-y-4">
                <Link
                    href={`/beers/${beer.slug}`}
                    className="hover:text-primary cursor-pointer text-2xl font-semibold"
                >
                    {beer.name}
                </Link>
                <Link
                    href={`/breweries/${beer.brewery.slug}`}
                    className="text-foreground/55 text-lg hover:underline"
                >
                    {`${beer.brewery.name}, ${beer.brewery.region}, ${beer.brewery.country.name}`}
                </Link>
            </div>
            <div className="text-foreground/60 w-full border-t border-dashed border-t-gray-300 pt-4 text-xl">
                <ul className="flex list-none flex-wrap items-center justify-between">
                    <li className="flex flex-col space-y-2">
                        <div className="flex flex-row items-center">
                            <Beer className="mr-2 size-5" />
                            {`ABV - ${beer.abv}%`}
                        </div>
                        <div className="flex flex-row items-center">
                            <Hop className="mr-2 size-5" />
                            {`IBU - ${beer.ibu}`}
                        </div>
                    </li>
                    <li className="flex flex-col space-y-2">
                        <div className="flex flex-row items-center">
                            <CalendarDays className="mr-2 size-5" />
                            {beer.yearCreated ? beer.yearCreated : "-"}
                        </div>
                        <div className="flex flex-row items-center">
                            <Star className="mr-2 size-5" />
                            {`${Number.parseFloat(beer.averageRating).toFixed(
                                2
                            )} (${beer.beerReviews.length})`}
                        </div>
                    </li>
                    <li className="flex flex-row items-center">
                        <Link
                            href={`/beers/${beer.slug}`}
                            className="hover:bg-primary size-10 cursor-pointer place-content-center items-center justify-items-center rounded-4xl bg-black transition-all delay-0 duration-300 ease-in-out"
                        >
                            <MoveUpRight className="size-6 text-white" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default BeersGridBeer;
