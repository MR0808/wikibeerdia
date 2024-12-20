"use client";

import { Style } from "@prisma/client";
import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { StyleProps } from "@/utils/types";

import { CreateStyleDialog } from "./CreateStyleDialog";

interface StylesTableToolbarActionsProps {
    table: Table<StyleProps>;
    parentStyleId: string;
}

export const StylesTableToolbarActions = ({
    table,
    parentStyleId
}: StylesTableToolbarActionsProps) => {
    return (
        <div className="flex items-center gap-2">
            <CreateStyleDialog parentStyleId={parentStyleId} />
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
