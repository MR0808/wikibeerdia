import Image from "next/image";
import { Beer, Star, MoveUpRight, CalendarDays, Hop } from "lucide-react";
import Link from "next/link";

import { BeersListing } from "@/types/beers";
import BeersFavouriteToggleButton from "./BeersFavouriteToggleButton";

const BeersListBeer = ({ beer }: { beer: BeersListing }) => {
    const abv = parseFloat(beer.abv);
    return (
        <div className="relative flex flex-col rounded-3xl bg-white p-5 md:h-72 md:flex-row">
            <div className="w-full md:mr-12 md:w-1/3">
                <div className="absolute top-10 left-10 z-[1] w-fit rounded-3xl bg-slate-500 px-3 text-center text-sm leading-7 tracking-wide text-white uppercase">
                    {beer.style?.name}
                </div>
                <Link
                    href={`/beers/${beer.slug}`}
                    className="overflow-hidden rounded-xl"
                >
                    <Image
                        src={beer.images[0].image}
                        alt={beer.name}
                        width={500}
                        height={500}
                        className="ease object-auto aspect-[4/3] h-full w-full rounded-xl object-center transition-all duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <div className="flex w-full flex-col space-y-4 pt-5 md:w-2/3">
                <div className="visible block md:collapse md:hidden">
                    <BeersFavouriteToggleButton
                        beerId={beer.id}
                        beerFavouriteId={beer.beerFavourites[0]?.id || ""}
                    />
                </div>
                <div className="flex flex-row justify-between md:pr-10">
                    <Link
                        href={`/beers/${beer.slug}`}
                        className="hover:text-primary cursor-pointer text-3xl font-semibold md:text-4xl"
                    >
                        {`${beer.name}${beer.available == false ? " (No longer available)" : ""}`}
                    </Link>
                    <div className="collapse hidden md:visible md:block">
                        <BeersFavouriteToggleButton
                            beerId={beer.id}
                            beerFavouriteId={beer.beerFavourites[0]?.id || ""}
                        />
                    </div>
                </div>
                <Link
                    href={`/breweries/${beer.brewery.slug}`}
                    className="text-foreground/55 text-lg hover:underline md:text-xl"
                >
                    {`${beer.brewery.name}, ${beer.brewery.region}, ${beer.brewery.country.name}`}
                </Link>
                <div className="text-foreground/60 mt-5 w-full border-y border-dashed border-t-gray-300 py-7 text-lg md:pr-10 md:text-xl">
                    <ul className="flex w-full list-none flex-row items-center justify-between space-x-0 md:flex-wrap md:space-x-20">
                        <li className="flex flex-col space-y-2">
                            <div className="flex flex-row items-center">
                                <Beer className="mr-2 size-5" />
                                {`ABV - ${abv.toFixed(2)}%`}
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
                                {`${Number.parseFloat(
                                    beer.averageRating
                                ).toFixed(2)} (${beer.beerReviews.length})`}
                            </div>
                        </li>
                        <li className="collapse hidden flex-row items-center md:visible md:flex">
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
        </div>
    );
};
export default BeersListBeer;
