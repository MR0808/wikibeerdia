import Image from "next/image";
import { Beer, Star, MoveUpRight } from "lucide-react";
import Link from "next/link";

import { BreweriesListing } from "@/types/breweries";
import BreweriesFavouriteToggleButton from "./BreweriesFavouriteToggleButton";

const BreweriesListBrewery = ({ brewery }: { brewery: BreweriesListing }) => {
    return (
        <div className="relative flex flex-col rounded-3xl bg-white p-5 md:h-72 md:flex-row">
            <div className="w-full md:mr-12 md:w-1/3">
                <div
                    className="absolute top-10 left-10 z-[1] w-fit rounded-3xl px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
                    style={{
                        backgroundColor: brewery.breweryType.colour
                    }}
                >
                    {brewery.breweryType.name}
                </div>
                <Link
                    href={`/breweries/${brewery.slug}`}
                    className="overflow-hidden rounded-xl"
                >
                    <Image
                        src={brewery.images[0].image}
                        alt={brewery.name}
                        width={500}
                        height={500}
                        className="ease object-auto aspect-[4/3] h-full w-full rounded-xl object-center transition-all duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <div className="flex w-full flex-col space-y-4 pt-5 md:w-2/3">
                <div className="visible block md:collapse md:hidden">
                    <BreweriesFavouriteToggleButton
                        breweryId={brewery.id}
                        breweryFavouriteId={
                            brewery.breweryFavourites[0]?.id || ""
                        }
                    />
                </div>
                <div className="flex flex-row justify-between md:pr-10">
                    <Link
                        href={`/breweries/${brewery.slug}`}
                        className="hover:text-primary cursor-pointer text-3xl font-semibold md:text-4xl"
                    >
                        {brewery.name}
                    </Link>
                    <div className="collapse hidden md:visible md:block">
                        <BreweriesFavouriteToggleButton
                            breweryId={brewery.id}
                            breweryFavouriteId={
                                brewery.breweryFavourites[0]?.id || ""
                            }
                        />
                    </div>
                </div>
                <div className="text-foreground/55 text-lg md:text-xl">
                    {`${brewery.region}, ${brewery.country.name}`}
                </div>
                <div className="text-foreground/60 mt-5 w-full border-y border-dashed border-t-gray-300 py-7 text-lg md:pr-10 md:text-xl">
                    <ul className="flex w-full list-none flex-row items-center justify-between space-x-0 md:flex-wrap md:space-x-20">
                        <li className="flex flex-row items-center">
                            <Beer className="mr-2 size-5" />
                            {`${brewery._count.beers} beer${brewery._count.beers !== 1 && "s"}`}
                        </li>
                        <li className="flex flex-row items-center">
                            <Star className="mr-2 size-5" />
                            {`${Number.parseFloat(
                                brewery.averageRating
                            ).toFixed(1)} (${brewery.breweryReviews.length})`}
                        </li>
                        <li className="collapse hidden flex-row items-center md:visible md:flex">
                            <Link
                                href={`/breweries/${brewery.slug}`}
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
export default BreweriesListBrewery;
