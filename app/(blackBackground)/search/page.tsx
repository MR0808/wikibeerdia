import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { searchParamsCacheSearch } from "@/lib/searchParamsCacheSearch";
import SearchContainer from "@/components/search/SearchContainer";
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
        query: params.q
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
                <SearchContainer results={results} />
            </Suspense>
        </>
    );
};
export default SearchPage;
