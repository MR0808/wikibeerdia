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

import type { SearchParamsProps } from "@/utils/types";
import { SubStylesTable } from "@/components/admin/subStyles/SubStylesTable";
import { SubStylesTableProvider } from "@/components/admin/subStyles/SubStylesTableProviders";
import { DataTableSkeleton } from "@/components/datatable/DataTableSkeleton";
import { SearchParamsSchema } from "@/schemas/admin";
import { getBeerSubStyles } from "@/actions/beerSubStyles";
import { getBeerStyle } from "@/actions/beerStyles";
import { getStatusIcon } from "@/lib/utils";
import { DateRangePicker } from "@/components/datatable/DateRangePicker";
import EditLink from "./EditLink";
import { checkAuthenticated } from "@/lib/auth";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const BeerStylePage = async (props: {
    params: Params;
    searchParams: SearchParams;
}) => {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const user = await checkAuthenticated(true);
    if (!user) {
        redirect("/login");
    }

    const search = SearchParamsSchema.parse(searchParams);

    const { data: styleDetails } = await getBeerStyle(params.id);

    if (!styleDetails) redirect("/admin/beer-styles");

    const subStylesPromise = getBeerSubStyles(search, params.id);

    const Icon = getStatusIcon(styleDetails.status);

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
                        <BreadcrumbLink
                            className="text-base"
                            href="/admin/beer-styles"
                        >
                            Beer Styles
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className="text-base"
                            href="/admin/beer-styles"
                        >
                            {styleDetails.parentStyle.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            {styleDetails.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mb-14 mt-8 flex w-80 flex-col justify-between gap-y-4 sm:w-1/2">
                <h1 className="text-4xl font-semibold">
                    {`${styleDetails.parentStyle.name} - ${styleDetails.name}`}
                </h1>
                <div className="flex w-[6.25rem] items-center">
                    <Icon
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                    />
                    <span className="ml-2 capitalize">
                        {styleDetails.status}
                    </span>
                </div>
                <div>{styleDetails.description}</div>
                <EditLink data={styleDetails} />
            </div>
            <div className="flex flex-col-reverse gap-x-16 sm:flex-row">
                <div className="flex w-80 flex-col sm:w-full">
                    <SubStylesTableProvider>
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
                            <SubStylesTable
                                subStylesPromise={subStylesPromise}
                                styleId={params.id}
                            />
                        </Suspense>
                    </SubStylesTableProvider>
                </div>
            </div>
        </div>
    );
};

export default BeerStylePage;
