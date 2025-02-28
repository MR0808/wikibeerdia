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
import { getBreweryBeers } from "@/actions/breweries";
import { ParamsSlug } from "@/utils/types";
import getRatings from "@/lib/ratings";
import { getBeer, getBeerReviews, findExistingReview } from "@/actions/beers";
import BeerSkeleton from "@/components/beers/view/BeerSkeleton";
import BeerHeader from "@/components/beers/view/BeerHeader";
import BeerReviews from "@/components/beers/view/BeerReviews";
import BeerOtherBeers from "@/components/beers/view/BeerOtherBeers";
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
        title: ` Beers | ${beer.name}`,
        description: beer.headline,
        openGraph: {
            title: beer.name,
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
            title: beer.name,
            description: beer.headline,
            images: ogImages
        }
    };
}

const BeerDetailsPage = async (props: { params: ParamsSlug }) => {
    const { slug } = await props.params;
    const { data } = await getBeer(slug);
    if (!data) redirect("/beers/");
    const id = data.id;

    const newData = { ...data, abv: data.abv.toString() };

    const user = await currentUser();
    if (
        data.status !== "APPROVED" &&
        (data.userId !== user?.id || user.role !== "ADMIN")
    )
        redirect("/beers/");

    const INITIAL_NUMBER_OF_BEERS = 8;
    const beers = await getBreweryBeers(
        data.breweryId,
        0,
        INITIAL_NUMBER_OF_BEERS
    );

    const reviews = await getBeerReviews(id, 0, 5);

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
                        <BreadcrumbLink className="text-base" href="/beers">
                            Breweries
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className="text-base"
                            href={`/breweries/${data.brewery.slug}`}
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
            <div className="mt-5 flex flex-col justify-between space-y-5 sm:justify-between sm:space-x-0 md:space-y-10">
                <Suspense fallback={<BeerSkeleton />}>
                    <BeerHeader
                        data={newData}
                        user={user}
                        rating={rating}
                        totalReviews={ratings.length}
                    />
                    <div className="h-auto w-full rounded-lg bg-white p-5 shadow-lg md:p-14">
                        <h4 className="mb-5 text-4xl">{`"${data.headline}"`}</h4>
                        <p className="text-lg leading-8 whitespace-pre-wrap">
                            {data.description}
                        </p>
                    </div>
                    <BeerReviews
                        initialReviews={reviews}
                        beerId={id}
                        totalReviews={ratings.length}
                        reviewDoesNotExist={reviewDoesNotExist}
                        ratingValues={ratingValues}
                        slug={slug}
                    />
                    <BeerOtherBeers
                        initialBeers={beers}
                        breweryId={data.breweryId}
                        beerId={id}
                        totalBeers={data.brewery._count.beers}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default BeerDetailsPage;
