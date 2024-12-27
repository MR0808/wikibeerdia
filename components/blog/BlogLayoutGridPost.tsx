import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/.velite/generated";

const BlogLayoutGridPost = ({ blog }: { blog: Blog }) => {
    return (
        <div className="group text-dark dark:text-light flex flex-col items-center">
            <Link href={blog.url} className="h-full overflow-hidden rounded-xl">
                <Image
                    src={blog.image.src}
                    placeholder="blur"
                    blurDataURL={blog.image.blurDataURL}
                    alt={blog.title}
                    width={blog.image.width}
                    height={blog.image.height}
                    className="ease aspect-[4/3] h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                />
            </Link>

            <div className="mt-4 flex w-full flex-col">
                <div className="flex flex-wrap justify-start space-x-5">
                    {blog.tags.map((tag) => (
                        <span
                            className="text-primary text-xs font-semibold uppercase sm:text-sm"
                            key={tag}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link href={blog.url} className="my-1 inline-block">
                    <h2 className="text-base font-semibold capitalize sm:text-lg">
                        <span className="from-accent/50 to-accent/50 dark:from-accentDark/50 dark:to-accentDark/50 bg-gradient-to-r bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_6px]">
                            {blog.title}
                        </span>
                    </h2>
                </Link>

                <span className="text-gray dark:text-light/50 text-sm font-semibold capitalize sm:text-base">
                    {format(new Date(blog.publishedAt), "dd MMMM, yyyy")}
                </span>
            </div>
        </div>
    );
};

export default BlogLayoutGridPost;
