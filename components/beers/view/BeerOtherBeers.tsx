"use client";

import { useState, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { BreweryBeersType } from "@/types/breweries";
import { getBreweryBeers } from "@/actions/breweries";
import BeerCard from "./BeerCard";
import { cn } from "@/lib/utils";

const NUMBER_OF_BEERS_TO_FETCH = 8;

const BeerOtherBeers = ({
    initialBeers,
    breweryId,
    totalBeers,
    beerId
}: {
    initialBeers: BreweryBeersType[];
    breweryId: string;
    totalBeers: number;
    beerId: string;
}) => {
    const [offset, setOffset] = useState(NUMBER_OF_BEERS_TO_FETCH);
    const [beers, setBeers] = useState<BreweryBeersType[]>(initialBeers);
    const [isPending, startTransition] = useTransition();

    const loadMoreBeers = () => {
        startTransition(async () => {
            const moreBeers = await getBreweryBeers(
                breweryId,
                offset,
                NUMBER_OF_BEERS_TO_FETCH
            );
            console.log(moreBeers);
            setBeers((beers) => [...beers, ...moreBeers]);
            setOffset((offset) => offset + NUMBER_OF_BEERS_TO_FETCH);
        });
    };

    return (
        <div className="flex flex-row md:space-x-3">
            <div className="w-full">
                <div className="h-auto w-full items-center rounded-lg bg-white p-5 shadow-lg md:p-14">
                    <div className="mb-10 flex flex-row justify-between">
                        <h4 className="mb-5 text-4xl">Other Brewery Beers</h4>
                    </div>
                    <div className="grid grid-cols-2 place-items-center gap-6 lg:grid-cols-4">
                        {beers.map((beer) => {
                            if (beer.id !== beerId) {
                                return <BeerCard key={beer.id} beer={beer} />;
                            }
                        })}
                    </div>
                    <div
                        className={`mx-auto mt-10 flex flex-row items-center justify-center ${offset >= totalBeers && "hidden"}`}
                    >
                        <Button
                            type="submit"
                            disabled={isPending}
                            className={cn("capitalize")}
                            size="lg"
                            onClick={loadMoreBeers}
                        >
                            {isPending ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                "Load more..."
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BeerOtherBeers;
