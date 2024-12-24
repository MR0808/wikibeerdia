import { BlogLayoutProps } from "@/types/blog";
import BlogLayoutListPost from "./BlogLayoutListPost";

const BlogLayoutList = ({ displayPosts }: BlogLayoutProps) => {
    return (
        <div className="flex flex-col gap-16 divide-y divide-gray-200">
            {displayPosts.map((blog, index) => {
                return <BlogLayoutListPost key={index} blog={blog} />;
            })}
        </div>
    );
};
export default BlogLayoutList;
