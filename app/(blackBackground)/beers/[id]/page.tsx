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

import { Params } from "@/utils/types";
import getRatings from "@/lib/ratings";
import { getBeer, getBeerReviews, findExistingReview } from "@/actions/beers";
import BeerSkeleton from "@/components/beers/view/BeerSkeleton";
import BeerHeader from "@/components/beers/view/BeerHeader";
import BeerReviews from "@/components/beers/view/BeerReviews";

const BeerDetailsPage = async (props: { params: Params }) => {
    const params = await props.params;
    const { data } = await getBeer(params.id);
    if (!data) redirect("/beers/");

    const user = await currentUser();
    if (
        data.status !== "APPROVED" &&
        (data.userId !== user?.id || user.role !== "ADMIN")
    )
        redirect("/beers/");

    const reviews = await getBeerReviews(params.id, 0, 5);

    const ratings = data.beerReviews.map((review) => {
        return review.rating;
    });

    const ratingValues = getRatings(ratings);

    let rating = 0;

    if (ratings.length > 0)
        rating = ratings.reduce((a, b) => a + b) / ratings.length;

    const reviewDoesNotExist =
        user && !(await findExistingReview(user.id, params.id));

    console.log(reviewDoesNotExist);

    return (
        <div className="container mt-32 flex h-16 flex-col justify-between px-4 sm:justify-between sm:space-x-0 md:px-28">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-base" href="/beers">
                            Breweries
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className="text-base"
                            href={`/breweries/${data.breweryId}`}
                        >
                            {data.brewery.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            {data.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-10 flex flex-col justify-between space-y-10 sm:justify-between sm:space-x-0">
                <Suspense fallback={<BeerSkeleton />}>
                    <BeerHeader
                        data={data}
                        user={user}
                        rating={rating}
                        totalReviews={ratings.length}
                    />
                    <div className="h-auto w-full rounded-lg bg-white p-5 shadow-lg md:p-14">
                        <h4 className="mb-5 text-4xl">{`"${data.headline}"`}</h4>
                        <p className="whitespace-pre-wrap text-lg leading-8">
                            {data.description}
                        </p>
                    </div>
                    <BeerReviews
                        initialReviews={reviews}
                        beerId={params.id}
                        totalReviews={ratings.length}
                        reviewDoesNotExist={reviewDoesNotExist}
                        ratingValues={ratingValues}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default BeerDetailsPage;