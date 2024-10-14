import { MapPin, Mail } from "lucide-react";
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    RedditShareButton
} from "react-share";

import { Badge } from "@/components/ui/badge";
import { BreweryType } from "@/types/breweries";
import Image from "next/image";
import BreweryFavoriteToggleButton from "./BreweryFavouriteToggleButton";
import BreweryShare from "./BreweryShare";

const BreweryHeader = ({ data }: { data: BreweryType }) => {
    return (
        <div className="flex flex-row justify-between">
            <div className="w-1/2">
                <h3 className="text-6xl font-semibold">{data.name}</h3>
                <div className="mt-10 flex flex-wrap">
                    {data.status !== "APPROVED" && (
                        <Badge className="mr-4">{data.status}</Badge>
                    )}
                    <div className="mt-15 flex flex-row opacity-70">
                        <MapPin className="mr-1 h-5 w-5 align-middle opacity-70" />
                        {data.formattedAddress}
                    </div>
                </div>
                <ul className="mt-9 flex list-none space-x-3">
                    <li>
                        <BreweryFavoriteToggleButton breweryId={data.id} />
                    </li>
                    <BreweryShare data={data} />
                </ul>
            </div>
            <div className="w-1/2 text-center">
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
    );
};

export default BreweryHeader;
