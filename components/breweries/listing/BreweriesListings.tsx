import { assistant } from "@/app/fonts";
import { BreweriesListingsProps } from "@/types/breweries";
import Image from "next/image";
import Link from "next/link";
import BreweriesFavouriteToggleButton from "./BreweriesFavouriteToggleButton";
import BreweriesSortSelect from "./BreweriesSortSelect";
import BreweriesViewToggle from "./BreweriesViewToggle";
import { Suspense } from "react";

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
                            className="nice-select"
                            options={[
                                { value: "az", text: "A - Z" },
                                { value: "za", text: "Z - A" },
                                { value: "newest", text: "Newest" },
                                { value: "oldest", text: "Oldest" },
                                { value: "popular", text: "Most Popular" }
                            ]}
                            defaultCurrent={0}
                            name=""
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
                        <div className="grid grid-cols-3 gap-4">
                            {breweries.map((brewery) => {
                                return (
                                    <div
                                        key={brewery.id}
                                        className="relative flex flex-col rounded-3xl bg-white p-5"
                                    >
                                        <div
                                            className="absolute top-6 left-6 z-[1] w-fit rounded-3xl px-3 text-center text-sm leading-7 tracking-wide text-white uppercase"
                                            style={{
                                                backgroundColor:
                                                    brewery.breweryType.colour
                                            }}
                                        >
                                            {brewery.breweryType.name}
                                        </div>
                                        <div className="absolute top-6 right-6 z-[1] float-right">
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
                                        <div className="flex flex-col">
                                            <div className="text-2xl font-semibold">
                                                {brewery.name}
                                            </div>
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
