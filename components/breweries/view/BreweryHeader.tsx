import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
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
import BreweryFavoriteToggleButton from "./BreweryFavouriteToggleButton";
import BreweryShare from "./BreweryShare";
import BreweryRating from "./BreweryRating";
import BreweryCopyURL from "./BreweryCopyURL";
import BreweryAdminMenu from "./BreweryAdminMenu";

const BreweryHeader = ({
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
    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="w-1/2">
                    <h3 className="text-balance text-3xl font-semibold md:text-6xl">
                        <Link
                            href={data.website}
                            target="_blank"
                            className="hover:underline"
                        >
                            {data.name}
                        </Link>
                    </h3>
                    <BreweryRating
                        rating={rating}
                        totalReviews={totalReviews}
                    />
                    <div className="mt-20 hidden flex-wrap text-wrap md:mt-10 md:flex">
                        {data.status !== "APPROVED" && (
                            <Badge className="mr-4">{data.status}</Badge>
                        )}
                        <div className="mt-15 flex flex-row opacity-70">
                            <MapPin className="mr-1 h-5 w-5 align-middle opacity-70" />
                            {data.formattedAddress}
                        </div>
                    </div>
                </div>
                <div className="flex w-1/2 flex-row justify-end md:text-center">
                    <div className="inline-block">
                        <Image
                            src={data.logoUrl}
                            alt={`${data.name} logo`}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="w-1/2">
                    <ul className="mt-9 hidden list-none space-x-3 md:flex">
                        <li>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <BreweryFavoriteToggleButton
                                            breweryId={data.id}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add to favourites</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                        <li>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link
                                            href={data.website}
                                            target="_blank"
                                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white align-top text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:bg-primary hover:text-white"
                                        >
                                            <ExternalLink />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Go to website</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                        <li>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <BreweryCopyURL />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copy current page link</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                        {user && user.role === "ADMIN" && (
                            <li>
                                <BreweryAdminMenu
                                    id={data.id}
                                    status={data.status}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex w-1/2 flex-row justify-end md:text-center">
                    <ul className="mt-9 hidden list-none space-x-3 md:flex">
                        <BreweryShare data={data} />
                    </ul>
                </div>
            </div>
            <div className="flex flex-wrap md:hidden">
                <div className="mt-8">
                    {data.status !== "APPROVED" && (
                        <Badge className="mr-4">{data.status}</Badge>
                    )}
                    <div className="mt-4 flex opacity-70">
                        <MapPin className="mr-1 h-5 w-5 align-middle opacity-70" />
                        {data.formattedAddress}
                    </div>
                </div>
                <ul className="mt-9 flex list-none space-x-2 md:space-x-3">
                    <li>
                        <BreweryFavoriteToggleButton breweryId={data.id} />
                    </li>
                    <li>
                        <Link
                            href={data.website}
                            target="_blank"
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white align-top text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:bg-primary hover:text-white"
                        >
                            <ExternalLink />
                        </Link>
                    </li>
                    <BreweryShare data={data} />
                </ul>
            </div>
        </>
    );
};

export default BreweryHeader;
