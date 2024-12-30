import { Eye } from "lucide-react";

import { BlogViewCounterProps } from "@/types/blog";
import { incrementView, getViews } from "@/actions/blogs";

const BlogViewCounter = async ({
    slug,
    noCount = false,
    showCount = true
}: BlogViewCounterProps) => {
    if (!noCount) {
        await incrementView(slug);
    }

    if (showCount) {
        const data = await getViews(slug);
        const views = data.data ? data.data : 0;
        return (
            <div className="flex flex-row gap-2 text-sm">
                <Eye className="text-primary my-auto size-4" />
                {`${views} ${views === 1 ? "view" : "views"}`}
            </div>
        );
    } else {
        return null;
    }
};
export default BlogViewCounter;
