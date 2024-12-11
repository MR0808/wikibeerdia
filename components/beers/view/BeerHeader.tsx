import Link from "next/link";
import { ExtendedUser } from "@/next-auth";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { BeerType } from "@/types/beers";
import BeerImages from "./BeerImages";
import Image from "next/image";

const BeerHeader = ({
    data,
    user,
    rating,
    totalReviews
}: {
    data: BeerType;
    user?: ExtendedUser;
    rating: number;
    totalReviews: number;
}) => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="h-min w-full rounded-lg bg-white p-5 shadow-lg md:w-2/3 md:p-8">
                    <BeerImages data={data} />
                </div>
            </div>
        </>
    );
};

export default BeerHeader;
