import Image from "next/image";
import { Beer, Star, MoveUpRight, Hop, CalendarDays } from "lucide-react";
import Link from "next/link";

import { Results } from "@/types/search";
import BreweriesFavouriteToggleButton from "@/components/breweries/listing/BreweriesFavouriteToggleButton";
import BeersFavouriteToggleButton from "@/components/beers/listing/BeersFavouriteToggleButton";

const SearchGridItem = ({ result }: { result: Results }) => {
    return (
        <>
            {result.type === "brewery" ? (
                <div className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5">
                    <Link
                        href={`/breweries/types/${result.breweryTypeSlug}`}
                        className="absolute top-10 left-10 z-[1] w-fit rounded-3xl px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
                        style={{
                            backgroundColor: result.breweryTypeColour
                        }}
                    >
                        {result.breweryTypeName}
                    </Link>
                    <div className="absolute top-10 right-10 z-[1] float-right">
                        <BreweriesFavouriteToggleButton
                            breweryId={result.id}
                            breweryFavouriteId={result.favouritesId || ""}
                        />
                    </div>
                    <Link
                        href={`/breweries/${result.slug}`}
                        className="h-full overflow-hidden rounded-xl"
                    >
                        <Image
                            src={result.logoUrl || "/images/brewery.png"}
                            alt={result.name}
                            width={300}
                            height={200}
                            className="ease object-auto aspect-[4/3] h-full w-full object-center transition-all duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                        />
                    </Link>
                    <div className="flex flex-col space-y-4">
                        <Link
                            href={`/breweries/${result.slug}`}
                            className="hover:text-primary cursor-pointer text-2xl font-semibold"
                        >
                            {result.name}
                        </Link>
                        <div className="text-foreground/55 text-lg">
                            {`${result.region}, ${result.country}`}
                        </div>
                    </div>
                    <div className="text-foreground/60 w-full border-t border-dashed border-t-gray-300 pt-4 text-xl">
                        <ul className="flex list-none flex-wrap items-center justify-between">
                            <li className="flex flex-row items-center">
                                <Beer className="mr-2 size-5" />
                                {`${result.beerCount} beer${result.beerCount !== 1 ? "s" : ""}`}
                            </li>
                            <li className="flex flex-row items-center">
                                <Star className="mr-2 size-5" />
                                {`${Number.parseFloat(
                                    result.averageRating
                                ).toFixed(2)} (${result.reviewsLength})`}
                            </li>
                            <li className="flex flex-row items-center">
                                <Link
                                    href={`/breweries/${result.slug}`}
                                    className="hover:bg-primary size-10 cursor-pointer place-content-center items-center justify-items-center rounded-4xl bg-black transition-all delay-0 duration-300 ease-in-out"
                                >
                                    <MoveUpRight className="size-6 text-white" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5">
                    <Link
                        href={`/beers/styles/${result.parentStyleSlug}/${result.styleSlug}`}
                        className="absolute top-10 left-10 z-[1] w-fit rounded-3xl bg-slate-500 px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
                    >
                        {result.style}
                    </Link>
                    <div className="absolute top-10 right-10 z-[1] float-right">
                        <BeersFavouriteToggleButton
                            beerId={result.id}
                            beerFavouriteId={result.favouritesId || ""}
                        />
                    </div>
                    <Link
                        href={`/beers/${result.slug}`}
                        className="h-full overflow-hidden rounded-xl"
                    >
                        <Image
                            src={result.image || "/images/beer.png"}
                            alt={result.name}
                            width={300}
                            height={200}
                            className="ease object-auto aspect-[4/3] h-full w-full object-center transition-all duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                        />
                    </Link>
                    <div className="flex flex-col space-y-4">
                        <Link
                            href={`/beers/${result.slug}`}
                            className="hover:text-primary cursor-pointer text-2xl font-semibold"
                        >
                            {`${result.name}${result.available == false ? " (No longer available)" : ""}`}
                        </Link>
                        <Link
                            href={`/breweries/${result.brewerySlug}`}
                            className="text-foreground/55 text-lg hover:underline"
                        >
                            {`${result.breweryName}, ${result.region}, ${result.country}`}
                        </Link>
                    </div>
                    <div className="text-foreground/60 w-full border-t border-dashed border-t-gray-300 pt-4 text-xl">
                        <ul className="flex list-none flex-wrap items-center justify-between">
                            <li className="flex flex-col space-y-2">
                                <div className="flex flex-row items-center">
                                    <Beer className="mr-2 size-5" />
                                    {`ABV - ${result.abv ? parseFloat(result.abv).toFixed(2) : "-"}%`}
                                </div>
                                <div className="flex flex-row items-center">
                                    <Hop className="mr-2 size-5" />
                                    {`IBU - ${result.ibu}`}
                                </div>
                            </li>
                            <li className="flex flex-col space-y-2">
                                <div className="flex flex-row items-center">
                                    <CalendarDays className="mr-2 size-5" />
                                    {result.yearCreated
                                        ? result.yearCreated
                                        : "-"}
                                </div>
                                <div className="flex flex-row items-center">
                                    <Star className="mr-2 size-5" />
                                    {`${Number.parseFloat(
                                        result.averageRating
                                    ).toFixed(2)} (${result.reviewsLength})`}
                                </div>
                            </li>
                            <li className="flex flex-row items-center">
                                <Link
                                    href={`/beers/${result.slug}`}
                                    className="hover:bg-primary size-10 cursor-pointer place-content-center items-center justify-items-center rounded-4xl bg-black transition-all delay-0 duration-300 ease-in-out"
                                >
                                    <MoveUpRight className="size-6 text-white" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};
export default SearchGridItem;
