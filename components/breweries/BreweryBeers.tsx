import { ExtendedUser } from "@/next-auth";
import Link from "next/link";
import Image from "next/image";

import { BreweryType } from "@/types/breweries";
import { Button } from "@/components/ui/button";

const BreweryBeers = ({
    data,
    user
}: {
    data: BreweryType;
    user?: ExtendedUser;
}) => {
    return (
        <div className="mt-12 flex flex-row md:mt-16 md:space-x-3">
            <div className="w-full">
                <div className="mb-5 h-auto w-full rounded-lg bg-white p-5 shadow-lg md:mb-20 md:p-14">
                    <div className="flex flex-row justify-between">
                        <h4 className="mb-5 text-4xl">Available Beers</h4>
                        {user && (
                            <Link href={`/beers/submit?brewery=${data.id}`}>
                                <Button type="button">Add Beer</Button>
                            </Link>
                        )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {data.beers.map((beer) => {
                            console.log(beer);
                            return (
                                <div
                                    key={beer.id}
                                    className="flex flex-col space-y-2"
                                >
                                    <Image
                                        src={beer.images[0].image}
                                        alt={beer.name}
                                        height={100}
                                        width={100}
                                        className="block h-28 w-28 rounded-lg object-cover object-center"
                                    />
                                    <div>{beer.name}</div>
                                    <div>{beer.abv}%</div>
                                    <div>{beer.subStyle?.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BreweryBeers;
