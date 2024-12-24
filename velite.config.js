import { defineCollection, defineConfig, s } from "velite";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const codeOptions = {
    grid: false
};

// Define the blog schema
const blog = s
    .object({
        title: s.string(),
        publishedAt: s.isodate(),
        updatedAt: s.isodate(),
        description: s.string(),
        image: s.image(),
        isPublished: s.boolean().default(true),
        author: s.string(),
        tags: s.array(s.string()),
        body: s.mdx(),
        toc: s.toc(),
        slug: s.string()
    })
    .transform((data) => {
        return {
            ...data,
            url: `/blog/${data.slug}`,
            readingTime: readingTime(data.body),
            // toc: headings,
            image: {
                ...data.image,
                src: data.image.src.replace("/static", "/blog")
            }
        };
    });

const blogs = defineCollection({
    name: "Blog",
    pattern: "blog/**/*.mdx",
    schema: blog
});

export default defineConfig({
    root: "content",
    collections: {
        blogs
    },
    output: {
        data: ".velite/generated",
        assets: "public/blog",
        base: "/blog/",
        clean: true
    },
    // Add MDX plugins
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "append" }],
            [rehypePrettyCode, codeOptions]
        ]
    }
});
