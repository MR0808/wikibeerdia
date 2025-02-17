import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { getAllBeersPage } from "@/actions/beers";
import { searchParamsCacheBeersMain } from "@/lib/searchParamsCacheBeersMain";
import BeersContainer from "@/components/beers/listing/BeersContainer";

const BreweriesPage = async ({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = searchParamsCacheBeersMain.parse(await searchParams);

    // const params = { sort, page, pageSize, view };
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
                <BeersContainer
                    beers={beers.data}
                    total={beers.total || 0}
                    params={params}
                    filters={beers.filters}
                />
            </Suspense>
        </>
    );
};
export default BreweriesPage;
