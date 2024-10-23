import { Suspense } from "react";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { currentUser } from "@/lib/auth";
import { getBrewery } from "@/actions/breweries";
import BreweryHeader from "@/components/breweries/BreweryHeader";
import BreweryImages from "@/components/breweries/BreweryImages";
import BreweryMain from "@/components/breweries/BreweryMain";
import BreweryBeers from "@/components/breweries/BreweryBeers";

const BreweryDetailsPage = async (props: {
    params: Promise<{ id: string }>;
}) => {
    const params = await props.params;
    const { data } = await getBrewery(params.id);
    const user = await currentUser();

    if (!data) redirect("/breweries/");

    if (
        data.status !== "APPROVED" &&
        (data.userId !== user?.id || user.role !== "ADMIN")
    )
        redirect("/breweries/");

    return (
        <div className="container mt-32 flex h-16 flex-col justify-between px-4 sm:justify-between sm:space-x-0 md:px-28">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-base" href="/breweries">
                            Breweries
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            {data.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-10 flex flex-col justify-between sm:justify-between sm:space-x-0">
                <Suspense fallback={<div>Loading</div>}>
                    <BreweryHeader data={data} user={user} />
                    <BreweryImages data={data} />
                    <BreweryMain data={data} />
                    <BreweryBeers data={data} user={user} />
                </Suspense>
            </div>
        </div>
    );
};
export default BreweryDetailsPage;
