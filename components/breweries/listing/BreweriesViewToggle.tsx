"use client";

import { Menu, LayoutGrid } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import useViewStore from "@/hooks/useViewType";
import { useBreweriesParams } from "@/hooks/useBreweriesParams";
import { BreweriesViewToggleProps } from "@/types/breweries";
import { useEffect } from "react";

const BreweriesViewToggle = ({ paramsView }: BreweriesViewToggleProps) => {
    const { view, setView } = useViewStore();
    const { setView: setNuqsView } = useBreweriesParams();

    useEffect(() => {
        if (paramsView === "grid") {
            setView("grid");
        } else {
            setView("list");
        }
    }, []);

    const updateLayout = () => {
        if (view === "grid") {
            setNuqsView("list");
            setView("list");
        } else {
            setNuqsView("grid");
            setView("grid");
        }
    };
    return (
        <div
            className="hover:bg-primary hover:border-primary flex size-9 cursor-pointer flex-col items-center justify-center rounded-4xl border border-black text-black transition-all transition-normal delay-0 duration-300 ease-in-out hover:text-white"
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
export default BreweriesViewToggle;
