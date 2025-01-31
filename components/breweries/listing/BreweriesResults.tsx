"use client";
import { Suspense } from "react";

import BreweriesGridView from "./BreweriesGridView";
import BreweriesGridSkeleton from "./BreweriesGridSkeleton";
import BreweriesListView from "./BreweriesListView";
import useViewStore from "@/hooks/useViewType";
import { BreweriesResultsProps } from "@/types/breweries";

const BreweriesResults = ({
    breweries,
    searchParams
}: BreweriesResultsProps) => {
    const { view } = useViewStore();

    return (
        <Suspense
            fallback={<BreweriesGridSkeleton />}
            key={JSON.stringify(searchParams)}
        >
            {!breweries || breweries.length === 0 ? (
                <div className="text-2xl font-semibold">
                    No breweries found that match your search
                </div>
            ) : view === "grid" ? (
                <BreweriesGridView breweries={breweries} />
            ) : (
                <BreweriesListView breweries={breweries} />
            )}
        </Suspense>
    );
};
export default BreweriesResults;
