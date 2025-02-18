"use client";

import { Heart } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

import BeersFavouriteToggleForm from "./BeersFavouriteToggleForm";
import useCurrentUser from "@/hooks/useCurrentUser";

import Link from "next/link";

const BeersFavouriteToggleButton = ({
    beerId,
    beerFavouriteId
}: {
    beerId: string;
    beerFavouriteId: string;
}) => {
    const user = useCurrentUser();

    if (!user) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black bg-white text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:text-white">
                        <Heart />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            You must be logged in to save a beer.
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <Link href="/login">Login</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    return (
        <BeersFavouriteToggleForm
            beerFavouriteId={beerFavouriteId || ""}
            beerId={beerId}
        />
    );
};
export default BeersFavouriteToggleButton;
