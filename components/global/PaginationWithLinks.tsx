"use client";

import { type ReactNode } from "react";
import { MoveLeft, MoveRight, Ellipsis } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useBreweriesParams } from "@/hooks/useBreweriesParams";

export interface PaginationWithLinksProps {
    pageSizeSelectOptions?: {
        pageSizeSearchParam?: string;
        pageSizeOptions: number[];
    };
    totalCount: number;
    pageSize: number;
    page: number;
    pageSearchParam?: string;
    setPageSize: (newPageSize: number) => void;
    setPage: (newPage: number) => void;
}

/**
 * Navigate with Nextjs links (need to update your own `pagination.tsx` to use Nextjs Link)
 * 
 * @example
 * ```
 * <PaginationWithLinks
    page={1}
    pageSize={20}
    totalCount={500}
  />
 * ```
 */
const PaginationWithLinks = ({
    pageSizeSelectOptions,
    pageSize,
    totalCount,
    page,
    setPageSize,
    setPage
}: PaginationWithLinksProps) => {
    // const { setPageSize, setPage } = useBreweriesParams();

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const handleSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const renderPageNumbers = () => {
        const items: ReactNode[] = [];
        const maxVisiblePages = 5;

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <li
                        key={i}
                        className="flex size-10 items-center justify-center transition-all transition-normal delay-0 duration-200 ease-in-out"
                    >
                        <div
                            onClick={() => handlePageChange(i)}
                            className={`cursor-pointerinline-block h-full w-full rounded-[50%] text-center leading-10 ${page === i ? "bg-black text-white" : "cursor-pointer hover:bg-black hover:text-white"}`}
                        >
                            {i}
                        </div>
                    </li>
                );
            }
        } else {
            items.push(
                <li
                    key={1}
                    className="flex size-10 items-center justify-center transition-all transition-normal delay-0 duration-200 ease-in-out"
                >
                    <div
                        onClick={() => handlePageChange(1)}
                        className={`inline-block h-full w-full rounded-[50%] text-center leading-10 ${page === 1 ? "bg-black text-white" : "cursor-pointer hover:bg-black hover:text-white"}`}
                    >
                        1
                    </div>
                </li>
            );

            if (page > 3) {
                items.push(
                    <li
                        key="ellipsis-start"
                        className="flex h-10 w-10 items-center justify-center"
                    >
                        <Ellipsis />
                    </li>
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <li
                        key={i}
                        className="flex size-10 items-center justify-center transition-all transition-normal delay-0 duration-200 ease-in-out"
                    >
                        <div
                            onClick={() => handlePageChange(i)}
                            className={`inline-block h-full w-full rounded-[50%] text-center leading-10 ${page === i ? "bg-black text-white" : "cursor-pointer hover:bg-black hover:text-white"}`}
                        >
                            {i}
                        </div>
                    </li>
                );
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <li
                        key="ellipsis-end"
                        className="flex h-10 w-10 items-center justify-center"
                    >
                        <Ellipsis />
                    </li>
                );
            }

            items.push(
                <li
                    key={totalPageCount}
                    className="flex size-10 items-center justify-center transition-all transition-normal delay-0 duration-200 ease-in-out"
                >
                    <div
                        onClick={() => handlePageChange(totalPageCount)}
                        className={`inline-block h-full w-full rounded-[50%] text-center leading-10 ${page === totalPageCount ? "bg-black text-white" : "cursor-pointer hover:bg-black hover:text-white"}`}
                    >
                        {totalPageCount}
                    </div>
                </li>
            );
        }

        return items;
    };

    return (
        <div className="flex w-full flex-col items-center gap-3 md:flex-row">
            {pageSizeSelectOptions && (
                <div className="flex flex-1 flex-col gap-4">
                    <SelectRowsPerPage
                        options={pageSizeSelectOptions.pageSizeOptions}
                        setPageSize={handleSizeChange}
                        pageSize={pageSize}
                    />
                </div>
            )}
            <nav
                role="navigation"
                aria-label="pagination"
                className="mx-auto flex w-full justify-center md:justify-end"
            >
                <ul className="flex list-none flex-row items-center justify-between gap-1 text-lg max-sm:gap-0">
                    <li className="mr-2">
                        <div
                            onClick={() =>
                                handlePageChange(Math.max(page - 1, 1))
                            }
                            className={`flex flex-row items-center align-middle hover:text-slate-500 ${
                                page === 1
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            }`}
                            aria-disabled={page === 1}
                            tabIndex={page === 1 ? -1 : undefined}
                        >
                            <MoveLeft className="mr-3 align-middle" /> Previous
                        </div>
                    </li>
                    {renderPageNumbers()}
                    <li className="ml-2">
                        <div
                            onClick={() =>
                                handlePageChange(
                                    Math.min(page + 1, totalPageCount)
                                )
                            }
                            aria-disabled={page === totalPageCount}
                            tabIndex={page === totalPageCount ? -1 : undefined}
                            className={`flex flex-row items-center align-middle hover:text-slate-500 ${
                                page === totalPageCount
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            }`}
                        >
                            Next
                            <MoveRight className="mr-3 align-middle" />
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

function SelectRowsPerPage({
    options,
    setPageSize,
    pageSize
}: {
    options: number[];
    setPageSize: (newSize: number) => void;
    pageSize: number;
}) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-lg whitespace-nowrap">Rows per page</span>

            <Select
                value={String(pageSize)}
                onValueChange={(value) => setPageSize(Number(value))}
            >
                <SelectTrigger className={cn("text-lg")}>
                    <SelectValue placeholder="Select page size">
                        {String(pageSize)}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default PaginationWithLinks;
