import { SearchParams } from "nuqs/server";

import { getAllBreweriesPage } from "@/actions/breweries";
import BreweriesListings from "@/components/breweries/listing/BreweriesListings";
import { searchParamsCache } from "@/lib/searchParamsCache";

const BreweriesPage = async ({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = searchParamsCache.parse(await searchParams);
    const breweries = await getAllBreweriesPage({ sort: params.sort });

    return (
        <>
            <div className="bg-breweries-bg h-80 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/50">
                    <div className="container my-auto h-full content-center pt-20 text-5xl font-semibold text-white">
                        Search and find your next brewery
                    </div>
                </div>
            </div>
            <BreweriesListings
                breweries={breweries.data}
                total={breweries.total || 0}
            />
        </>
    );
};
export default BreweriesPage;
