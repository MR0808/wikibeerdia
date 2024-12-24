import { blogs } from "@/.velite/generated";
import { sortBlogs, getCategories } from "@/utils/blogs";
import BlogMainLayout from "@/components/blog/BlogMainLayout";

const BlogPage = () => {
    const categories = getCategories(blogs);
    const sortedPosts = sortBlogs(blogs);

    return <BlogMainLayout blogs={sortedPosts} categories={categories} />;
};
export default BlogPage;
