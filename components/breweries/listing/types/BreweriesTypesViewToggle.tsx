"use client";
import { Menu, LayoutGrid } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { BreweriesTypesViewToggleProps } from "@/types/breweries";

const BreweriesTypesViewToggle = ({
    view,
    total,
    setView
}: BreweriesTypesViewToggleProps) => {
    const updateLayout = () => {
        if (view === "grid") {
            setView("list");
        } else {
            setView("grid");
        }
    };
    return (
        <div className="container flex flex-row justify-between py-10">
            <div className="text-xl font-semibold">{`${total} result${total === 1 ? "" : "s"}`}</div>
            <div>
                <div
                    className="hover:bg-primary hover:border-primary collapse hidden size-9 cursor-pointer flex-col items-center justify-center rounded-4xl border border-black text-black transition-all transition-normal delay-0 duration-300 ease-in-out hover:text-white md:visible md:flex"
                    onClick={updateLayout}
                >
                    {view == "grid" ? (
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
    );
};
export default BreweriesTypesViewToggle;
