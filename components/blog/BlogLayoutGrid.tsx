import { BlogLayoutProps } from "@/types/blog";
import BlogLayoutGridPost from "./BlogLayoutGridPost";

const BlogLayoutGrid = ({ displayPosts }: BlogLayoutProps) => {
    return (
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((blog, index) => {
                return (
                    <article
                        key={index}
                        className="relative col-span-1 row-span-1"
                    >
                        <BlogLayoutGridPost blog={blog} />
                    </article>
                );
            })}
        </div>
    );
};
export default BlogLayoutGrid;
