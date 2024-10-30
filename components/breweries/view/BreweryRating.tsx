import { Star } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const BreweryRating = ({
    rating,
    totalReviews
}: {
    rating: number;
    totalReviews: number;
}) => {
    return (
        <div className="mt-2 flex items-center gap-1">
            <Star fill="#000000" className="h-3 w-3" />
            {`${rating} - `}
            <Link
                href="#reviews"
                className={cn("hover:underline")}
            >{`${totalReviews} reviews`}</Link>
        </div>
    );
};

export default BreweryRating;
