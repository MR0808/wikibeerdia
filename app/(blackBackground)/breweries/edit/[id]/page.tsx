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
import BreweryEditForm from "@/components/breweries/edit/BreweryEditForm";
import { getBreweryTypesForms } from "@/actions/breweryTypes";
import getSession from "@/lib/session";
import { Params } from "@/utils/types";
import BrewerySkeleton from "@/components/breweries/view/BrewerySkeleton";

const BreweryEditPage = async (props: { params: Params }) => {
    const params = await props.params;
    const { data } = await getBrewery(params.id);
    if (!data) redirect("/breweries/");

    const user = await currentUser();
    if (
        data.status !== "APPROVED" &&
        (data.userId !== user?.id || user.role !== "ADMIN")
    )
        redirect("/breweries/");

    const session = await getSession();
    const { data: breweryTypes } = await getBreweryTypesForms();

    return (
        <>
            <div className="container mt-32 flex h-16 flex-col justify-between px-4 sm:justify-between sm:space-x-0 md:px-28">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="text-base"
                                href="/breweries"
                            >
                                Breweries
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-base" />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="text-base"
                                href={`/breweries/${data.id}`}
                            >
                                {data.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-base" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-base">
                                Edit
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Suspense fallback={<BrewerySkeleton />}>
                <BreweryEditForm
                    data={data}
                    session={session}
                    breweryTypes={breweryTypes}
                />
            </Suspense>
        </>
    );
};
export default BreweryEditPage;