import { biorhyme } from "@/app/fonts";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import { getCountriesBeers, getCountriesBeersTotal } from "@/actions/beers";
import BeersCountryContainer from "@/components/beers/listing/country/BeersCountryContainer";
import siteMetadata from "@/utils/siteMetaData";

export async function generateStaticParams() {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );
    return alphabet.map((alpha) => ({ letter: alpha }));
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
    if (!letter) letter = "All";
    const authors = siteMetadata.author;
    const title = `Beers by Country | ${letter}`;
    const description = "Find your next favourite beer around the world!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/beers/country?letter=${letter}`,
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

const BeersCountryPage = async ({
    searchParams
}: {
    searchParams: Promise<{ letter: string }>;
}) => {
    const { letter } = await searchParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["beersCountry"],
        queryFn: ({ pageParam }) =>
            getCountriesBeers({
                page: pageParam,
                letter
            }),
        initialPageParam: 0
    });
    const total = await getCountriesBeersTotal(letter);
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="bg-country-beers-bg h-84 bg-black bg-cover bg-center drop-shadow-lg md:h-96">
                <div className="h-full bg-black/70">
                    <div
                        className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-32 align-bottom text-5xl font-semibold text-white md:pt-48 md:text-6xl`}
                    >
                        <div>Beers Around the Globe</div>
                    </div>
                </div>
            </div>
            <BeersCountryContainer total={total} letter={letter} />
        </HydrationBoundary>
    );
};
export default BeersCountryPage;
