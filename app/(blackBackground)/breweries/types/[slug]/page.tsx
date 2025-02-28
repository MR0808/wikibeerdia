import { biorhyme } from "@/app/fonts";
import { redirect } from "next/navigation";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import { getBreweryTypesList } from "@/actions/breweryTypes";
import BreweriesTypesSlugContainer from "@/components/breweries/listing/typesslug/BreweriesTypesSlugContainer";
import {
    getBreweriesByType,
    getBreweriesByTypesTotal
} from "@/actions/breweries";
import { ParamsSlug } from "@/utils/types";

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
