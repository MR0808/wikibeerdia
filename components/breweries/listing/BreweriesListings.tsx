"use client";

import { ChangeEvent, useState } from "react";
import { Menu, LayoutGrid } from "lucide-react";

import NiceSelect from "@/components/ui/nice-select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

import { assistant } from "@/app/fonts";
import { BreweriesListingsProps } from "@/types/breweries";

const BreweriesListings = ({
    breweries,
    total = 0
}: BreweriesListingsProps) => {
    const [layout, setLayout] = useState("grid");

    const per_page = 10;
    const page = 1;
    const start = per_page * page - per_page + 1;
    const end = per_page * page;

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    };

    const updateLayout = () => {
        let layoutFinal = "grid";
        if (layout === "grid") layoutFinal = "list";
        setLayout(layoutFinal);
    };

    return (
        <div
            className={`${assistant.className} container flex flex-row space-x-10 pt-28`}
        >
            <div className="w-1/3">Insert filter here</div>
            <div className="flex w-2/3 flex-col space-y-10">
                <div className="flex flex-row justify-between text-xl">
                    <div>
                        Showing{" "}
                        <span className="font-semibold">{`${start}-${end}`}</span>{" "}
                        of <span className="font-semibold">{total}</span>{" "}
                        results
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div className="w-16">Sort by:</div>
                        <NiceSelect
                            className="nice-select"
                            options={[
                                { value: "az", text: "A - Z" },
                                { value: "za", text: "Z - A" },
                                { value: "newest", text: "Newest" },
                                { value: "oldest", text: "Oldest" },
                                { value: "popular", text: "Most Popular" }
                            ]}
                            defaultCurrent={0}
                            onChange={handleTypeChange}
                            name=""
                            placeholder=""
                        />
                        <div
                            className="hover:bg-primary hover:border-primary ml-4 flex size-9 cursor-pointer flex-col items-center justify-center rounded-4xl border border-black text-black transition-all transition-normal delay-0 duration-300 ease-in-out hover:text-white"
                            onClick={updateLayout}
                        >
                            {layout == "grid" ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Menu />
                                        </TooltipTrigger>
                                        <TooltipContent className="mb-3">
                                            <p>Switch To List View</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <LayoutGrid />
                                        </TooltipTrigger>
                                        <TooltipContent className="mb-3">
                                            <p>Switch To Grid View</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BreweriesListings;
