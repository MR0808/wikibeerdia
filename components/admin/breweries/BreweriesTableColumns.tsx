"use client";

import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";

import { Brewery } from "@/types/admin";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";

import { getStatusIcon } from "@/lib/utils";
import Link from "next/link";

export const getColumns = (): ColumnDef<Brewery>[] => {
    return [
        {
            id: "select",
            size: 40,
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                    className="translate-y-0.5"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-0.5"
                />
            ),
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <Link
                            href={`/breweries/${row.original.id}`}
                            target="_blank"
                            passHref
                        >
                            <span className="max-w-[31.25rem] truncate font-medium hover:underline">
                                {row.getValue("name")}
                            </span>
                        </Link>
                    </div>
                );
            }
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.original.status;

                if (!status) return null;

                const Icon = getStatusIcon(status);

                return (
                    <div className="flex w-[6.25rem] items-center">
                        <Icon
                            className="text-muted-foreground mr-2 size-4"
                            aria-hidden="true"
                        />
                        <span className="capitalize">{status}</span>
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                return Array.isArray(value) && value.includes(row.getValue(id));
            }
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ cell }) => formatDate(cell.getValue() as Date)
        },
        {
            id: "actions",
            cell: function Cell({ row }) {
                const [showUpdateTypeSheet, setShowUpdateTypeSheet] =
                    useState(false);

                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    aria-label="Open menu"
                                    variant="ghost"
                                    className="data-[state=open]:bg-muted flex size-8 p-0"
                                >
                                    <DotsHorizontalIcon
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={`/breweries/edit/${row.original.id}`}
                                        className="cursor-pointer"
                                    >
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                );
            },
            size: 40
        }
    ];
};
