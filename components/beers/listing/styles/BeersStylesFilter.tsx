"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { BeersStylesFilterProps } from "@/types/beers";
import { cn } from "@/lib/utils";

const BeersStylesFilter = ({
    parentStyles,
    setParentSlug,
    setStyleSlug,
    parentSlug,
    stylesLoading,
    styles,
    styleSlug
}: BeersStylesFilterProps) => {
    const onParentChange = (slug: string) => {
        setParentSlug(slug);
        setStyleSlug("all");
    };
    return (
        <>
            <div className="sxl:px-20 text-dark mx-5 mt-10 flex flex-wrap items-center justify-center border-b border-b-gray-200 px-0 py-4 font-medium md:mx-10">
                {parentStyles.map((parentStyle) => {
                    return (
                        <div key={parentStyle.id}>
                            <div
                                className={cn(
                                    "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                                    parentSlug === parentStyle.slug
                                        ? "bg-dark border-primary bg-primary text-white"
                                        : "border-dark bg-light text-dark"
                                )}
                                onClick={() => onParentChange(parentStyle.slug)}
                            >
                                {parentStyle.name}
                            </div>
                        </div>
                    );
                })}
            </div>
            {stylesLoading ? (
                <div className="container flex items-center justify-center border-b border-b-gray-200 py-4">
                    <Skeleton className="h-[112px] w-[1100px]" />
                </div>
            ) : (
                styles.length > 0 && (
                    <div className="sxl:px-20 text-dark container mx-5 flex flex-wrap items-center justify-center border-b border-b-gray-200 px-0 py-4 font-medium md:mx-10">
                        <div
                            className={cn(
                                "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 text-sm capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                                styleSlug === "all"
                                    ? "bg-dark border-primary bg-primary text-white"
                                    : "border-dark bg-light text-dark"
                            )}
                            onClick={() => setStyleSlug("all")}
                        >
                            All
                        </div>
                        {styles.map((style) => {
                            return (
                                <div key={style.id}>
                                    <div
                                        className={cn(
                                            "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 text-sm capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                                            styleSlug === style.slug
                                                ? "bg-dark border-primary bg-primary text-white"
                                                : "border-dark bg-light text-dark"
                                        )}
                                        onClick={() => setStyleSlug(style.slug)}
                                    >
                                        {style.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
        </>
    );
};
export default BeersStylesFilter;
