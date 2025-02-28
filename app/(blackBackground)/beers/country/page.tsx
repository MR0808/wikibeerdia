import { biorhyme } from "@/app/fonts";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";

import { getCountriesBeers, getCountriesBeersTotal } from "@/actions/beers";
import BeersCountryContainer from "@/components/beers/listing/country/BeersCountryContainer";

const BeersCountryPage = async ({
    searchParams
}: {
    searchParams: Promise<{ letter: string }>;
}) => {
    const { letter } = await searchParams;
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["beersCountry"],
        queryFn: ({ pageParam }) =>
            getCountriesBeers({
                page: pageParam,
                letter
            }),
        initialPageParam: 0
    });
    const total = await getCountriesBeersTotal(letter);
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="bg-country-beers-bg h-84 bg-black bg-cover bg-center drop-shadow-lg md:h-96">
                <div className="h-full bg-black/70">
                    <div
                        className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-32 align-bottom text-5xl font-semibold text-white md:pt-48 md:text-6xl`}
                    >
                        <div>Beers Around the Globe</div>
                    </div>
                </div>
            </div>
            <BeersCountryContainer total={total} letter={letter} />
        </HydrationBoundary>
    );
};
export default BeersCountryPage;
