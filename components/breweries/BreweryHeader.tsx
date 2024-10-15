import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BreweryType } from "@/types/breweries";
import Image from "next/image";
import BreweryFavoriteToggleButton from "./BreweryFavouriteToggleButton";
import BreweryShare from "./BreweryShare";

const BreweryHeader = ({ data }: { data: BreweryType }) => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="w-1/2">
                    <h3 className="text-balance text-3xl font-semibold md:text-6xl">
                        {data.name}
                    </h3>
                    <div className="mt-20 hidden flex-wrap text-wrap md:mt-10 md:flex">
                        {data.status !== "APPROVED" && (
                            <Badge className="mr-4">{data.status}</Badge>
                        )}
                        <div className="mt-15 flex flex-row opacity-70">
                            <MapPin className="mr-1 h-5 w-5 align-middle opacity-70" />
                            {data.formattedAddress}
                        </div>
                    </div>
                    <ul className="mt-9 hidden list-none space-x-3 md:flex">
                        <li>
                            <BreweryFavoriteToggleButton breweryId={data.id} />
                        </li>
                        <BreweryShare data={data} />
                    </ul>
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
                    <BreweryShare data={data} />
                </ul>
            </div>
        </>
    );
};

export default BreweryHeader;
