import { cn } from "@/lib/utils";

import { BlogCalloutProps } from "@/types/blog";

const BlogCallout = ({
    children,
    type = "default",
    ...props
}: BlogCalloutProps) => {
    return (
        <div
            className={cn(
                "boder-l-4 my-6 w-full items-start rounded-md border p-4 dark:max-w-none",
                {
                    "dark:prose border-red-900 bg-red-50": type === "danger",
                    "dark:prose border-yellow-900 bg-yellow-50":
                        type === "warning"
                }
            )}
            {...props}
        >
            <div>{children}</div>
        </div>
    );
};

export default BlogCallout;
