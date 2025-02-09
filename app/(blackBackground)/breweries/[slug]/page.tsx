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
    getBrewery,
    getBreweryBeers,
    getBreweryReviews,
    findExistingReview,
    getBreweries
} from "@/actions/breweries";
import BreweryHeader from "@/components/breweries/view/BreweryHeader";
import BreweryImages from "@/components/breweries/view/BreweryImages";
import BreweryMain from "@/components/breweries/view/BreweryMain";
import BreweryBeers from "@/components/breweries/view/BreweryBeers";
import BreweryReviews from "@/components/breweries/view/BreweryReviews";
import { ParamsSlug } from "@/utils/types";
import getRatings from "@/lib/ratings";
import BrewerySkeleton from "@/components/breweries/view/BrewerySkeleton";
import siteMetadata from "@/utils/siteMetaData";

// export async function generateStaticParams() {
//     const { data: breweries } = await getBreweries();
//     return breweries.map((brewery) => ({ slug: brewery.slug }));
// }

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    let { data: brewery } = await getBrewery(slug);
    if (!brewery) {
        return;
    }

    const publishedAt = new Date(brewery.createdAt).toISOString();
    const modifiedAt = new Date(
        brewery.updatedAt || brewery.createdAt
    ).toISOString();

    let imageList = [brewery.logoUrl];
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
        title: ` Breweries | ${brewery.name}`,
        description: brewery.headline,
        openGraph: {
            title: brewery.name,
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
            title: brewery.name,
            description: brewery.headline,
            images: ogImages
        }
    };
}

const BreweryDetailsPage = async (props: { params: ParamsSlug }) => {
    const { slug } = await props.params;
    const { data } = await getBrewery(slug);
    if (!data) redirect("/breweries/");
    const id = data.id;

    const { averageRating, ...newData } = data;

    const user = await currentUser();
    if (
        data.status !== "APPROVED" &&
        (data.userId !== user?.id || user.role !== "ADMIN")
    )
        redirect("/breweries/");

    const INITIAL_NUMBER_OF_BEERS = 8;
    const beers = await getBreweryBeers(id, 0, INITIAL_NUMBER_OF_BEERS);
    const reviews = await getBreweryReviews(id, 0, 5);

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
                        <BreadcrumbPage className="text-base">
                            {data.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-10 flex flex-col justify-between sm:justify-between sm:space-x-0">
                <Suspense fallback={<BrewerySkeleton />}>
                    <BreweryHeader
                        data={newData}
                        user={user}
                        rating={rating}
                        totalReviews={ratings.length}
                    />
                    <BreweryImages data={newData} />
                    <BreweryMain data={newData} />
                    <BreweryBeers
                        initialBeers={beers}
                        breweryId={id}
                        user={user}
                        totalBeers={newData._count.beers}
                    />
                    <BreweryReviews
                        initialReviews={reviews}
                        breweryId={id}
                        totalReviews={ratings.length}
                        reviewDoesNotExist={reviewDoesNotExist}
                        ratingValues={ratingValues}
                        slug={slug}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default BreweryDetailsPage;
