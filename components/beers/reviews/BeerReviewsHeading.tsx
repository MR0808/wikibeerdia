import { ExtendedUser } from "@/next-auth";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BeerType } from "@/types/beers";

interface BeerReviewsHeadingProps {
    data: BeerType;
    user?: ExtendedUser;
    rating: number;
    totalReviews: number;
}

const BeerReviewsHeading = ({
    data,
    user,
    rating,
    totalReviews
}: BeerReviewsHeadingProps) => {
    return (
        <div className="mb-10 flex flex-row justify-start space-x-10">
            <div className="inline-block size-40">
                <Image
                    src={data.images[0].image}
                    alt={`${data.name} logo`}
                    width={160}
                    height={160}
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    className="my-auto mb-10 h-40 rounded-2xl md:mb-0"
                />
            </div>
            <div className="flex flex-col justify-between space-y-4 md:space-y-0">
                <h3 className="text-2xl font-semibold text-balance md:w-[600px] md:text-6xl">
                    {data.name}
                </h3>
                <div className="flex flex-row justify-start">
                    <Button asChild size="lg" className="w-32 md:w-40">
                        <Link href={`/beers/${data.slug}`}>Back to beer</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default BeerReviewsHeading;
