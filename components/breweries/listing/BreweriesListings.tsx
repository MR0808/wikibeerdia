import { assistant } from "@/app/fonts";
import { Beer, Star, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { BreweriesListingsProps } from "@/types/breweries";
import BreweriesFavouriteToggleButton from "./BreweriesFavouriteToggleButton";
import BreweriesSortSelect from "./BreweriesSortSelect";
import BreweriesViewToggle from "./BreweriesViewToggle";

const BreweriesListings = ({
    breweries,
    total = 0
}: BreweriesListingsProps) => {
    const per_page = 12;
    const page = 1;
    const start = per_page * page - per_page + 1;
    const end = per_page * page;

    return (
        <div
            className={`${assistant.className} container flex flex-col-reverse space-x-10 pt-10 md:flex-row md:pt-28`}
        >
            <div className="w-full md:w-1/4">Insert filter here</div>
            <div className="flex w-full flex-col space-y-10 pb-10 md:w-3/4">
                <div className="flex flex-col justify-between space-y-5 text-xl md:flex-row md:space-y-0">
                    <div className="">
                        Showing{" "}
                        <span className="font-semibold">{`${start}-${end}`}</span>{" "}
                        of <span className="font-semibold">{total}</span>{" "}
                        results
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="w-16">Sort by:</div>
                        <BreweriesSortSelect
                            options={[
                                { value: "az", text: "A - Z" },
                                { value: "za", text: "Z - A" },
                                { value: "newest", text: "Newest" },
                                { value: "oldest", text: "Oldest" },
                                { value: "popular", text: "Most Popular" }
                            ]}
                            defaultCurrent={0}
                            placeholder=""
                        />
                        <BreweriesViewToggle />
                    </div>
                </div>
                {!breweries || breweries.length === 0 ? (
                    <div className="text-2xl font-semibold">
                        No breweries found that match your search
                    </div>
                ) : (
                    <Suspense>
                        <div className="grid grid-cols-2 gap-4">
                            {breweries.map((brewery) => {
                                return (
                                    <div
                                        key={brewery.id}
                                        className="relative flex flex-col space-y-4 rounded-3xl bg-white p-5"
                                    >
                                        <div
                                            className="absolute top-10 left-10 z-[1] w-fit rounded-3xl px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
                                            style={{
                                                backgroundColor:
                                                    brewery.breweryType.colour
                                            }}
                                        >
                                            {brewery.breweryType.name}
                                        </div>
                                        <div className="absolute top-10 right-10 z-[1] float-right">
                                            <BreweriesFavouriteToggleButton
                                                breweryId={brewery.id}
                                            />
                                        </div>
                                        <Link
                                            href={`/breweries/${brewery.slug}`}
                                            className="h-full overflow-hidden rounded-xl"
                                        >
                                            <Image
                                                src={brewery.images[0].image}
                                                alt={brewery.name}
                                                width={300}
                                                height={200}
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
                                                    {`${Number.parseFloat(
                                                        brewery.averageRating
                                                    ).toFixed(
                                                        1
                                                    )} (${brewery.breweryReviews.length})`}
                                                </li>
                                                <li className="flex flex-row items-center">
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
                                );
                            })}
                        </div>
                    </Suspense>
                )}
            </div>
        </div>
    );
};
export default BreweriesListings;
