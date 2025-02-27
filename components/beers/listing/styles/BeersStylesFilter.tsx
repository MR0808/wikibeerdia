"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { BeersStylesParentsListingProps } from "@/types/beers";
import { useBeerStyles } from "@/hooks/useBeerStyles";

const BeersStylesFilter = ({
    parentStyles
}: BeersStylesParentsListingProps) => {
    const [parentSlug, setParentSlug] = useState(parentStyles[0].slug);
    const [styleSlug, setStyleSlug] = useState<string>("");

    const { data: styles = [] } = useBeerStyles(parentSlug);

    const onParentChange = (slug: string) => {
        setStyleSlug("");
        setParentSlug(slug);
    };

    return (
        <div className="flex flex-col items-center justify-center">
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
            {styles.length > 0 && (
                <div className="sxl:px-20 text-dark container mx-5 flex flex-wrap items-center justify-center px-0 py-4 font-medium md:mx-10">
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
            )}
            {/* <div className="mx-auto flex flex-row justify-center">
                <div className="w-60">
                    <MultiSelect
                        options={regions}
                        selected={region}
                        onChange={setRegion}
                        placeholder="Select region..."
                    />
                </div>
                <div className="w-60">
                    <MultiSelect
                        options={styles}
                        selected={style}
                        onChange={setStyle}
                        placeholder="Select style..."
                    />
                </div>
            </div>
            <div className="container flex flex-row space-x-5">
                {region.map((option) => {
                    return (
                        <Badge key={option} variant="secondary">
                            {option}
                            <button
                                className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleUnselectRegion(option);
                                    }
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onClick={() => handleUnselectRegion(option)}
                            >
                                <X className="text-muted-foreground hover:text-foreground h-3 w-3 cursor-pointer" />
                            </button>
                        </Badge>
                    );
                })}
            </div> */}
        </div>
    );
};
export default BeersStylesFilter;
