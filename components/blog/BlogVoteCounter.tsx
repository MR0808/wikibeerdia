import { Star } from "lucide-react";

import { getBlogVotes } from "@/actions/blogs";

const BlogVoteCounter = async ({ slug }: { slug: string }) => {
    const { data } = await getBlogVotes(slug);

    return (
        <div className="flex flex-row gap-2 text-sm">
            <Star className="text-primary my-auto size-4" />
            {`${data.average} (${data.count} ${data.count === 1 ? "vote" : "votes"})`}
        </div>
    );
};
export default BlogVoteCounter;
