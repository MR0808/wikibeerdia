"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext
} from "@/components/ui/pagination";
import { BlogPaginationProps } from "@/types/blog";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const BlogPagination = ({
    totalPages,
    className,
    currentPage,
    setCurrentPage
}: BlogPaginationProps) => {
    const [prevPage, setPrevPage] = useState(currentPage - 1);
    const [nextPage, setNextPage] = useState(currentPage + 1);

    useEffect(() => {
        setPrevPage(currentPage - 1);
        setNextPage(currentPage + 1);
    }, [currentPage]);

    return (
        <Pagination className={className}>
            <PaginationContent>
                {prevPage >= 1 ? (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage(prevPage)}
                            className={cn("cursor-pointer")}
                        />
                    </PaginationItem>
                ) : null}

                {Array(totalPages)
                    .fill("")
                    .map((_, index) => (
                        <PaginationItem
                            className="hidden sm:inline-block"
                            key={`page-button-${index}`}
                        >
                            <PaginationLink
                                isActive={currentPage === index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={cn("cursor-pointer")}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {nextPage <= totalPages ? (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage(nextPage)}
                            className={cn("cursor-pointer")}
                        />
                    </PaginationItem>
                ) : null}
            </PaginationContent>
        </Pagination>
    );
};
