import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/.velite/generated";

const BlogLayoutListPost = ({ blog }: { blog: Blog }) => {
    return (
        <article
            key={blog.slug}
            className="group text-dark flex w-full flex-row space-x-4"
        >
            <div className="hidden w-1/3 p-5 md:block">
                <Link
                    href={blog.url}
                    className="h-full overflow-hidden rounded-xl lg:col-span-4"
                >
                    <Image
                        src={blog.image.src}
                        placeholder="blur"
                        blurDataURL={blog.image.blurDataURL}
                        alt={blog.title}
                        width={blog.image.width}
                        height={blog.image.height}
                        className="ease /5 aspect-square h-5/6 w-5/6 rounded-xl object-cover object-center transition-all duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <div className="w-full space-y-5 pb-5 md:w-2/3 md:p-5">
                <div className="space-y-6">
                    <div className="flex flex-wrap space-y-1">
                        <div className="flex flex-row justify-start space-x-5">
                            {blog.tags.map((tag) => (
                                <span
                                    className="text-primary text-xs font-semibold uppercase sm:text-sm"
                                    key={tag}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                                href={blog.url}
                                className="text-gray-900 dark:text-gray-100"
                            >
                                {blog.title}
                            </Link>
                        </h2>
                        <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                                <time dateTime={blog.publishedAt}>
                                    {format(
                                        new Date(blog.publishedAt),
                                        "dd MMMM, yyyy"
                                    )}
                                </time>
                            </dd>
                        </dl>
                    </div>

                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {blog.description}
                    </div>
                </div>
                <div className="text-base leading-6 font-medium">
                    <Link
                        href={blog.url}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${blog.title}"`}
                    >
                        Read more &rarr;
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogLayoutListPost;
