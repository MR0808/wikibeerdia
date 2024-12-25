import { Blog } from "@/.velite/generated";
import { ReactNode } from "react";

export interface CategoriesProps {
    categories: {
        name: string;
        slug: string;
    }[];
    category: string;
    setCategory: (category: string) => void;
}

export interface CategoryProps {
    name: string;
    slug: string;
    category: string;
    setCategory: (category: string) => void;
}

// export interface BlogPageProps {
//     searchParams: {
//         page?: string;
//     };
// }

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
