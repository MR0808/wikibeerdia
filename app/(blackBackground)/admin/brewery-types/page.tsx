import { Suspense } from "react";
import type { SearchParamsProps } from "@/utils/types";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

// import LoadingTable from "@/components/global/LoadingTable";
// import BreweryTypesTable from "@/components/admin/brewery-types/BreweryTypesTable";
// import BreweryTypesDialog from "@/components/admin/brewery-types/BreweryTypesDialog";
import { TypesTableProvider } from "@/components/admin/brewery-types/TypesTableProviders";
import { DataTableSkeleton } from "@/components/datatable/DataTableSkeleton";
import { typesSearchParamsSchema } from "@/schemas/admin";
import { getBreweryTypes } from "@/actions/admin";
import { DateRangePicker } from "@/components/datatable/DateRangePicker";

const BreweryTypesPage = ({ searchParams }: SearchParamsProps) => {
    const search = typesSearchParamsSchema.parse(searchParams);

    const typesPromise = getBreweryTypes(search);

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
                            Brewery Types
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mb-14 mt-8 flex w-80 flex-row justify-between sm:w-1/2">
                <h1 className="text-4xl font-semibold">Brewery Types</h1>
            </div>
            <div className="flex flex-col-reverse gap-x-16 sm:flex-row">
                <div className="flex w-80 flex-col sm:w-3/5">
                    <TypesTableProvider>
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
                            <TypesTable typesPromise={typesPromise} />
                        </Suspense>
                    </TypesTableProvider>
                </div>
            </div>
        </div>
    );
};

export default BreweryTypesPage;
