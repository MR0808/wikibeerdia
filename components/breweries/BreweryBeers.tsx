import { ExtendedUser } from "@/next-auth";
import Link from "next/link";

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
                    <p className="whitespace-pre-wrap text-lg leading-8">
                        {data.description}
                    </p>
                </div>
                s
            </div>
        </div>
    );
};
export default BreweryBeers;
