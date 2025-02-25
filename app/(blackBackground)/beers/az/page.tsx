import { biorhyme } from "@/app/fonts";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import { getBeersAZ, getBeersAZTotal } from "@/actions/beers";
import BeersAZContainer from "@/components/beers/listing/az/BeersAZContainer";

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
