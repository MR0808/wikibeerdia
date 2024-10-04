import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import type { SearchParamsProps } from "@/utils/types";
import { StylesTable } from "@/components/admin/beer-styles/StylesTable";
import { StylesTableProvider } from "@/components/admin/beer-styles/StylesTableProviders";
import { DataTableSkeleton } from "@/components/datatable/DataTableSkeleton";
import { SearchParamsSchema } from "@/schemas/admin";
import { getBeerStyles, getParentStyles } from "@/actions/beerStyles";
import { DateRangePicker } from "@/components/datatable/DateRangePicker";

const BreweryTypesPage = ({ searchParams }: SearchParamsProps) => {
    const search = SearchParamsSchema.parse(searchParams);

    const stylesPromise = getBeerStyles(search);

    const parentStyles = getParentStyles();

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
                            Beer Styles
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mb-14 mt-8 flex w-80 flex-row justify-between sm:w-1/2">
                <h1 className="text-4xl font-semibold">Brewery Types</h1>
            </div>
            <div className="flex flex-col-reverse gap-x-16 sm:flex-row">
                <div className="flex w-80 flex-col sm:w-full">
                    <StylesTableProvider>
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
                            {/* <TypesTable
                                data={typesPromise.data}
                                pageCount={typesPromise.pageCount}
                            /> */}
                            <StylesTable
                                stylesPromise={stylesPromise}
                                parentStyles={parentStyles}
                            />
                        </Suspense>
                    </StylesTableProvider>
                </div>
            </div>
        </div>
    );
};

export default BreweryTypesPage;
