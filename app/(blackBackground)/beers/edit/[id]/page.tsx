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
import { getBeer } from "@/actions/beers";
import BeerEditForm from "@/components/beers/edit/BeerEditForm";
import { getBeerStylesForm, getParentStyles } from "@/actions/beerStyles";
import { getBreweries } from "@/actions/breweries";
import getSession from "@/lib/session";
import { Params } from "@/utils/types";
import BeerSkeleton from "@/components/beers/view/BeerSkeleton";

const BeerEditPage = async (props: { params: Params }) => {
    const params = await props.params;
    const { data } = await getBeer(params.id);
    if (!data) redirect("/beers/");

    const user = await currentUser();
    if (
        data.status !== "APPROVED" &&
        (data.userId !== user?.id || user.role !== "ADMIN")
    )
        redirect("/breweries/");

    const session = await getSession();
    const breweries = await getBreweries();
    const parentStyles = await getParentStyles();
    const beerStyles = await getBeerStylesForm(parentStyles.data[0].id);

    return (
        <>
            <div className="container mt-32 flex h-16 flex-col justify-between px-4 sm:justify-between sm:space-x-0 md:px-28">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-base" href="/beers">
                                Breweries
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-base" />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="text-base"
                                href={`/breweries/${data.breweryId}`}
                            >
                                {data.brewery.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-base" />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="text-base"
                                href={`/beers/${data.id}`}
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
            <Suspense fallback={<BeerSkeleton />}>
                <BeerEditForm
                    data={data}
                    session={session}
                    breweries={breweries.data}
                    parentStyles={parentStyles.data}
                    beerStyles={beerStyles.data}
                />
            </Suspense>
        </>
    );
};
export default BeerEditPage;
