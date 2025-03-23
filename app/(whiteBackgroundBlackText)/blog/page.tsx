import { blogs } from "@/.velite/generated";
import { sortBlogs, getCategories } from "@/utils/blogs";
import BlogMainLayout from "@/components/blog/BlogMainLayout";
import siteMetadata from "@/utils/siteMetaData";

export async function generateMetadata() {
    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;
    const title = "Blog";
    const description = "Catch up on the latest news and artitcles!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/blog`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "website",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages
        }
    };
}

const BlogPage = () => {
    const categories = getCategories(blogs);
    const sortedPosts = sortBlogs(blogs);

    return <BlogMainLayout blogs={sortedPosts} categories={categories} />;
};
export default BlogPage;
