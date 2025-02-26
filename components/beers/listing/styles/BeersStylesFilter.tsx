"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { BeersStylesParentsListingProps } from "@/types/beers";
import { useBeerStylesRegions } from "@/hooks/useBeerStylesRegions";
import { MultiSelect } from "@/components/ui/multiselect";

const BeersStylesFilter = ({
    parentStyles
}: BeersStylesParentsListingProps) => {
    const [parentSlug, setParentSlug] = useState("all");
    const [openRegions, setOpenRegions] = useState(false);
    const [region, setRegion] = useState<string[]>([]);

    const { data = { regions: [] } } = useBeerStylesRegions(parentSlug);

    const onParentChange = (slug: string) => {
        setRegion([]);
        setParentSlug(slug);
    };

    return (
        <>
            <div className="sxl:px-20 text-dark mx-5 mt-10 flex flex-wrap items-center justify-center px-0 py-4 font-medium md:mx-10">
                <div
                    className={cn(
                        "ease m-2 inline-block cursor-pointer rounded-full border-2 border-solid px-6 py-1.5 capitalize transition-all duration-200 hover:scale-105 md:px-10 md:py-2",
                        parentSlug === "all"
                            ? "bg-dark border-primary bg-primary text-white"
                            : "border-dark bg-light text-dark"
                    )}
                    onClick={() => setParentSlug("all")}
                >
                    All
                </div>
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
            <div className="mx-auto flex flex-row justify-center">
                <MultiSelect
                    options={data.regions}
                    selected={region}
                    onChange={setRegion}
                    placeholder="Select region..."
                />
            </div>
        </>
    );
};
export default BeersStylesFilter;
