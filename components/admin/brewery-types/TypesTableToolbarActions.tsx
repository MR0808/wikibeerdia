"use client";

import { BreweryType } from "@prisma/client";
import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";

import { CreateTypeDialog } from "./CreateTypeDialog";

interface TypeTableToolbarActionsProps {
    table: Table<BreweryType>;
}

export const TypeTableToolbarActions = ({
    table
}: TypeTableToolbarActionsProps) => {
    return (
        <div className="flex items-center gap-2">
            <CreateTypeDialog />
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "brewerytypes",
                        excludeColumns: ["select", "actions"]
                    })
                }
            >
                <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                Export
            </Button>
            {/**
             * Other actions can be added here.
             * For example, import, view, etc.
             */}
        </div>
    );
};
