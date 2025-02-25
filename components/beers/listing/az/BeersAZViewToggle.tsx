"use client";

import { Menu, LayoutGrid } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { useBeersAZParams } from "@/hooks/useBeersAZParams";
import { BeersAZViewToggleProps } from "@/types/beers";
import { useEffect } from "react";

const BeersAZViewToggle = ({ paramsView }: BeersAZViewToggleProps) => {
    const { view, setView } = useBeersAZParams();

    useEffect(() => {
        if (paramsView === "grid") {
            setView("grid");
        } else {
            setView("list");
        }
    }, []);

    const updateLayout = () => {
        if (view === "grid") {
            setView("list");
        } else {
            setView("grid");
        }
    };
    return (
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
    );
};
export default BeersAZViewToggle;
