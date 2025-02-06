import { SearchParams } from "nuqs/server";

import { getAllBreweriesPage } from "@/actions/breweries";
import { searchParamsCache } from "@/lib/searchParamsCache";
import BreweriesContainer from "@/components/breweries/listing/BreweriesContainer";

const BreweriesPage = async ({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = searchParamsCache.parse(await searchParams);

    // const params = { sort, page, pageSize, view };
    const breweries = await getAllBreweriesPage({
        sort: params.sort,
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        search: params.search,
        country: params.country
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
            <BreweriesContainer
                breweries={breweries.data}
                total={breweries.total || 0}
                params={params}
                filters={breweries.filters}
            />
        </>
    );
};
export default BreweriesPage;
