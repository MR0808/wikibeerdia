import { Blog } from "@/.velite/generated";
import { ReactNode } from "react";

export interface CategoriesProps {
    categories: {
        name: string;
        slug: string;
    }[];
    category: string;
    setCategory?: (category: string) => void;
}

export interface CategoryButtonProps {
    name: string;
    slug: string;
    category: string;
    setCategory: (category: string) => void;
}

export interface CategoryLinkProps {
    name: string;
    slug: string;
    category: string;
}

// export interface BlogPageProps {
//     searchParams: {
//         page?: string;
//     };
// }

export interface BlogViewCounterProps {
    slug: string;
    noCount?: boolean;
    showCount?: boolean;
}

export interface BlogPageProps {
    blogs: Blog[];
    categories: { name: string; slug: string }[];
}

export interface BlogPaginationProps {
    totalPages: number;
    className?: string;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
}

export interface BlogLayoutProps {
    displayPosts: Blog[];
}

export interface MdxProps {
    code: string;
}

export interface BlogCalloutProps {
    children?: ReactNode;
    type?: "default" | "warning" | "danger";
}

export interface TocEntry {
    title: string;
    url: string;
    items: TocEntry[];
}
