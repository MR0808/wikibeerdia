import { biorhyme } from "@/app/fonts";
import { redirect } from "next/navigation";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import { getParentStyles } from "@/actions/beerStyles";
import BeersStylesSlugContainer from "@/components/beers/listing/stylesslug/BeersStylesSlugContainer";
import { getBeersByStyles, getBeersByStylesTotal } from "@/actions/beers";
import { ParamsParentSlug } from "@/utils/types";

const BeersStylesParentPage = async (props: { params: ParamsParentSlug }) => {
    const { parentSlug } = await props.params;

    const { data: parentStyles } = await getParentStyles();

    const foundItem = parentStyles.find((item) => item.slug === parentSlug);
    if (!foundItem) redirect("/beers/styles");

    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: ["beersByStyle", "all", parentSlug],
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
                        className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-32 align-bottom text-5xl font-semibold text-white md:pt-48 md:text-6xl`}
                    >
                        <div>Beers in any style you want...</div>
                    </div>
                </div>
            </div>
            <BeersStylesSlugContainer
                parentStyles={parentStyles}
                initialTotal={total}
                parentSlug={parentSlug}
                styleSlug="all"
            />
        </HydrationBoundary>
    );
};
export default BeersStylesParentPage;
