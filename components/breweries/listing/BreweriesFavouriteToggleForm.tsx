"use client";

import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";

import { toggleBreweryFavoriteAction } from "@/actions/breweries";

type BreweriesFavouriteToggleFormProps = {
    breweryId: string;
    breweryFavouriteId: string | null;
};

const BreweriesFavouriteToggleForm = ({
    breweryId,
    breweryFavouriteId
}: BreweriesFavouriteToggleFormProps) => {
    const [isFavorite, setIsFavorite] = useState(
        breweryFavouriteId ? true : false
    );
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    const onClick = () => {
        startTransition(() => {
            toggleBreweryFavoriteAction(
                breweryId,
                breweryFavouriteId,
                pathname
            ).then((data) => {
                if (data.result) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
            });
        });
    };

    return (
        <>
            {isPending ? (
                <div className="hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black bg-white align-top text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:text-white">
                    <ReloadIcon className="animate-spin" />
                </div>
            ) : isFavorite ? (
                <div
                    className="bg-primary hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 align-top text-lg text-white transition duration-300 ease-in-out hover:border-1 hover:border-black hover:text-white"
                    onClick={onClick}
                >
                    <Heart fill="white" />
                </div>
            ) : (
                <div
                    className="hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black bg-white align-top text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:text-white"
                    onClick={onClick}
                >
                    <Heart />
                </div>
            )}
        </>
    );
};
export default BreweriesFavouriteToggleForm;
