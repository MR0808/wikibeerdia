import { redirect } from "next/navigation";

import getSession from "@/lib/session";
import { checkAuthenticated } from "@/lib/auth";
import { getBreweries } from "@/actions/breweries";
import BeerForm from "@/components/beers/BeerForm";
import { BeerSubmitSearchParams } from "@/types/beers";

const SubmitBeerPage = async ({
    searchParams
}: {
    searchParams?: BeerSubmitSearchParams;
}) => {
    const user = await checkAuthenticated();
    if (!user) {
        redirect("/login");
    }

    const breweryId = searchParams?.brewery || undefined;
    const session = await getSession();
    const breweries = await getBreweries();

    return (
        <>
            <div className="mx-auto mt-36 flex h-16 w-[55%] flex-col justify-between space-y-12 sm:justify-between sm:space-x-0 md:space-x-4">
                <div className="flex w-full flex-col justify-between">
                    <div className="flex flex-col gap-y-5">
                        <h1 className="text-4xl font-semibold">Add Beer</h1>
                    </div>
                </div>
            </div>
            <BeerForm
                breweryId={breweryId}
                session={session}
                breweries={breweries.data}
            />
        </>
    );
};

export default SubmitBeerPage;
