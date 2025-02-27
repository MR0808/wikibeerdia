import { biorhyme } from "@/app/fonts";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import { getParentStyles } from "@/actions/beerStyles";
import BeersStylesContainer from "@/components/beers/listing/styles/BeersStylesContainer";
import { getBeersByStyles, getBeersByStylesTotal } from "@/actions/beers";

const BeersStylesPage = async () => {
    const { data: parentStyles } = await getParentStyles();
    const parentSlug = parentStyles[0].slug;
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["breweriesByStyle"],
        queryFn: ({ pageParam }) =>
            getBeersByStyles({
                slug: "all",
                parentSlug,
                page: pageParam
            }),
        initialPageParam: 0
    });

    const total = await getBeersByStylesTotal("all", parentSlug);
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="bg-styles-beers-bg h-84 bg-black bg-cover bg-center drop-shadow-lg md:h-96">
                <div className="h-full bg-black/70">
                    <div
                        className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-32 align-bottom text-6xl font-semibold text-white md:pt-48`}
                    >
                        <div>Beers in any style you want...</div>
                    </div>
                </div>
            </div>
            <BeersStylesContainer
                parentStyles={parentStyles}
                initialTotal={total}
            />
        </HydrationBoundary>
    );
};
export default BeersStylesPage;
