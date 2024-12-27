import Link from "next/link";

import { CategoryLinkProps } from "@/types/blog";
import { cn } from "@/lib/utils";

const CategoryLink = ({ name, slug, category }: CategoryLinkProps) => {
    return (
        <Link
            href={`/blog/categories/${slug}`}
            className={cn(
                "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                slug === category
                    ? "bg-dark border-primary bg-primary text-white"
                    : "border-dark bg-light text-dark"
            )}
        >
            {name}
        </Link>
    );
};

export default CategoryLink;
