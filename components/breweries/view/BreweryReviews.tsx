"use client";

import { useState } from "react";
import RatingSummary from "@keyvaluesystems/react-star-rating-summary";

import { Button } from "@/components/ui/button";
import { BreweryReviewsType } from "@/types/breweries";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getBreweryReviews, totalNumberOfReviews } from "@/actions/breweries";
import { cn } from "@/lib/utils";
import AddReviewDialog from "@/components/reviews/AddReviewDialog";
import Link from "next/link";

const BreweryReviews = ({
    initialReviews,
    breweryId,
    totalReviews,
    rating,
    reviewDoesNotExist
}: {
    initialReviews: BreweryReviewsType[];
    breweryId: string;
    totalReviews: number;
    rating: number;
    reviewDoesNotExist: boolean | undefined;
}) => {
    const maxReviews = 5;
    const [openAddReview, setOpenAddReview] = useState(false);
    const ratingValues = {
        5: 100,
        4: 200,
        3: 300,
        2: 1000,
        1: 400
    };

    const [numberOfReviews, setNumberOfReviews] = useState(totalReviews);
    const [reviews, setReviews] =
        useState<BreweryReviewsType[]>(initialReviews);

    reviewDoesNotExist = true;

    const refreshReviewsOnSubmit = async (review: BreweryReviewsType) => {
        const copyReviews = [...reviews];
        if (copyReviews.length === 5) copyReviews.pop();
        setReviews([review, ...copyReviews]);
    };

    return (
        <div className="flex flex-row md:space-x-3" id="reviews">
            <div className="w-full">
                <div className="mb-5 h-auto w-full items-center rounded-lg bg-white p-5 shadow-lg md:mb-20 md:p-14">
                    <div className="mb-10 flex flex-row justify-between">
                        <h4 className="mb-5 text-4xl">Reviews</h4>
                        {reviewDoesNotExist && (
                            <>
                                <Button
                                    type="button"
                                    onClick={() => setOpenAddReview(true)}
                                >
                                    Add Review
                                </Button>
                                <AddReviewDialog
                                    openAddReview={openAddReview}
                                    setOpenAddReview={setOpenAddReview}
                                    type="brewery"
                                    id={breweryId}
                                    refreshReviewsOnSubmit={
                                        refreshReviewsOnSubmit
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className="flex flex-row space-x-10">
                        <div className="w-1/3">
                            <RatingSummary ratings={ratingValues} />
                        </div>
                        <div className="flex w-2/3 flex-col space-y-6">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreweryReviews;
