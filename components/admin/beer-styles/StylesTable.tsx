"use client";
"use memo";

import { use, useMemo } from "react";
import { type DataTableFilterField } from "@/utils/types";
import { statusLabels } from "@/utils/types";

import { useDataTable } from "@/hooks/useDataTable";
import { DataTableAdvancedToolbar } from "@/components/datatable/advanced/DataTableAdvancedToolbar";
import { DataTable } from "@/components/datatable/DataTable";
import { DataTableToolbar } from "@/components/datatable/DataTableToolbar";

import { BeerStyle } from "@/types/beerStyles";
import { type getBeerStyles, getParentStyles } from "@/actions/beerStyles";
import { getStatusIcon } from "@/lib/utils";
import { getColumns } from "./StylesTableColumns";
import { StylesTableFloatingBar } from "./StylesTableFloatingBar";
import { useStylesTable } from "@/components/admin/beer-styles/StylesTableProviders";
import { StylesTableToolbarActions } from "./StylesTableToolbarActions";

interface StylesTableProps {
    stylesPromise: ReturnType<typeof getBeerStyles>;
    parentStyles: ReturnType<typeof getParentStyles>;
}

export const StylesTable = ({
    stylesPromise,
    parentStyles
}: StylesTableProps) => {
    // Feature flags for showcasing some additional features. Feel free to remove them.
    const { featureFlags } = useStylesTable();

    const { data, pageCount } = use(stylesPromise);

    const { data: parentData } = use(parentStyles);

    // Memoize the columns so they don't re-render on every render
    const columns = useMemo(() => getColumns(parentData), []);

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
    const filterFields: DataTableFilterField<BeerStyle>[] = [
        {
            label: "Name",
            value: "name",
            placeholder: "Filter names..."
        },
        {
            label: "Parent Style",
            value: "parentStyle",
            options: parentData.map((style) => ({
                label: style.name,
                value: style.id,
                withCount: true
            }))
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
                    <StylesTableFloatingBar table={table} />
                ) : null
            }
        >
            {featureFlags.includes("advancedFilter") ? (
                <DataTableAdvancedToolbar
                    table={table}
                    filterFields={filterFields}
                >
                    <StylesTableToolbarActions
                        table={table}
                        parentStyles={parentData}
                    />
                </DataTableAdvancedToolbar>
            ) : (
                <DataTableToolbar table={table} filterFields={filterFields}>
                    <StylesTableToolbarActions
                        table={table}
                        parentStyles={parentData}
                    />
                </DataTableToolbar>
            )}
        </DataTable>
    );
};
