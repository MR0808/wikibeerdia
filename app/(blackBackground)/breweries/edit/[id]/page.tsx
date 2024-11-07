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
import BreweryHeaderEdit from "@/components/breweries/edit/BreweryHeaderEdit";
import BreweryImages from "@/components/breweries/view/BreweryImages";
import BreweryMain from "@/components/breweries/view/BreweryMain";
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
                    <BreadcrumbItem>{data.name}</BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            Edit
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-10 flex flex-col justify-between sm:justify-between sm:space-x-0">
                <Suspense fallback={<BrewerySkeleton />}>
                    <BreweryHeaderEdit data={data} user={user} />
                    <BreweryImages data={data} />
                    <BreweryMain data={data} />
                </Suspense>
            </div>
        </div>
    );
};
export default BreweryEditPage;
