import { ExtendedUser } from "@/next-auth";
import Image from "next/image";

import { BeerType } from "@/types/beers";
import BeerImages from "./BeerImages";
import Link from "next/link";
import BeerRating from "./BeerRating";
import BeerShare from "./BeerShare";
import BeerFavouriteToggleButton from "./BeerFavouriteToggleButton";
import BeerAdminMenu from "./BeerAdminMenu";
import BeerReport from "./BeerReport";

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
        <div className="flex flex-col justify-between md:flex-row md:space-x-10">
            <div className="order-last mt-5 h-full w-full rounded-lg bg-white p-5 shadow-lg md:order-first md:mt-0">
                <BeerImages data={data} />
            </div>
            <div className="order-first flex h-min w-full flex-col justify-between space-y-5 md:order-last md:w-1/3 md:space-y-10">
                <div className="h-min w-full rounded-lg bg-white p-5 shadow-lg md:p-10">
                    <div className="flex w-full flex-row justify-center md:text-center">
                        <div className="items-center space-y-5">
                            <Link
                                href={`/breweries/${data.brewery.slug}`}
                                className="items-center"
                            >
                                <Image
                                    src={data.brewery.logoUrl}
                                    alt={`${data.name} logo`}
                                    width={200}
                                    height={200}
                                    className="inline items-center"
                                />
                            </Link>
                            <div className="text-3xl">{data.name}</div>
                            <Link
                                href={`/breweries/${data.brewery.slug}`}
                                className="text-xl hover:underline"
                            >
                                {data.brewery.name}
                            </Link>
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
                                {user && user.role === "ADMIN" && (
                                    <li>
                                        <BeerAdminMenu
                                            id={data.id}
                                            status={data.status}
                                            slug={data.slug}
                                        />
                                    </li>
                                )}
                            </ul>
                            <BeerReport beerId={data.id} />
                        </div>
                    </div>
                </div>
                <div className="h-min w-full rounded-lg bg-white p-8 shadow-lg">
                    <div className="flex w-full flex-col justify-between space-y-4 md:text-center">
                        <div className="flex w-full flex-row justify-between">
                            <div className="text-base font-bold">Category:</div>
                            <Link
                                href={`/beers/styles/${data.style?.parentStyle.slug}`}
                                className="w-1/2 text-left text-base hover:underline"
                            >
                                {data.style?.parentStyle.name}
                            </Link>
                        </div>
                        <div className="flex w-full flex-row justify-between">
                            <div className="text-base font-bold">Style:</div>
                            <Link
                                href={`/beers/styles/${data.style?.parentStyle.slug}/${data.style?.slug}`}
                                className="w-1/2 text-left text-base hover:underline"
                            >
                                {data.style?.name}
                            </Link>
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
    );
};

export default BeerHeader;
