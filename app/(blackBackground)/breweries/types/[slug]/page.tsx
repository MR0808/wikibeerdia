import { biorhyme } from "@/app/fonts";
import { redirect } from "next/navigation";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import {
    getBreweryTypesList,
    getAllBreweryTypesMetadata,
    getBreweryTypeMetadata
} from "@/actions/breweryTypes";
import BreweriesTypesSlugContainer from "@/components/breweries/listing/typesslug/BreweriesTypesSlugContainer";
import {
    getBreweriesByType,
    getBreweriesByTypesTotal
} from "@/actions/breweries";
import { ParamsSlug } from "@/utils/types";
import siteMetadata from "@/utils/siteMetaData";

export async function generateStaticParams() {
    const data = await getAllBreweryTypesMetadata();
    return data.map((type) => ({ slug: type }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getBreweryTypeMetadata(slug);
    if (!data) {
        return;
    }
    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    const authors = siteMetadata.author;
    const title = `Beers by Style | ${data.name}`;
    const description = "Find your next favourite brewery whatever the style!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/breweries/types/${slug}`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "website",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages
        }
    };
}

const BeersStylesParentPage = async (props: { params: ParamsSlug }) => {
    const { slug } = await props.params;

    const { data: breweryTypes } = await getBreweryTypesList();

    const foundItem = breweryTypes.find((item) => item.slug === slug);
    if (!foundItem) redirect("/breweries/types");

    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: ["breweriesByType", slug],
        queryFn: ({ pageParam }) =>
            getBreweriesByType({
                slug,
                page: pageParam
            }),
        initialPageParam: 0
    });

    const total = await getBreweriesByTypesTotal(slug);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="bg-types-breweries-bg h-84 bg-black bg-cover bg-top drop-shadow-lg md:h-96">
                <div className="h-full bg-black/70">
                    <div
                        className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-32 align-bottom text-5xl font-semibold text-white md:pt-48 md:text-6xl`}
                    >
                        <div>Breweries of any type...</div>
                    </div>
                </div>
            </div>
            <BreweriesTypesSlugContainer
                breweryTypes={breweryTypes}
                initialTotal={total}
                slug={slug}
            />
        </HydrationBoundary>
    );
};
export default BeersStylesParentPage;
