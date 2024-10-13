import Link from "next/link";
import { MapPin, Share2, Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BreweryType } from "@/types/breweries";
import Image from "next/image";

const BreweryHeader = ({ data }: { data: BreweryType }) => {
    return (
        <div className="flex flex-row justify-between">
            <div className="w-1/2">
                <h3 className="text-6xl font-semibold">{data.name}</h3>
                <div className="mt-10 flex flex-wrap">
                    {data.status !== "APPROVED" && <Badge>{data.status}</Badge>}
                    <div className="mt-15 ml-4 flex flex-row opacity-70">
                        <MapPin className="mr-1 h-5 w-5 align-middle opacity-70" />
                        {data.formattedAddress}
                    </div>
                </div>
            </div>
            <div className="w-1/2 text-center">
                <div className="inline-block">
                    <Image
                        src={data.logoUrl}
                        alt={`${data.name} logo`}
                        width={200}
                        height={200}
                    />
                    <ul className="mt-9 flex list-none items-center">
                        <li className="text-dark mr-auto flex flex-row text-lg font-medium">
                            <Share2 className="mr-2" />
                            Share
                        </li>
                        <li>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border-black bg-white text-lg text-black transition-all">
                                <Heart />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BreweryHeader;
