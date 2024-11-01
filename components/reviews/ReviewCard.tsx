"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import { Card } from "@/components/ui/card";
import Rating from "@/components/reviews/Rating";
import Comment from "@/components/reviews/Comment";
import { BreweryReviewsType } from "@/types/breweries";
import profile from "@/public/images/profile.jpg";

const ReviewCard = ({ review }: { review: BreweryReviewsType }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayDate = format(review.createdAt, "dd MMM yyyy");

    return (
        <Card className="relative p-2 md:p-6">
            <div
                className={`flex flex-col content-start items-start space-y-5 p-2 md:flex-row md:space-y-0 ${isExpanded ? "h-full" : "h-52 md:h-20"}`}
            >
                <div className="flex flex-row space-x-1 md:w-1/3">
                    <Image
                        src={review.user.image || profile}
                        alt={review.user.displayName!}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col space-y-2">
                        <Link href={`/profile/${review.user.id}`}>
                            <h3 className="text-sm font-bold capitalize hover:underline">
                                {review.user.displayName}
                            </h3>
                        </Link>
                        <Rating rating={review.rating} />
                        <div className="text-sm">{displayDate}</div>
                    </div>
                </div>
                <div className="md:w-2/3">
                    <Comment
                        comment={review.comment || ""}
                        isExpanded={isExpanded}
                        setIsExpanded={setIsExpanded}
                    />
                </div>
            </div>
        </Card>
    );
};
export default ReviewCard;
