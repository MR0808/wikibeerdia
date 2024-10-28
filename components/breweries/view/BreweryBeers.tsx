"use client";

import { useState, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ExtendedUser } from "@/next-auth";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BreweryBeersType } from "@/types/breweries";
import { getBreweryBeers } from "@/actions/breweries";
import BreweryBeerCard from "./BreweryBeerCard";
import { cn } from "@/lib/utils";

const NUMBER_OF_BEERS_TO_FETCH = 8;

const BreweryBeers = ({
    initialBeers,
    breweryId,
    user,
    totalBeers
}: {
    initialBeers: BreweryBeersType[];
    breweryId: string;
    user?: ExtendedUser;
    totalBeers: number;
}) => {
    const [offset, setOffset] = useState(NUMBER_OF_BEERS_TO_FETCH);
    const [beers, setBeers] = useState<BreweryBeersType[]>(initialBeers);
    const [isPending, startTransition] = useTransition();

    const loadMoreBeers = () => {
        startTransition(async () => {
            const apiUsers = await getBreweryBeers(
                breweryId,
                offset,
                NUMBER_OF_BEERS_TO_FETCH
            );
            setBeers((beers) => [...beers, ...apiUsers]);
            setOffset((offset) => offset + NUMBER_OF_BEERS_TO_FETCH);
        });
    };

    return (
        <div className="mt-12 flex flex-row md:mt-16 md:space-x-3">
            <div className="w-full">
                <div className="mb-5 h-auto w-full items-center rounded-lg bg-white p-5 shadow-lg md:mb-20 md:p-14">
                    <div className="mb-10 flex flex-row justify-between">
                        <h4 className="mb-5 text-4xl">Available Beers</h4>
                        {user && (
                            <Link href={`/beers/submit?brewery=${breweryId}`}>
                                <Button type="button">Add Beer</Button>
                            </Link>
                        )}
                    </div>
                    <div className="grid grid-cols-2 place-items-center gap-6 lg:grid-cols-4">
                        {beers.map((beer) => {
                            return (
                                <BreweryBeerCard key={beer.id} beer={beer} />
                            );
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
export default BreweryBeers;
