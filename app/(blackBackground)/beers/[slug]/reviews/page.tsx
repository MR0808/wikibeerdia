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
import { getBeerReviews, getBeer, findExistingReview } from "@/actions/beers";
import { ParamsSlug } from "@/utils/types";
import getRatings from "@/lib/ratings";
import BeerReviews from "@/components/beers/reviews/BeerReviews";
import BeerReviewsHeading from "@/components/beers/reviews/BeerReviewsHeading";
import BeerReviewsSkeleton from "@/components/beers/reviews/BeerReviewsSkeleton";
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
    const { data: beer } = await getBeer(slug);
    if (!beer) {
        return;
    }

    const publishedAt = new Date(beer.createdAt).toISOString();
    const modifiedAt = new Date(beer.updatedAt || beer.createdAt).toISOString();

    let imageList = [];
    if (beer.images) {
        for (const image of beer.images) {
            imageList.push(image.image);
        }
    }
    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;

    return {
        title: ` Beers | ${beer.name} | Reviews`,
        description: beer.headline,
        openGraph: {
            title: `${beer.name} | Reviews`,
            description: beer.headline,
            url: `${siteMetadata.siteUrl}/beers/${beer.id}`,
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
            title: `${beer.name} | Reviews`,
            description: beer.headline,
            images: ogImages
        }
    };
}

const BeerReviewsPage = async (props: { params: Promise<ParamsSlug> }) => {
    const { slug } = await props.params;
    const { data } = await getBeer(slug);
    if (!data) redirect("/beers/");

    const newData = { ...data, abv: data.abv.toString() };

    const id = data.id;

    const reviews = await getBeerReviews(id, 0, 20);

    const user = await currentUser();

    const ratings = data.beerReviews.map((review) => {
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
                            href={`/beers/${data.slug}`}
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
                <Suspense fallback={<BeerReviewsSkeleton />}>
                    <div
                        className="mt-12 flex flex-row md:mt-16 md:space-x-3"
                        id="reviews"
                    >
                        <div className="mb-5 h-auto w-full items-center rounded-lg bg-white p-5 shadow-lg md:mb-20 md:p-14">
                            <BeerReviewsHeading
                                data={newData}
                                user={user}
                                rating={rating}
                                totalReviews={ratings.length}
                            />
                            <BeerReviews
                                initialReviews={reviews}
                                beerId={id}
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

export default BeerReviewsPage;
