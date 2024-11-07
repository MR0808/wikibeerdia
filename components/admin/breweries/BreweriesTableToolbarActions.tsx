"use client";

import { Brewery } from "@prisma/client";
import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";

interface BreweriesTableToolbarActionsProps {
    table: Table<Brewery>;
}

export const BreweriesTableToolbarActions = ({
    table
}: BreweriesTableToolbarActionsProps) => {
    return (
        <div className="flex items-center gap-2">
            <Link href="/breweries/submit" passHref>
                <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    New brewery
                </Button>
            </Link>
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "breweries",
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
