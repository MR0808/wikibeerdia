import { Star } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const BeerRating = ({
    rating,
    totalReviews
}: {
    rating: number;
    totalReviews: number;
}) => {
    return (
        <div className="mt-2 flex items-center justify-center gap-1">
            <Star fill="#000000" className="h-3 w-3" />
            {`${rating.toFixed(1)} - `}
            <Link
                href="#reviews"
                className={cn("hover:underline")}
            >{`${totalReviews.toLocaleString()} reviews`}</Link>
        </div>
    );
};

export default BeerRating;
