import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { getAllBeersPage } from "@/actions/beers";
import { searchParamsCacheBeersMain } from "@/lib/searchParamsCacheBeersMain";
import BeersContainer from "@/components/beers/listing/BeersContainer";
import siteMetadata from "@/utils/siteMetaData";

export async function generateMetadata() {
    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;
    const title = "Find a beer";
    const description = "Find your next favourite beer!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/beers`,
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

const BreweriesPage = async ({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = searchParamsCacheBeersMain.parse(await searchParams);

    const beers = await getAllBeersPage({
        sort: params.sort,
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        search: params.search,
        country: params.country,
        style: params.style,
        brewery: params.brewery,
        abv: params.abv,
        ibu: params.ibu,
        yearCreated: params.yearCreated,
        available: params.available,
        rating: params.rating
    });

    const highest = {
        abv: beers.highestAbv?.toString() || "0",
        ibu: beers.highestIbu?.toString() || "0",
        yearMax:
            beers.highestYear?.toString() ||
            new Date().getFullYear().toString(),
        yearMin: beers.lowerstYear?.toString() || "1900"
    };

    return (
        <>
            <div className="bg-beers-bg h-80 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/50">
                    <div className="container my-auto h-full content-center pt-20 text-5xl font-semibold text-white">
                        Search and find your next beer
                    </div>
                </div>
            </div>
            <Suspense>
                <BeersContainer
                    beers={beers.data}
                    total={beers.total || 0}
                    filters={beers.filters}
                    highest={highest}
                />
            </Suspense>
        </>
    );
};
export default BreweriesPage;
