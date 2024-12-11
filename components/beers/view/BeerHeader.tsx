import Link from "next/link";
import { ExtendedUser } from "@/next-auth";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { BreweryType } from "@/types/breweries";
import Image from "next/image";

const BeerHeader = ({
    data,
    user,
    rating,
    totalReviews
}: {
    data: BreweryType;
    user?: ExtendedUser;
    rating: number;
    totalReviews: number;
}) => {
    return <></>;
};

export default BeerHeader;
