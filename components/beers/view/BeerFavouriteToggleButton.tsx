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

import { fetchBeerFavoriteId } from "@/actions/beers";
import BeerFavouriteToggleForm from "./BeerFavoriteToggleForm";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

const BeerFavouriteToggleButton = async ({ beerId }: { beerId: string }) => {
    const user = await currentUser();
    if (!user) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
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
    const beerFavoriteId = await fetchBeerFavoriteId({ beerId });

    return (
        <BeerFavouriteToggleForm
            beerFavoriteId={beerFavoriteId}
            beerId={beerId}
        />
    );
};
export default BeerFavouriteToggleButton;
