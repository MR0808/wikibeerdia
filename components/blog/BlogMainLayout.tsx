"use client";

import { slug } from "github-slugger";
import { useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import BlogLayoutGrid from "@/components/blog/BlogLayoutGrid";
import BlogLayoutList from "./BlogLayoutList";
import CategoriesListing from "@/components/blog/CategoriesListing";
import { BlogPageProps } from "@/types/blog";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { cn } from "@/lib/utils";

const BlogMainLayout = ({ blogs, categories }: BlogPageProps) => {
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [layout, setLayout] = useState("grid");
    const [category, setCategory] = useState("all");
    const [totalPages, setTotalPages] = useState(
        Math.ceil(blogs.length / postsPerPage)
    );
    const [displayPosts, setDisplayPosts] = useState(
        blogs.slice(
            postsPerPage * (currentPage - 1),
            postsPerPage * currentPage
        )
    );

    const updateLayout = (requestedLayout: string) => {
        // if (requestedLayout === "grid") {
        //     const tempPages = Math.ceil(blogs.length / 6);
        //     setTotalPages(tempPages);
        //     setPostsPerPage(6);
        // } else {
        //     const tempPages = Math.ceil(blogs.length / 10);
        //     setTotalPages(tempPages);
        //     setPostsPerPage(10);
        // }
        setLayout(requestedLayout);
    };

    useEffect(() => {
        const newBlogs = blogs.filter((blog) => {
            if (category === "all") {
                return true;
            }
            return blog.tags.some((tag) => slug(tag) === category);
        });

        const tempPages = Math.ceil(newBlogs.length / postsPerPage);
        setTotalPages(tempPages);
        if (currentPage > tempPages) {
            setCurrentPage(1);
        }
        setDisplayPosts(
            newBlogs.slice(
                postsPerPage * (currentPage - 1),
                postsPerPage * currentPage
            )
        );
    }, [currentPage, category]);

    return (
        <div className="bg-white">
            <div className="bg-blogs-hero relative h-[500px] bg-white bg-cover bg-center bg-no-repeat">
                <div className="mx-4 flex flex-wrap items-center">
                    <div className="mx-auto max-w-[980px] items-center pt-28 text-center">
                        <h1 className="text-foreground mb-6 text-4xl leading-snug font-bold sm:text-5xl sm:leading-snug lg:text-7xl lg:leading-[1.2]">
                            The Wikibeerdia Blog
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col items-center bg-white">
                <CategoriesListing
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                />
                <div className="flex gap-x-4">
                    <Button
                        variant={layout === "grid" ? "default" : "ghost"}
                        size="icon"
                        asChild
                        className={cn("cursor-pointer")}
                        onClick={() => updateLayout("grid")}
                    >
                        <LayoutGrid />
                    </Button>
                    <Button
                        variant={layout === "list" ? "default" : "ghost"}
                        size="icon"
                        asChild
                        className={cn("cursor-pointer")}
                        onClick={() => updateLayout("list")}
                    >
                        <List />
                    </Button>
                </div>
                <div
                    className={`mt-10 ${layout === "list" && "w-full md:w-4/5"}`}
                >
                    {layout === "grid" ? (
                        <BlogLayoutGrid displayPosts={displayPosts} />
                    ) : (
                        <BlogLayoutList displayPosts={displayPosts} />
                    )}
                    <BlogPagination
                        totalPages={totalPages}
                        className="my-20 justify-center"
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
};
export default BlogMainLayout;
