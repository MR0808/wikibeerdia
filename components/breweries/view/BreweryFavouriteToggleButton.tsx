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
import BreweryFavoriteToggleForm from "./BreweryFavoriteToggleForm";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

const BreweryFavoriteToggleButton = async ({
    breweryId
}: {
    breweryId: string;
}) => {
    const user = await currentUser();
    if (!user) {
        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:bg-primary hover:text-white">
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
        <BreweryFavoriteToggleForm
            breweryFavoriteId={breweryFavoriteId}
            breweryId={breweryId}
        />
    );
};
export default BreweryFavoriteToggleButton;
