import { biorhyme } from "@/app/fonts";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import { getBeersAZ, getBeersAZTotal } from "@/actions/beers";
import BeersAZContainer from "@/components/beers/listing/az/BeersAZContainer";
import siteMetadata from "@/utils/siteMetaData";

export async function generateStaticParams() {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );
    const finalAlpha = [...alphabet, "NUMBER"];
    return finalAlpha.map((alpha) => ({ letter: alpha }));
}

export async function generateMetadata({
    searchParams
}: {
    searchParams: Promise<{ letter: string }>;
}) {
    let { letter } = await searchParams;
    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });
    if (!letter) letter = "A";
    const authors = siteMetadata.author;
    const title = `A-Z of beers | ${letter}`;
    const description = "Find your next favourite beer starting with the A-Z!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/beers/az?letter=${letter}`,
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

const BeersAlphabetPage = async ({
    searchParams
}: {
    searchParams: Promise<{ letter: string }>;
}) => {
    const { letter } = await searchParams;
    const capLetter = letter ? letter.toUpperCase() : "A";
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["breweriesAZ"],
        queryFn: ({ pageParam }) =>
            getBeersAZ({
                page: pageParam,
                letter: letter
            }),
        initialPageParam: 0
    });

    const total = await getBeersAZTotal(letter);
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="bg-az-bg h-96 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/70">
                    <div
                        className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-40 align-bottom text-6xl font-semibold text-white`}
                    >
                        <div>Breweries</div>
                        <div>A - Z</div>
                    </div>
                </div>
            </div>

            <BeersAZContainer total={total || 0} letter={capLetter} />
        </HydrationBoundary>
    );
};
export default BeersAlphabetPage;
