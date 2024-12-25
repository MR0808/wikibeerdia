import { blogs as allBlogs } from "@/.velite/generated";
import GithubSlugger, { slug as slugThis } from "github-slugger";

import { sortBlogs, getCategories } from "@/utils/blogs";

const slugger = new GithubSlugger();

const CategoryPage = async ({
    params
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const categories = getCategories(allBlogs);
    const currentCategory = categories.filter((cat) => {
        return cat.slug === slug;
    });
    const sortedPosts = sortBlogs(allBlogs);

    // Step 2: Filter blogs based on the current category (params.slug)
    const blogs = sortedPosts.filter((blog) => {
        if (slug === "all") {
            return true; // Include all blogs if 'all' category is selected
        }
        return blog.tags.some((tag) => slugThis(tag) === slug);
    });

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
            <div className="container mt-10 flex flex-col items-center bg-white">
                <h1 className="text-foreground mb-6 text-3xl leading-snug font-bold capitalize sm:text-4xl sm:leading-snug lg:text-6xl lg:leading-[1.2]">
                    {currentCategory[0].name}
                </h1>
                {/* <CategoriesListing
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
                </div> */}
            </div>
        </div>
    );
};
export default CategoryPage;
