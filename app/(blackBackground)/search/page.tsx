import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { searchParamsCacheSearch } from "@/lib/searchParamsCacheSearch";
import SearchContainer from "@/components/search/SearchContainer";
import { getSearchResults } from "@/actions/search";
import siteMetadata from "@/utils/siteMetaData";

export async function generateMetadata() {
    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;
    const title = "Search Results";
    const description = "Find your next favourite brewery or beer!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/search`,
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

const SearchPage = async ({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = searchParamsCacheSearch.parse(await searchParams);

    const results = await getSearchResults({
        sort: params.sort,
        page: params.page,
        pageSize: params.pageSize,
        query: params.q,
        type: params.type,
        country: params.country,
        rating: params.rating
    });

    return (
        <>
            <div className="bg-search-bg h-80 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/50">
                    <div className="container my-auto h-full content-center pt-20 text-5xl font-semibold text-white">
                        Search Results
                    </div>
                </div>
            </div>
            <Suspense>
                <SearchContainer results={results} />
            </Suspense>
        </>
    );
};
export default SearchPage;
