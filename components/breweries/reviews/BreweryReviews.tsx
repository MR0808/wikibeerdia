"use client";

import { useState, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import RatingSummary from "@keyvaluesystems/react-star-rating-summary";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { ReviewsType } from "@/types/breweries";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getBreweryReviews } from "@/actions/breweries";
import { cn } from "@/lib/utils";
import AddReviewDialog from "@/components/reviews/AddReviewDialog";
import ReviewSkeleton from "@/components/reviews/ReviewSkeleton";

interface BreweryReviewsProps {
    initialReviews: ReviewsType[];
    breweryId: string;
    totalReviews: number;
    reviewDoesNotExist: boolean | undefined;
    ratingValues: Object;
}

const NUMBER_OF_REVIEWS_TO_FETCH = 20;

const BreweryReviews = ({
    initialReviews,
    breweryId,
    totalReviews,
    reviewDoesNotExist,
    ratingValues
}: BreweryReviewsProps) => {
    const maxReviews = 20;
    const [openAddReview, setOpenAddReview] = useState(false);
    const [order, setOrder] = useState("recent");
    const [reviews, setReviews] = useState<ReviewsType[]>(initialReviews);
    const [isPending, setIsPending] = useState(false);
    const [offset, setOffset] = useState(NUMBER_OF_REVIEWS_TO_FETCH);
    const [isPendingReviews, startTransition] = useTransition();

    const updateReviews = async (value: string) => {
        setIsPending(true);
        setOrder(value);
        setOffset(NUMBER_OF_REVIEWS_TO_FETCH);
        const data = await getBreweryReviews(
            breweryId,
            0,
            NUMBER_OF_REVIEWS_TO_FETCH,
            value
        );
        setReviews([...data]);
        setIsPending(false);
    };

    const loadMoreReviews = () => {
        startTransition(async () => {
            console.log(offset);
            const moreReviews = await getBreweryReviews(
                breweryId,
                offset,
                NUMBER_OF_REVIEWS_TO_FETCH,
                order
            );
            setReviews((reviews) => [...reviews, ...moreReviews]);
            setOffset((offset) => offset + NUMBER_OF_REVIEWS_TO_FETCH);
        });
    };

    const refreshReviewsOnSubmit = async (review: ReviewsType) => {
        setIsPending(true);
        const copyReviews = [...reviews];
        setReviews([review, ...copyReviews]);
        setIsPending(false);
    };

    return (
        <>
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
                    {reviewDoesNotExist && (
                        <div className="mt-4">
                            <AddReviewDialog
                                type="brewery"
                                id={breweryId}
                                refreshReviewsOnSubmit={refreshReviewsOnSubmit}
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
                                        type="BREWERYREVIEW"
                                    />
                                );
                            })}
                            <div
                                className={`mx-auto mt-10 flex flex-row items-center justify-center ${maxReviews >= totalReviews && "hidden"}`}
                            >
                                <Button
                                    type="submit"
                                    disabled={isPendingReviews}
                                    className={cn("capitalize")}
                                    size="lg"
                                    onClick={loadMoreReviews}
                                >
                                    {isPendingReviews ? (
                                        <>
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait...
                                        </>
                                    ) : (
                                        "Load more..."
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default BreweryReviews;
