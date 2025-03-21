import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { SearchParams } from "@/utils/types";
import { BreweriesTable } from "@/components/admin/breweries/BreweriesTable";
import { BreweriesTableProvider } from "@/components/admin/breweries/BreweriesTableProviders";
import { DataTableSkeleton } from "@/components/datatable/DataTableSkeleton";
import { typesSearchParamsSchema } from "@/schemas/admin";
import { getBreweriesSearch } from "@/actions/breweries";
import { DateRangePicker } from "@/components/datatable/DateRangePicker";
import { checkAuthenticated } from "@/lib/auth";

export async function generateMetadata() {
    return {
        title: "Admin | Breweries",
        description: "Wikibeerdia Breweries"
    };
}

const BreweriesPage = async (props: { searchParams: SearchParams }) => {
    const searchParams = await props.searchParams;
    const user = checkAuthenticated(true);
    if (!user) {
        redirect("/login");
    }

    const search = typesSearchParamsSchema.parse(searchParams);

    const breweriesPromise = getBreweriesSearch(search);

    return (
        <div className="container mt-36 flex h-16 flex-col justify-between sm:justify-between sm:space-x-0">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-base" href="/admin">
                            Admin
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            Breweries
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-8 mb-14 flex w-80 flex-row justify-between sm:w-1/2">
                <h1 className="text-4xl font-semibold">Breweries</h1>
            </div>
            <div className="flex flex-col-reverse gap-x-16 sm:flex-row">
                <div className="flex w-80 flex-col sm:w-full">
                    <BreweriesTableProvider>
                        <Suspense fallback={<Skeleton className="h-7 w-52" />}>
                            <DateRangePicker
                                triggerSize="sm"
                                triggerClassName="ml-auto w-56 sm:w-60"
                                align="end"
                            />
                        </Suspense>
                        <Suspense
                            fallback={
                                <DataTableSkeleton
                                    columnCount={5}
                                    searchableColumnCount={1}
                                    filterableColumnCount={2}
                                    cellWidths={[
                                        "10rem",
                                        "40rem",
                                        "12rem",
                                        "12rem",
                                        "8rem"
                                    ]}
                                    shrinkZero
                                />
                            }
                        >
                            <BreweriesTable
                                breweriesPromise={breweriesPromise}
                            />
                        </Suspense>
                    </BreweriesTableProvider>
                </div>
            </div>
        </div>
    );
};
export default BreweriesPage;
