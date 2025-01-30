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

import { fetchBreweryFavoriteId } from "@/actions/breweries";
import BreweriesFavoriteToggleForm from "./BreweriesFavouriteToggleForm";
import { currentUser } from "@/lib/auth";

import Link from "next/link";

const BreweriesFavouriteToggleButton = async ({
    breweryId
}: {
    breweryId: string;
}) => {
    const user = await currentUser();
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

    const breweryFavoriteId = await fetchBreweryFavoriteId({ breweryId });

    return (
        <BreweriesFavoriteToggleForm
            breweryFavoriteId={breweryFavoriteId}
            breweryId={breweryId}
        />
    );
};
export default BreweriesFavouriteToggleButton;
