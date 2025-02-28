"use client";

import { BreweriesTypesFilterProps } from "@/types/breweries";
import { cn } from "@/lib/utils";

const BreweriesTypesFilter = ({
    breweryTypes,
    setSlug,
    slug
}: BreweriesTypesFilterProps) => {
    const onBreweryTypeChange = (slug: string) => {
        setSlug(slug);
    };
    return (
        <div className="sxl:px-20 text-dark mx-5 mt-10 flex flex-wrap items-center justify-center border-b border-b-gray-200 px-0 py-4 font-medium md:mx-10">
            {breweryTypes.map((breweryType) => {
                return (
                    <div key={breweryType.id}>
                        <div
                            className={cn(
                                "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                                slug === breweryType.slug
                                    ? "bg-dark border-primary bg-primary text-white"
                                    : "border-dark bg-light text-dark"
                            )}
                            onClick={() =>
                                onBreweryTypeChange(breweryType.slug)
                            }
                        >
                            {breweryType.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default BreweriesTypesFilter;
