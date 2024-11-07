"use client";
"use memo";

import { use, useMemo } from "react";
import { Brewery } from "@prisma/client";

import { type DataTableFilterField } from "@/utils/types";
import { statusLabels } from "@/utils/types";

import { useDataTable } from "@/hooks/useDataTable";
import { DataTableAdvancedToolbar } from "@/components/datatable/advanced/DataTableAdvancedToolbar";
import { DataTable } from "@/components/datatable/DataTable";
import { DataTableToolbar } from "@/components/datatable/DataTableToolbar";

import { type getBreweriesSearch } from "@/actions/breweries";
import { getStatusIcon } from "@/lib/utils";
import { getColumns } from "./BreweriesTableColumns";
import { BreweriesTableFloatingBar } from "./BreweriesTableFloatingBar";
import { useBreweriesTable } from "@/components/admin/breweries/BreweriesTableProviders";
import { BreweriesTableToolbarActions } from "./BreweriesTableToolbarActions";

interface BreweriesTableProps {
    breweriesPromise: ReturnType<typeof getBreweriesSearch>;
}

export const BreweriesTable = ({ breweriesPromise }: BreweriesTableProps) => {
    // Feature flags for showcasing some additional features. Feel free to remove them.
    const { featureFlags } = useBreweriesTable();

    const { data, pageCount } = use(breweriesPromise);

    // Memoize the columns so they don't re-render on every render
    const columns = useMemo(() => getColumns(), []);

    /**
     * This component can render either a faceted filter or a search filter based on the `options` prop.
     *
     * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
     *
     * Each `option` object has the following properties:
     * @prop {string} label - The label for the filter option.
     * @prop {string} value - The value for the filter option.
     * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
     * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
     */
    const filterFields: DataTableFilterField<Brewery>[] = [
        {
            label: "Name",
            value: "name",
            placeholder: "Filter names..."
        },
        {
            label: "Status",
            value: "status",
            options: statusLabels.map((status) => ({
                label: status.label,
                value: status.value,
                icon: getStatusIcon(status.value),
                withCount: true
            }))
        }
    ];

    const { table } = useDataTable({
        data,
        columns,
        pageCount,
        /* optional props */
        filterFields,
        enableAdvancedFilter: featureFlags.includes("advancedFilter"),
        initialState: {
            sorting: [{ id: "name", desc: false }],
            columnPinning: { right: ["actions"] }
        },
        // For remembering the previous row selection on page change
        getRowId: (originalRow, index) => `${originalRow.id}-${index}`
        /* */
    });

    return (
        <DataTable
            table={table}
            floatingBar={
                featureFlags.includes("floatingBar") ? (
                    <BreweriesTableFloatingBar table={table} />
                ) : null
            }
        >
            {featureFlags.includes("advancedFilter") ? (
                <DataTableAdvancedToolbar
                    table={table}
                    filterFields={filterFields}
                >
                    <BreweriesTableToolbarActions table={table} />
                </DataTableAdvancedToolbar>
            ) : (
                <DataTableToolbar table={table} filterFields={filterFields}>
                    <BreweriesTableToolbarActions table={table} />
                </DataTableToolbar>
            )}
        </DataTable>
    );
};
