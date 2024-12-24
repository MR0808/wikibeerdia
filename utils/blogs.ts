import { compareDesc, parseISO } from "date-fns";
import { slug } from "github-slugger";

import { Blog } from "@/.velite/generated";

export const sortBlogs = (blogs: Blog[]) => {
    return blogs
        .slice()
        .sort((a, b) =>
            compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
        );
};

export const getCategories = (blogs: Blog[]) => {
    const allCategories: { name: string; slug: string }[] = []; // Initialize with 'all' category
    blogs.forEach((blog) => {
        blog.tags.forEach((tag) => {
            const slugified = slug(tag);
            const isPresent = allCategories.find((s) => s.slug === slugified);
            if (!isPresent) {
                allCategories.push({ name: tag, slug: slugified });
            }
        });
    });

    allCategories.sort();
    allCategories.unshift({ name: "All", slug: "all" });

    return allCategories;
};
