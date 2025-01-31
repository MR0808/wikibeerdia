import { connection } from "next/server";
import { assistant } from "@/app/fonts";

import { getAllBreweriesPage } from "@/actions/breweries";
import BreweriesListing from "@/components/breweries/listing/BreweriesListing";

const BreweriesPage = async (props: {
    searchParams: Promise<{
        sort: string;
        page: string;
        view: string;
    }>;
}) => {
    await connection();
    const searchParams = await props.searchParams;
    const { sort = "az", page = "1", view = "grid" } = searchParams;

    const params = { sort, page, view };
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
            <div
                className={`${assistant.className} container flex flex-col-reverse space-x-10 pt-10 md:flex-row md:pt-28`}
            >
                <div className="w-full md:w-1/4">Insert filter here</div>
                <div className="flex w-full flex-col space-y-10 pb-10 md:w-3/4">
                    <BreweriesListing
                        breweries={breweries.data}
                        total={breweries.data?.length || 0}
                        searchParams={searchParams}
                        params={params}
                    />
                </div>
            </div>
        </>
    );
};
export default BreweriesPage;
