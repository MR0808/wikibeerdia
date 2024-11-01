"use client";

import { useState } from "react";
import RatingSummary from "@keyvaluesystems/react-star-rating-summary";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import ReviewSkeleton from "@/components/reviews/ReviewSkeleton";
import { Button } from "@/components/ui/button";
import { BreweryReviewsType } from "@/types/breweries";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getBreweryReviews } from "@/actions/breweries";
import AddReviewDialog from "@/components/reviews/AddReviewDialog";
import Link from "next/link";

interface BreweryReviewsProps {
    initialReviews: BreweryReviewsType[];
    breweryId: string;
    totalReviews: number;
    reviewDoesNotExist: boolean | undefined;
    ratingValues: Object;
}

const BreweryReviews = ({
    initialReviews,
    breweryId,
    totalReviews,
    reviewDoesNotExist,
    ratingValues
}: BreweryReviewsProps) => {
    const maxReviews = 5;
    const [openAddReview, setOpenAddReview] = useState(false);
    const [reviews, setReviews] =
        useState<BreweryReviewsType[]>(initialReviews);
    const [isPending, setIsPending] = useState(false);

    const updateReviews = async (value: string) => {
        setIsPending(true);
        const data = await getBreweryReviews(breweryId, 0, 5, value);
        setReviews([...data]);
        setIsPending(false);
    };

    const refreshReviewsOnSubmit = async (review: BreweryReviewsType) => {
        setIsPending(true);
        const copyReviews = [...reviews];
        if (copyReviews.length === 5) copyReviews.pop();
        setReviews([review, ...copyReviews]);
        setIsPending(false);
    };

    return (
        <div className="mt-12 flex flex-row md:mt-16 md:space-x-3" id="reviews">
            <div className="w-full">
                <div className="mb-5 h-auto w-full items-center rounded-lg bg-white p-5 shadow-lg md:mb-20 md:p-14">
                    <div className="mb-10 flex flex-col justify-between md:flex-row">
                        <h4 className="mb-5 text-4xl">Reviews</h4>
                        <div>
                            <Select
                                onValueChange={(value) => updateReviews(value)}
                                defaultValue="recent"
                            >
                                <SelectTrigger className="h-14 w-52 rounded-lg border-neutral-200 bg-white px-5">
                                    <SelectValue placeholder="Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">
                                        Recent reviews
                                    </SelectItem>
                                    <SelectItem value="desc">
                                        Rating - Highest First
                                    </SelectItem>
                                    <SelectItem value="asc">
                                        Rating - Lowest First
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5 md:flex-row md:space-x-10 md:space-y-0">
                        <div className="flex flex-col md:w-1/3">
                            <RatingSummary
                                ratings={ratingValues}
                                thousandsSeparator=","
                                ratingAverageIconProps={{
                                    fillColor: "#f97316"
                                }}
                                barColors={{
                                    5: "#f97316",
                                    4: "#f97316",
                                    3: "#f97316",
                                    2: "#f97316",
                                    1: "#f97316"
                                }}
                                ratingLabelIconProps={{
                                    fillColor: "#f97316",
                                    borderColor: "#f97316"
                                }}
                            />
                            {!reviewDoesNotExist && (
                                <div className="mt-4">
                                    <AddReviewDialog
                                        type="brewery"
                                        id={breweryId}
                                        refreshReviewsOnSubmit={
                                            refreshReviewsOnSubmit
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-6 md:w-2/3">
                            {isPending ? (
                                <>
                                    <ReviewSkeleton />
                                    <ReviewSkeleton />
                                    <ReviewSkeleton />
                                    <ReviewSkeleton />
                                    <ReviewSkeleton />
                                </>
                            ) : (
                                <>
                                    {reviews.map((review) => {
                                        return (
                                            <ReviewCard
                                                key={review.id}
                                                review={review}
                                            />
                                        );
                                    })}
                                    <div
                                        className={`mx-auto mt-10 flex flex-row items-center justify-center ${maxReviews >= totalReviews && "hidden"}`}
                                    >
                                        <Link
                                            href={`/breweries/${breweryId}/reviews`}
                                            className="hover:underline"
                                        >
                                            Show more reviews
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreweryReviews;
