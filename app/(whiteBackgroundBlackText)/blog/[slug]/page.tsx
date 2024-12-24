import { blogs } from "@/.velite/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Eye, Hourglass, Tags } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { slug as slugger } from "github-slugger";
import { MDXContent } from "@/components/blog/MDXComponents";
import RenderMdx from "@/components/blog/RenderMdx";

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
                <div className="flex flex-row pt-10">
                    <div className="flex w-2/3 flex-col space-y-8">
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
                        <div className="text-4xl leading-10 font-black">
                            {blog.title}
                        </div>
                        <div className="flex flex-row items-center justify-items-center space-x-10">
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
                </div>
            </div>
        </div>
    );
};
export default BlogPage;
