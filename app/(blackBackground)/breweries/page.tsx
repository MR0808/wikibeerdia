import { getAllBreweriesPage } from "@/actions/breweries";
import BreweriesListings from "@/components/breweries/listing/BreweriesListings";
import { Suspense } from "react";
import BreweriesGridSkeleton from "@/components/breweries/listing/BreweriesGridSkeleton";

const BreweriesPage = async (props: {
    searchParams: Promise<{
        sort: string;
        page: string;
    }>;
}) => {
    const searchParams = await props.searchParams;
    const { sort = "az", page = "1" } = searchParams;

    const params = { sort, page };
    const breweries = await getAllBreweriesPage({ sort });

    return (
        <>
            <div className="bg-breweries-bg h-80 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/50">
                    <div className="container my-auto h-full content-center pt-20 text-5xl font-semibold text-white">
                        Search and find your next brewery
                    </div>
                </div>
            </div>
            <Suspense
                fallback={<BreweriesGridSkeleton />}
                key={JSON.stringify(searchParams)}
            >
                <BreweriesListings
                    breweries={breweries.data}
                    total={breweries.total || 0}
                    searchParams={searchParams}
                    params={params}
                />
            </Suspense>
        </>
    );
};
export default BreweriesPage;
