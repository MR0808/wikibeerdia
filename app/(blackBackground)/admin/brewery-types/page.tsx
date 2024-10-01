import { Suspense } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import LoadingTable from "@/components/global/LoadingTable";
import BreweryTypesTable from "@/components/admin/brewery-types/BreweryTypesTable";
import BreweryTypesDialog from "@/components/admin/brewery-types/BreweryTypesDialog";

const BreweryTypesPage = () => {
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
                <BreweryTypesDialog />
            </div>
            <div className="flex flex-col-reverse gap-x-16 sm:flex-row">
                <div className="flex w-80 flex-col sm:w-3/5">
                    <Suspense fallback={<LoadingTable />}>
                        <BreweryTypesTable />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default BreweryTypesPage;
