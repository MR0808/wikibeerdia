import { connection } from "next/server";
import { assistant } from "@/app/fonts";

import { getAllBreweriesPage } from "@/actions/breweries";
import BreweriesListing from "@/components/breweries/listing/BreweriesListing";
import { Suspense } from "react";

const BreweriesPage = async (props: {
    searchParams: Promise<{
        sort: string;
        page: string;
        pageSize: string;
        view: string;
    }>;
}) => {
    await connection();
    const searchParams = await props.searchParams;
    const {
        sort = "az",
        page = "1",
        view = "grid",
        pageSize = "10"
    } = searchParams;

    const params = { sort, page, pageSize, view };
    const breweries = await getAllBreweriesPage({ sort, page, pageSize });

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
                <div className="w-full md:w-1/4">Insert filter here</div>
                <div className="flex w-full flex-col space-y-10 pb-10 md:w-3/4">
                    <Suspense>
                        <BreweriesListing
                            breweries={breweries.data}
                            total={breweries.total || 0}
                            searchParams={searchParams}
                            params={params}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
};
export default BreweriesPage;
