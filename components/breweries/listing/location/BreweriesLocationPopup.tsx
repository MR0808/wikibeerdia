import Link from "next/link";
import { Beer, Star } from "lucide-react";

import { BreweriesListing } from "@/types/breweries";

const BreweriesLocationPopup = ({ brewery }: { brewery: BreweriesListing }) => (
    <div className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5">
        <div
            className="w-fit rounded-3xl px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
            style={{
                backgroundColor: brewery.breweryType.colour
            }}
        >
            {brewery.breweryType.name}
        </div>
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
            </ul>
        </div>
    </div>
);

export default BreweriesLocationPopup;
