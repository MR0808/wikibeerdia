"use client";

import { SubStyle } from "@prisma/client";
import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";

import { CreateSubStyleDialog } from "./CreateSubStyleDialog";

interface SubStylesTableToolbarActionsProps {
    table: Table<SubStyle>;
    styleId: string;
}

export const SubStylesTableToolbarActions = ({
    table,
    styleId
}: SubStylesTableToolbarActionsProps) => {
    return (
        <div className="flex items-center gap-2">
            <CreateSubStyleDialog styleId={styleId} />
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "beerstyles",
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
