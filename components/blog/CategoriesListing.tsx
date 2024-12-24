import Category from "./Category";

import { CategoriesProps } from "@/types/blog";

const CategoriesListing = ({
    categories,
    category,
    setCategory
}: CategoriesProps) => {
    return (
        <div className="sxl:px-20 text-dark mx-5 mt-10 flex flex-wrap items-center justify-center px-0 py-4 font-medium md:mx-10">
            {categories.map((cat) => {
                return (
                    <Category
                        key={cat.slug}
                        name={cat.name}
                        slug={cat.slug}
                        category={category}
                        setCategory={setCategory}
                    />
                );
            })}
        </div>
    );
};

export default CategoriesListing;
