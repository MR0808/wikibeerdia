"use client";

import React from "react";
import MDXContent from "./MdxContent";
import { Blog } from "@/.velite/generated";

const mdxComponents = {
    // Add any custom components here
};

const RenderMdx = ({ blog }: { blog: Blog }) => {
    return (
        <div className="font-in prose sm:prose-base md:prose-lg prose-blockquote:bg-primary/20 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:border-primary prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-li:marker:text-primary col-span-12 max-w-max first-letter:text-3xl sm:first-letter:text-5xl lg:col-span-8">
            <MDXContent code={blog.body} />
        </div>
    );
};

export default RenderMdx;
