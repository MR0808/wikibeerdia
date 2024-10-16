import { Star } from "lucide-react";
import Link from "next/link";

import { BreweryTypeReviews } from "@/types/breweries";
import { cn } from "@/lib/utils";

const BreweryRating = ({ reviews }: { reviews: BreweryTypeReviews[] }) => {
    const ratings = reviews.map((review) => {
        return review.rating;
    });

    let rating = 0;

    if (ratings.length > 0)
        rating = ratings.reduce((a, b) => a + b) / ratings.length;

    return (
        <div className="mt-2 flex items-center gap-1">
            <Star fill="#000000" className="h-3 w-3" />
            {`${rating} - `}
            <Link
                href="#reviews"
                className={cn("hover:underline")}
            >{`${reviews.length} reviews`}</Link>
        </div>
    );
};

export default BreweryRating;
