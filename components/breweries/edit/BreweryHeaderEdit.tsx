import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import { ExtendedUser } from "@/next-auth";

import { Badge } from "@/components/ui/badge";
import { BreweryType } from "@/types/breweries";
import Image from "next/image";

const BreweryHeaderEdit = ({
    data,
    user
}: {
    data: BreweryType;
    user?: ExtendedUser;
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
                        <Link
                            href={data.website}
                            target="_blank"
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white align-top text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:bg-primary hover:text-white"
                        >
                            <ExternalLink />
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default BreweryHeaderEdit;
