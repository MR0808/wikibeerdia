import { blogs } from "@/.velite/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Eye, Hourglass, Tags } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { slug as slugger } from "github-slugger";
import RenderMdx from "@/components/blog/RenderMdx";
import { TocEntry } from "@/types/blog";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

function TableOfContentsItem({
    item,
    level = "two"
}: {
    item: TocEntry;
    level?: string;
}) {
    return (
        <li className="py-1">
            <a
                href={item.url}
                data-level={level}
                className="border-dark/40 flex items-center justify-start border-solid data-[level=three]:pl-4 data-[level=two]:border-t data-[level=two]:pt-2 data-[level=two]:pl-0 sm:data-[level=three]:pl-6"
            >
                {level === "three" && (
                    <span className="bg-dark mr-2 flex h-1 w-1 rounded-full">
                        &nbsp;
                    </span>
                )}
                <span className="hover:underline">{item.title}</span>
            </a>
            {item.items.length > 0 && (
                <ul className="mt-1">
                    {item.items.map((subItem) => (
                        <TableOfContentsItem
                            key={subItem.url}
                            item={subItem}
                            level="three"
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const blog = blogs.find((blog) => {
        return blog.slug === slug;
    });

    if (!blog) {
        notFound();
    }

    return (
        <div className="h-full bg-white">
            <div className="container flex flex-col justify-between bg-white px-4 pt-32 sm:justify-between sm:space-x-0">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-base" href="/blog">
                                Blogs
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-base" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-base">
                                {blog.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col space-y-8 md:hidden md:w-2/3">
                    <Image
                        src={blog.image.src}
                        placeholder="blur"
                        blurDataURL={blog.image.blurDataURL}
                        alt={blog.title}
                        width={blog.image.width}
                        height={blog.image.height}
                        className="h-2/3 rounded-xl object-cover"
                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="text-4xl leading-10 font-black md:hidden">
                        {blog.title}
                    </div>
                    <div className="flex flex-wrap items-center justify-items-center space-y-4 space-x-10 md:hidden md:flex-row">
                        <div className="flex flex-row gap-2 text-sm">
                            <Calendar className="text-primary my-auto size-4" />
                            {format(
                                new Date(blog.publishedAt),
                                "dd MMMM, yyyy"
                            )}
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                            <Hourglass className="text-primary my-auto size-4" />
                            {blog.readingTime.text}
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                            <Eye className="text-primary my-auto size-4" />
                            500 views
                        </div>
                        <div className="flex flex-row gap-2 text-sm capitalize">
                            <Tags className="text-primary my-auto size-4" />
                            {blog.tags.map((tag, index) => {
                                return (
                                    <Link
                                        href={`/blog/categories/${slugger(tag)}`}
                                        key={index}
                                    >
                                        {`${tag + (blog.tags.length === index + 1 ? "" : ",")}`}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse pt-10 md:flex-row md:space-x-8">
                    <div className="flex flex-col space-y-8 md:w-2/3">
                        <Image
                            src={blog.image.src}
                            placeholder="blur"
                            blurDataURL={blog.image.blurDataURL}
                            alt={blog.title}
                            width={blog.image.width}
                            height={blog.image.height}
                            className="hidden h-2/3 rounded-xl object-cover md:block"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="hidden text-4xl leading-10 font-black md:block">
                            {blog.title}
                        </div>
                        <div className="hidden flex-wrap items-center justify-items-center space-x-10 align-top md:visible md:flex md:flex-row">
                            <div className="flex flex-row gap-2 text-sm">
                                <Calendar className="text-primary my-auto size-4" />
                                {format(
                                    new Date(blog.publishedAt),
                                    "dd MMMM, yyyy"
                                )}
                            </div>
                            <div className="flex flex-row gap-2 text-sm">
                                <Hourglass className="text-primary my-auto size-4" />
                                {blog.readingTime.text}
                            </div>
                            <div className="flex flex-row gap-2 text-sm">
                                <Eye className="text-primary my-auto size-4" />
                                500 views
                            </div>
                            <div className="flex flex-row gap-2 text-sm capitalize">
                                <Tags className="text-primary my-auto size-4" />
                                {blog.tags.map((tag, index) => {
                                    return (
                                        <Link
                                            href={`/blog/categories/${slugger(tag)}`}
                                            key={index}
                                        >
                                            {`${tag + (blog.tags.length === index + 1 ? "" : ",")}`}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <RenderMdx blog={blog} />
                    </div>
                    <div className="space-y-10 pb-10 md:w-1/3 md:pb-0">
                        <details
                            className="border-dark text-dark max-h-[80vh] overflow-hidden overflow-y-auto rounded-lg border-[1px] border-solid p-4 md:sticky md:top-6"
                            open
                        >
                            <summary className="cursor-pointer text-lg font-semibold capitalize">
                                Table of Contents
                            </summary>
                            <ul className="font-in mt-4 text-base">
                                {blog.toc.map((item) => (
                                    <TableOfContentsItem
                                        key={item.url}
                                        item={item}
                                    />
                                ))}
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BlogPage;
