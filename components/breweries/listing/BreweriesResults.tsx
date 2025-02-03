"use client";

import BreweriesGridView from "./BreweriesGridView";
import BreweriesGridSkeleton from "./BreweriesGridSkeleton";
import BreweriesListView from "./BreweriesListView";
import { BreweriesResultsProps } from "@/types/breweries";
import useViewStore from "@/hooks/useViewType";

const BreweriesResults = ({ breweries }: BreweriesResultsProps) => {
    const { view } = useViewStore();
    const loadIsPending = false;
    return (
        <>
            {loadIsPending ? (
                <BreweriesGridSkeleton />
            ) : !breweries || breweries.length === 0 ? (
                <div className="text-2xl font-semibold">
                    No breweries found that match your search
                </div>
            ) : view === "grid" ? (
                <BreweriesGridView breweries={breweries} />
            ) : (
                <BreweriesListView breweries={breweries} />
            )}
        </>
    );
};
export default BreweriesResults;
