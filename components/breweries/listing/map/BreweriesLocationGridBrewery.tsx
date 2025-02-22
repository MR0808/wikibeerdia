import Image from "next/image";
import { Beer, Star } from "lucide-react";
import Link from "next/link";

import { BreweriesListing } from "@/types/breweries";
import BreweriesFavouriteToggleButton from "@/components/breweries/listing/BreweriesFavouriteToggleButton";

const BreweriesLocationGridBrewery = ({
    brewery
}: {
    brewery: BreweriesListing;
}) => {
    return (
        <div className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5">
            <Link
                href={`/breweries/type/${brewery.breweryType.slug}`}
                className="absolute top-10 left-10 z-[1] w-fit rounded-3xl px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
                style={{
                    backgroundColor: brewery.breweryType.colour
                }}
            >
                {brewery.breweryType.name}
            </Link>
            <div className="absolute top-10 right-10 z-[1] float-right">
                <BreweriesFavouriteToggleButton
                    breweryId={brewery.id}
                    breweryFavouriteId={brewery.breweryFavourites[0]?.id || ""}
                />
            </div>
            <Link
                href={`/breweries/${brewery.slug}`}
                className="h-full overflow-hidden rounded-xl"
            >
                <Image
                    src={brewery.logoUrl}
                    alt={brewery.name}
                    width={150}
                    height={100}
                    className="ease object-auto aspect-[4/3] h-full w-full object-center transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                />
            </Link>
            <div className="flex flex-col space-y-4">
                <Link
                    href={`/breweries/${brewery.slug}`}
                    className="hover:text-primary cursor-pointer text-2xl font-semibold"
                >
                    {brewery.name}
                </Link>
                <div className="text-foreground/55 text-lg">
                    {`${brewery.region}, ${brewery.country.name}`}
                </div>
            </div>
            <div className="text-foreground/60 w-full border-t border-dashed border-t-gray-300 pt-4 text-xl">
                <ul className="flex list-none flex-wrap items-center justify-between">
                    <li className="flex flex-row items-center">
                        <Beer className="mr-2 size-5" />
                        {`${brewery._count.beers} beer${brewery._count.beers !== 1 && "s"}`}
                    </li>
                    <li className="flex flex-row items-center">
                        <Star className="mr-2 size-5" />
                        {`${Number.parseFloat(brewery.averageRating).toFixed(
                            2
                        )} (${brewery.breweryReviews.length})`}
                    </li>
                    {/* <li className="flex flex-row items-center">
                        <Link
                            href={`/breweries/${brewery.slug}`}
                            className="hover:bg-primary size-10 cursor-pointer place-content-center items-center justify-items-center rounded-4xl bg-black transition-all delay-0 duration-300 ease-in-out"
                        >
                            <MoveUpRight className="size-6 text-white" />
                        </Link>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};
export default BreweriesLocationGridBrewery;
