import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { getAllBreweriesPage } from "@/actions/breweries";
import { searchParamsCacheBreweriesMain } from "@/lib/searchParamsCacheBreweriesMain";
import BreweriesContainer from "@/components/breweries/listing/BreweriesContainer";

const BreweriesPage = async ({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = searchParamsCacheBreweriesMain.parse(await searchParams);

    // const params = { sort, page, pageSize, view };
    const breweries = await getAllBreweriesPage({
        sort: params.sort,
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        search: params.search,
        country: params.country,
        type: params.type,
        beers: params.beers,
        rating: params.rating
    });

    return (
        <>
            <div className="bg-breweries-bg h-80 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/50">
                    <div className="container my-auto h-full content-center pt-20 text-5xl font-semibold text-white">
                        Search and find your next brewery
                    </div>
                </div>
            </div>
            <Suspense>
                <BreweriesContainer
                    breweries={breweries.data}
                    total={breweries.total || 0}
                    filters={breweries.filters}
                    highestBeers={breweries.highestBeers || 100}
                />
            </Suspense>
        </>
    );
};
export default BreweriesPage;
