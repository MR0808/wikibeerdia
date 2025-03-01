import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { searchParamsCacheSearch } from "@/lib/searchParamsCacheSearch";
import BeersContainer from "@/components/beers/listing/BeersContainer";
import { getSearchResults } from "@/actions/search";

const SearchPage = async ({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = searchParamsCacheSearch.parse(await searchParams);

    const results = await getSearchResults({
        sort: params.sort,
        page: params.page,
        pageSize: params.pageSize,
        query: params.search
    });

    return (
        <>
            <div className="bg-search-bg h-80 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/50">
                    <div className="container my-auto h-full content-center pt-20 text-5xl font-semibold text-white">
                        Search Results
                    </div>
                </div>
            </div>
            <Suspense>
                {/* <BeersContainer
                    beers={beers.data}
                    total={beers.total || 0}
                    filters={beers.filters}
                    highest={highest}
                /> */}
                {results.results &&
                    results.results.map((result) => {
                        return <div key={result.id}>{result.name}</div>;
                    })}
            </Suspense>
        </>
    );
};
export default SearchPage;
