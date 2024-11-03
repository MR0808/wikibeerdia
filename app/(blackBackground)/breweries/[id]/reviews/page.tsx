import { Suspense } from "react";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { currentUser } from "@/lib/auth";
import {
    getBreweryReviews,
    getBrewery,
    findExistingReview
} from "@/actions/breweries";
import { Params } from "@/utils/types";
import getRatings from "@/lib/ratings";
import BreweryReviews from "@/components/breweries/reviews/BreweryReviews";
import BreweryReviewsHeading from "@/components/breweries/reviews/BreweryReviewsHeading";
import BreweryReviewsSkeleton from "@/components/breweries/reviews/BreweryReviewsSkeleton";

const BreweryReviewsPage = async (props: { params: Params }) => {
    const params = await props.params;
    const reviews = await getBreweryReviews(params.id, 0, 20);
    const { data } = await getBrewery(params.id);

    if (!data) redirect("/breweries/");
    const user = await currentUser();

    const ratings = data.breweryReviews.map((review) => {
        return review.rating;
    });

    const ratingValues = getRatings(ratings);

    let rating = 0;

    if (ratings.length > 0)
        rating = ratings.reduce((a, b) => a + b) / ratings.length;

    const reviewDoesNotExist =
        user && !(await findExistingReview(user.id, params.id));

    return (
        <div className="container mt-32 flex h-16 flex-col justify-between px-4 sm:justify-between sm:space-x-0 md:px-28">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-base" href="/breweries">
                            Breweries
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className="text-base"
                            href={`/breweries/${data.id}`}
                        >
                            {data.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            Reviews
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-10 flex flex-col justify-between sm:justify-between sm:space-x-0">
                <Suspense fallback={<BreweryReviewsSkeleton />}>
                    <div
                        className="mt-12 flex flex-row md:mt-16 md:space-x-3"
                        id="reviews"
                    >
                        <div className="mb-5 h-auto w-full items-center rounded-lg bg-white p-5 shadow-lg md:mb-20 md:p-14">
                            <BreweryReviewsHeading
                                data={data}
                                user={user}
                                rating={rating}
                                totalReviews={ratings.length}
                            />
                            <BreweryReviews
                                initialReviews={reviews}
                                breweryId={params.id}
                                totalReviews={ratings.length}
                                reviewDoesNotExist={reviewDoesNotExist}
                                ratingValues={ratingValues}
                            />
                        </div>
                    </div>
                </Suspense>
            </div>
        </div>
    );
};

export default BreweryReviewsPage;
