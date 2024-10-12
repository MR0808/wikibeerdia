import { Suspense } from "react";
import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";
import { getBrewery } from "@/actions/breweries";
import BreweryHeader from "@/components/breweries/BreweryHeader";

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
        <div className="container mt-60 flex h-16 flex-col justify-between sm:justify-between sm:space-x-0">
            <Suspense>
                <BreweryHeader data={data} />
            </Suspense>
        </div>
    );
};
export default BreweryDetailsPage;
