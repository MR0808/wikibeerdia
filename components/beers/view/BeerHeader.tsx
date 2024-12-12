import { ExtendedUser } from "@/next-auth";
import Image from "next/image";

import { BeerType } from "@/types/beers";
import BeerImages from "./BeerImages";
import Link from "next/link";
import BeerRating from "./BeerRating";
import BeerShare from "./BeerShare";
import BeerFavouriteToggleButton from "./BeerFavouriteToggleButton";

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
            <div className="flex flex-row justify-between space-x-10">
                <div className="h-full w-full rounded-lg bg-white p-5 shadow-lg md:p-5">
                    <BeerImages data={data} />
                </div>
                <div className="flex h-min w-full flex-col justify-between space-y-10 md:w-1/3">
                    <div className="h-min w-full rounded-lg bg-white p-10 shadow-lg">
                        <div className="flex w-full flex-row justify-center md:text-center">
                            <div className="inline-block space-y-5">
                                <Link href={`/breweries/${data.breweryId}`}>
                                    <Image
                                        src={data.brewery.logoUrl}
                                        alt={`${data.name} logo`}
                                        width={200}
                                        height={200}
                                    />
                                </Link>
                                <div className="text-3xl">{data.name}</div>
                                <BeerRating
                                    rating={rating}
                                    totalReviews={totalReviews}
                                />
                                <ul className="mt-9 flex list-none space-x-2 md:space-x-3">
                                    <li>
                                        <BeerFavouriteToggleButton
                                            beerId={data.id}
                                        />
                                    </li>
                                    <BeerShare data={data} />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="h-min w-full rounded-lg bg-white p-8 shadow-lg">
                        <div className="flex w-full flex-col justify-between space-y-4 md:text-center">
                            <div className="flex w-full flex-row justify-between">
                                <div className="text-base font-bold">
                                    Category:
                                </div>
                                <div className="w-1/2 text-left text-base">
                                    {data.subStyle?.style.parentStyle.name}
                                </div>
                            </div>
                            <div className="flex w-full flex-row justify-between">
                                <div className="text-base font-bold">
                                    Style:
                                </div>
                                <div className="w-1/2 text-left text-base">
                                    {data.subStyle?.style.name}
                                </div>
                            </div>
                            <div className="flex w-full flex-row justify-between">
                                <div className="text-base font-bold">
                                    Sub-Style:
                                </div>
                                <div className="w-1/2 text-left text-base">
                                    {data.subStyle?.name}
                                </div>
                            </div>
                            <div className="flex w-full flex-row justify-between">
                                <div className="text-base font-bold">ABV:</div>
                                <div className="w-1/2 text-left text-base">{`${data.abv}%`}</div>
                            </div>
                            <div className="flex w-full flex-row justify-between">
                                <div className="text-base font-bold">IBU:</div>
                                <div className="w-1/2 text-left text-base">{`${data.ibu} IBU`}</div>
                            </div>
                            {data.yearCreated && (
                                <div className="flex w-full flex-row justify-between">
                                    <div className="text-base font-bold">
                                        Year Created:
                                    </div>
                                    <div className="w-1/2 text-left text-base">
                                        {data.yearCreated}
                                    </div>
                                </div>
                            )}
                            <div className="flex w-full flex-row justify-between">
                                <div className="text-base font-bold">
                                    Available:
                                </div>
                                <div className="w-1/2 text-left text-base">
                                    {data.available ? "Yes" : "No"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BeerHeader;
