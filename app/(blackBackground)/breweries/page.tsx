import { assistant } from "@/app/fonts";
import { SearchParams } from "nuqs/server";

import { getAllBreweriesPage } from "@/actions/breweries";
import BreweriesListing from "@/components/breweries/listing/BreweriesListing";
import BreweriesFilter from "@/components/breweries/listing/BreweriesFilter";
import { searchParamsCache } from "@/lib/searchParamsCache";

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
        pageSize: params.pageSize.toString()
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
            <div
                className={`${assistant.className} flex flex-col-reverse space-x-10 px-5 pt-10 md:container md:flex-row md:px-0 md:pt-28`}
            >
                <div className="w-full md:w-1/4">
                    <BreweriesFilter params={params} />
                </div>
                <div className="flex w-full flex-col space-y-10 pb-10 md:w-3/4">
                    <BreweriesListing
                        breweries={breweries.data}
                        total={breweries.total || 0}
                        params={params}
                    />
                </div>
            </div>
        </>
    );
};
export default BreweriesPage;
