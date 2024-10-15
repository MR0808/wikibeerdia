import { Suspense } from "react";
import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";
import { getBrewery } from "@/actions/breweries";
import BreweryHeader from "@/components/breweries/BreweryHeader";
import BreweryImages from "@/components/breweries/BreweryImages";

const BreweryDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { data } = await getBrewery(params.id);
    const user = await currentUser();

    if (!data) redirect("/breweries/");

    if (
        data.status !== "APPROVED" &&
        (data.userId !== user?.id || user.role !== "ADMIN")
    )
        redirect("/breweries/");

    return (
        <div className="mt-32 flex h-16 flex-col justify-between px-3 md:container sm:justify-between sm:space-x-0 md:mt-60">
            <Suspense fallback={<div>Loading</div>}>
                <BreweryHeader data={data} />
                <BreweryImages data={data} />
            </Suspense>
        </div>
    );
};
export default BreweryDetailsPage;
