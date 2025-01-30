"use client";

import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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

import { fetchClientBreweryFavoriteId } from "@/actions/breweries";
import BreweriesFavoriteToggleForm from "./BreweriesFavouriteToggleForm";
import useCurrentUser from "@/hooks/useCurrentUser";

import Link from "next/link";

const BreweriesFavouriteToggleButton = ({
    breweryId
}: {
    breweryId: string;
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
                            You must be logged in to save a brewery.
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

    const { data, error, isLoading } = useQuery({
        queryKey: ["favouriteData"],
        queryFn: () =>
            fetchClientBreweryFavoriteId({ breweryId }).then((res) => {
                if (res.error) {
                    throw new Error(
                        `Network response was not ok, status ${res.error}`
                    );
                }
                return res.data || "";
            })
    });

    return (
        <div>hello</div>
        // <BreweriesFavoriteToggleForm
        //     breweryFavoriteId={data || ""}
        //     breweryId={breweryId}
        //     isLoading={isLoading}
        // />
    );
};
export default BreweriesFavouriteToggleButton;
