import { BreweryType } from "@/types/breweries";
import { ExtendedUser } from "@/next-auth";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BreweryReviewsHeadingProps {
    data: BreweryType;
    user?: ExtendedUser;
    rating: number;
    totalReviews: number;
}

const BreweryReviewsHeading = ({
    data,
    user,
    rating,
    totalReviews
}: BreweryReviewsHeadingProps) => {
    return (
        <div className="mb-10 flex flex-row justify-start space-x-10">
            <div className="inline-block">
                <Image
                    src={data.logoUrl}
                    alt={`${data.name} logo`}
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex flex-col justify-between space-y-4 md:space-y-0">
                <h3 className="text-balance text-2xl font-semibold md:w-[600px] md:text-6xl">
                    <Link
                        href={data.website}
                        target="_blank"
                        className="hover:underline"
                    >
                        {data.name}
                    </Link>
                </h3>
                <div className="flex flex-row justify-start">
                    <Button asChild size="lg" className="w-32 md:w-40">
                        <Link href={`/breweries/${data.id}`}>
                            Back to brewery
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default BreweryReviewsHeading;
