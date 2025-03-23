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
import { ParamsSlug } from "@/utils/types";
import getRatings from "@/lib/ratings";
import BreweryReviews from "@/components/breweries/reviews/BreweryReviews";
import BreweryReviewsHeading from "@/components/breweries/reviews/BreweryReviewsHeading";
import BreweryReviewsSkeleton from "@/components/breweries/reviews/BreweryReviewsSkeleton";
import siteMetadata from "@/utils/siteMetaData";

// export async function generateStaticParams() {
//     const { data: beers } = await getBeers();
//     return beers.map((beer) => ({ slug: beer.slug }));
// }

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: brewery } = await getBrewery(slug);
    if (!brewery) {
        return;
    }

    const publishedAt = new Date(brewery.createdAt).toISOString();
    const modifiedAt = new Date(
        brewery.updatedAt || brewery.createdAt
    ).toISOString();

    let imageList = [];
    imageList.push(brewery.logoUrl);
    if (brewery.images) {
        for (const image of brewery.images) {
            imageList.push(image.image);
        }
    }
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;

    return {
        title: ` Beers | ${brewery.name} | Reviews`,
        description: brewery.headline,
        openGraph: {
            title: `${brewery.name} | Reviews`,
            description: brewery.headline,
            url: `${siteMetadata.siteUrl}/breweries/${brewery.id}`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "article",
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title: `${brewery.name} | Reviews`,
            description: brewery.headline,
            images: ogImages
        }
    };
}

const BreweryReviewsPage = async (props: { params: ParamsSlug }) => {
    const params = await props.params;
    const { data } = await getBrewery(params.slug);
    if (!data) redirect("/breweries/");

    const id = data.id;

    const reviews = await getBreweryReviews(id, 0, 20);

    const user = await currentUser();

    const ratings = data.breweryReviews.map((review) => {
        return review.rating;
    });

    const ratingValues = getRatings(ratings);

    let rating = 0;

    if (ratings.length > 0)
        rating = ratings.reduce((a, b) => a + b) / ratings.length;

    const reviewDoesNotExist = user && !(await findExistingReview(user.id, id));

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
                            href={`/breweries/${data.slug}`}
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
                                breweryId={id}
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
